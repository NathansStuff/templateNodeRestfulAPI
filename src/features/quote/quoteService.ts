import { getCriteriaGroupsByIds } from '@/features/criteriaGroup/criteriaGroupService';
import { ICriteriaGroup } from '@/features/criteriaGroup/ICriteria';
import { ILenderAggregate } from '@/features/lender/ILender';
import { getLenderByCode } from '@/features/lender/lenderService';
import { getProductsByIds } from '@/features/product/productService';
import { runRule } from '@/features/rules/runRules';
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
                    return { name: product.name, passed: productResult.passed, message: productResult.message };
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
                return { name: product.name, criteriaGroups };
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
        const { passed, message } = runRule(rule, quoteBody);
        criteriaPassed = criteriaPassed && passed;
        criteriaGroupMessage.push(message);
    });

    return { passed: criteriaPassed, message: criteriaGroupMessage };
}
