export interface BaseResp<T> {
    code: number;
    data: T;
    msg: string;
    token?: string;
}