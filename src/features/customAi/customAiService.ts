import { createOpenaiEmbeddings } from '@/features/langchain/langchainService';
import { queryIndex } from '@/features/pinecone/index/pineconeIndexService';

export async function findInfoForQuery(
    question: string,
    namespace?: string
): Promise<string[]> {
    const embeddings = createOpenaiEmbeddings();
    const vector = await embeddings.embedQuery(question);
    const matches = await queryIndex(vector, namespace);

    const matchedText = matches.map((match) => {
        return match.metadata.embeddedText;
    });

    return matchedText;
}

export function buildQueryTemplate(
    question: string,
    matchedText: string[]
): string {
    const query = `
        You are an expert on construction. Use your knowledge to answer the question below. Some text has been provided to help you answer the question. You do not need to use all of the text, but you should use as much as you can. The more you use, the better your answer will be. If the question is general, the text may not be relevant. Do not refer to the text in your answer.

        Question: ${question}

        Text: ${matchedText.join(' ')}
    `;

    return query;
}
