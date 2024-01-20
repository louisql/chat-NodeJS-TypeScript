import AppError from '../utils/app-error';
export function errorHandler(err, req, res, next) {
    if (err instanceof AppError) {
        res.status(err.statusCode).json({ error: err.message });
    }
    else {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
}
