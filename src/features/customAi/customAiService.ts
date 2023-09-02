import { createOpenaiEmbeddings } from '@/features/langchain/langchainService';
import { queryIndex } from '@/features/pinecone/index/pineconeIndexService';

export async function findInfoForQuery(question: string, namespace?: string): Promise<any> {
    const embeddings = createOpenaiEmbeddings();
    const vector = await embeddings.embedQuery(question);
    const response = await queryIndex(vector, namespace);

    const matches = response.matches;

    if (!matches) {
        return 'No matches found';
    }

    const matchedText = matches.map((match: any) => {
        return match.metadata?.text;
    });

    return matchedText;
}
