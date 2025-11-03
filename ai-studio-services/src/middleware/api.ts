import { NextFunction, Request, Response } from "express";


export function api(fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) {
    return async function (req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { method, baseUrl, url, params, query, body } = req
            console.log("req array from api", method, baseUrl, url, params, query, body);
            await fn(req, res, next)
        } catch (error) {
            next(error)
        }
    }
}