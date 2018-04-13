declare class Response {
  ok: boolean;
  status: number;
  json(): Promise<any>;
}

declare function fetch(url: string, params?: Object): Promise<Response>;
