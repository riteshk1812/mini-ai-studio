import { NextFunction, Request, Response } from "express";

export interface IMiddlewareParams {
    req: Request
    res: Response
    next?: NextFunction
    method?: string
    url?: string
    params?: Request['params']
    query?: Request['query']
    body?: Request['body']
}

export type TMiddleware = ({ req, res, next }: IMiddlewareParams) => void

export interface IController<Params, Response> {
    get(params: Params): Response
    post(params: Params): Response
}

export interface IApiController extends IController<IMiddlewareParams, Promise<void>> {
    get({ req, res }: IMiddlewareParams): Promise<void>
    post({ req, res }: IMiddlewareParams): Promise<void>
}