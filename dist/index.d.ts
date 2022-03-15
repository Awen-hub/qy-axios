export interface defaultsOption {
    baseURL?: string;
    timeout?: number;
    header?: object;
    dataType?: string;
    responseType?: string;
    enableHttp2?: boolean;
    enableQuic?: boolean;
    enableCache?: boolean;
    enableHttpDNS?: boolean;
    httpDNSServiceId?: string;
    enableChunked?: string;
    forceCellularNetwork?: string;
}
declare type requestMethods = "OPTIONS" | "GET" | "HEAD" | "POST" | "PUT" | "DELETE" | "TRACE" | "CONNECT";
export interface requestConfig {
    url: string;
    data?: string | object | ArrayBuffer;
    header?: object;
    timeout?: number;
    method?: requestMethods;
    dataType?: string;
    responseType?: string;
    enableHttp2?: boolean;
    enableQuic?: boolean;
    enableCache?: boolean;
    enableHttpDNS?: boolean;
    httpDNSServiceId?: string;
    enableChunked?: string;
    forceCellularNetwork?: string;
}
declare class AxiosConstructor {
    private dafaults;
    private interceptors;
    constructor(dafaults: defaultsOption);
    private request;
    create: (config: defaultsOption) => AxiosConstructor;
    get: (url: string, config?: Pick<requestConfig, "data" | "header" | "timeout" | "dataType" | "responseType" | "enableHttp2" | "enableQuic" | "enableCache" | "enableHttpDNS" | "httpDNSServiceId" | "enableChunked" | "forceCellularNetwork"> | undefined) => Promise<unknown>;
    post: (url: string, config?: Pick<requestConfig, "data" | "header" | "timeout" | "dataType" | "responseType" | "enableHttp2" | "enableQuic" | "enableCache" | "enableHttpDNS" | "httpDNSServiceId" | "enableChunked" | "forceCellularNetwork"> | undefined) => Promise<unknown>;
    options: (url: string, config?: Pick<requestConfig, "data" | "header" | "timeout" | "dataType" | "responseType" | "enableHttp2" | "enableQuic" | "enableCache" | "enableHttpDNS" | "httpDNSServiceId" | "enableChunked" | "forceCellularNetwork"> | undefined) => Promise<unknown>;
    head: (url: string, config?: Pick<requestConfig, "data" | "header" | "timeout" | "dataType" | "responseType" | "enableHttp2" | "enableQuic" | "enableCache" | "enableHttpDNS" | "httpDNSServiceId" | "enableChunked" | "forceCellularNetwork"> | undefined) => Promise<unknown>;
    put: (url: string, config?: Pick<requestConfig, "data" | "header" | "timeout" | "dataType" | "responseType" | "enableHttp2" | "enableQuic" | "enableCache" | "enableHttpDNS" | "httpDNSServiceId" | "enableChunked" | "forceCellularNetwork"> | undefined) => Promise<unknown>;
    delete: (url: string, config?: Pick<requestConfig, "data" | "header" | "timeout" | "dataType" | "responseType" | "enableHttp2" | "enableQuic" | "enableCache" | "enableHttpDNS" | "httpDNSServiceId" | "enableChunked" | "forceCellularNetwork"> | undefined) => Promise<unknown>;
    trace: (url: string, config?: Pick<requestConfig, "data" | "header" | "timeout" | "dataType" | "responseType" | "enableHttp2" | "enableQuic" | "enableCache" | "enableHttpDNS" | "httpDNSServiceId" | "enableChunked" | "forceCellularNetwork"> | undefined) => Promise<unknown>;
    connect: (url: string, config?: Pick<requestConfig, "data" | "header" | "timeout" | "dataType" | "responseType" | "enableHttp2" | "enableQuic" | "enableCache" | "enableHttpDNS" | "httpDNSServiceId" | "enableChunked" | "forceCellularNetwork"> | undefined) => Promise<unknown>;
}
declare const _default: AxiosConstructor;
export default _default;
