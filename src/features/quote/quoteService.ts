import { getCriteriaGroupsByIds } from '@/features/criteriaGroup/criteriaGroupService';
import { ICriteriaGroup } from '@/features/criteriaGroup/ICriteria';
import { runCriteriaRule } from '@/features/criteriaRules/runCriteriaRule';
import { runFinanceRule } from '@/features/financeRules/runFinanceRule';
import { ILenderAggregate } from '@/features/lender/ILender';
import { getLenderByCode } from '@/features/lender/lenderService';
import { getProductsByIds } from '@/features/product/productService';
import { IRatePolicy } from '@/features/ratePolicy/IRatePolicy';
import { getRatePolicysByIds } from '@/features/ratePolicy/ratePolicyService';
import { IQuoteBody } from '@/types/IQuote';
import { IQuoteService } from '@/types/IQuoteService';

import { quoteBodyToQuoteServiceType } from './quoteUtils';

interface IQuoteResult {
    lenderResults: ILenderResult[];
}
interface ILenderResult {
    lenderCode: string;
    passed: boolean;
    products: IProductResult[];
}

interface IProductResult {
    name: string;
    passed: boolean;
    message: string[];
    RatePolicy?: number;
}

export async function getQuote(quoteBody: IQuoteBody): Promise<IQuoteResult> {
    const serviceType = quoteBodyToQuoteServiceType(quoteBody);
    const lenders: ILenderAggregate[] = await getQuoteLenders(serviceType.lenderCodes);

    const lenderResults = await runLenders(lenders, serviceType);

    return { lenderResults };
}

// ***** Internal Helpers *****

async function runLenders(lenders: ILenderAggregate[], quoteBody: IQuoteService): Promise<ILenderResult[]> {
    return Promise.all(
        lenders.map(async (lender) => {
            const productsResults = await Promise.all(
                lender.products.map(async (product) => {
                    const result = await runLender(lender, quoteBody);
                    const productResult = result[product.name];
                    const passed = productResult.passed;

                    if (!passed) return { name: product.name, passed, message: productResult.message };

                    const { RatePolicy, messages } = getMatchingFinaceRates(product.RatePolicys, quoteBody);
                    productResult.message = productResult.message.concat(messages);

                    return { name: product.name, passed, message: productResult.message, RatePolicy };
                })
            );

            return {
                lenderCode: lender.code,
                passed: productsResults.every((product) => product.passed),
                products: productsResults,
            };
        })
    );
}

function getMatchingFinaceRates(
    RatePolicys: IRatePolicy[],
    quoteBody: IQuoteService
): { RatePolicy: number; messages: string[] } {
    let overallRate = 0;
    let overallMessages: string[] = [];

    for (const RatePolicy of RatePolicys) {
        const { message, value } = runFinanceRule(RatePolicy, quoteBody);
        if (value) overallRate += value;
        overallMessages = overallMessages.concat(message);
    }

    return { RatePolicy: overallRate, messages: overallMessages };
}

async function runLender(
    lender: ILenderAggregate,
    quoteBody: IQuoteService
): Promise<{ [productId: string]: { passed: boolean; message: string[] } }> {
    const productResults: { [productId: string]: { passed: boolean; message: string[] } } = {};

    for (const product of lender.products) {
        let productPassed = true;
        let productMessage: string[] = [];

        for (const criteriaGroup of product.criteriaGroups) {
            const { passed, message } = runCriteriaGroups(criteriaGroup, quoteBody);
            productPassed = productPassed && passed;
            productMessage = productMessage.concat(message);
        }

        productResults[product.name] = { passed: productPassed, message: productMessage };
    }

    return productResults;
}

async function getQuoteLenders(lenderCodes: string[]): Promise<ILenderAggregate[]> {
    const lenders: Promise<ILenderAggregate | null>[] = lenderCodes.map(async (lenderCode) => {
        const lender = await getLenderByCode(lenderCode);
        if (!lender) return null;

        const products = await getProductsByIds(lender.productIds);
        if (products.length === 0) return null;

        const productsArray = await Promise.all(
            products.map(async (product) => {
                const criteriaGroups = await getCriteriaGroupsByIds(product.criteriaGroupIds);
                const RatePolicys = await getRatePolicysByIds(product.ratePolicyIds);
                return { name: product.name, criteriaGroups, RatePolicys };
            })
        );

        return { name: lender.name, code: lender.code, products: productsArray };
    });

    return (await Promise.all(lenders)).filter(Boolean) as ILenderAggregate[];
}

function runCriteriaGroups(criteria: ICriteriaGroup, quoteBody: IQuoteService): { passed: boolean; message: string[] } {
    const criteriaGroupMessage: string[] = [`running criteria group: ${criteria.name}`];
    let criteriaPassed = true;
    if (criteria.rules.length === 0) {
        return { passed: false, message: ['No rules found'] };
    }

    criteria.rules.forEach((rule) => {
        const { passed, message } = runCriteriaRule(rule, quoteBody);
        criteriaPassed = criteriaPassed && passed;
        criteriaGroupMessage.push(message);
    });

    return { passed: criteriaPassed, message: criteriaGroupMessage };
}
