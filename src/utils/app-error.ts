class AppError extends Error {
    statusCode: number
    
    constructor(message: string, statusCode: number) {
        super(message);
        this.name = 'AppError',
        this.statusCode = statusCode
    }
}

export default AppError;