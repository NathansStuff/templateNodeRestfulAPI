export class CustomError extends Error {
    statusCode: number;
    status: string;

    constructor(statusCode: number, message: string) {
        super(message);
        this.statusCode = statusCode;
        this.status = 'failure';
    }
}

export default CustomError;
