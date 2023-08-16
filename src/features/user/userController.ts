import { Request, Response } from 'express';

export async function getHelloWorldHandler(req: Request, res: Response): Promise<void> {
    const result = await Promise.resolve('Hello World!');
    res.status(200).json({ result });
}
