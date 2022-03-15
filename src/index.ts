import merge from "./merge";

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

type requestMethods =
  | "OPTIONS"
  | "GET"
  | "HEAD"
  | "POST"
  | "PUT"
  | "DELETE"
  | "TRACE"
  | "CONNECT";

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

interface responseOption {
  data?: string | object | ArrayBuffer;
  statusCode: number;
  header: object;
  cookies?: string[];
  profile?: {
    redirectStart: number;
    redirectEnd: number;
    fetchStart: number;
    domainLookupStart: number;
    domainLookupEnd: number;
    connectStart: number;
    connectEnd: number;
    SSLconnectionStart: number;
    SSLconnectionEnd: number;
    requestStart: number;
    requestEnd: number;
    responseStart: number;
    responseEnd: number;
    rtt: number;
    estimate_nettype: number;
    httpRttEstimate: number;
    transportRttEstimate: number;
    downstreamThroughputKbpsEstimate: number;
    throughputKbps: number;
    peerIP: string;
    port: number;
    socketReused: boolean;
    sendBytesCount: number;
    receivedBytedCount: number;
    protocol: string;
  };
}

class InterceptorsConstructor {
  private request: {
    use: (fn: any) => void;
    eject: (fn: any) => void;
  };
  private responese: {
    use: (fn: any) => void;
    eject: (fn: any) => void;
  };
  requestInterceptors: ((fn: any) => void | false)[] = [];
  responseInterceptors: ((fn: any) => void | false)[] = [];
  constructor() {
    const requestInterceptors: any[] = [];
    const responseInterceptors: any[] = [];
    this.requestInterceptors = requestInterceptors;
    this.responseInterceptors = responseInterceptors;
    const useRequestInterceptors = (fn: any) => {
      requestInterceptors.push(fn);
    };
    const ejectRequestInterceptors = (fn: any) => {
      const fnIndex = requestInterceptors.indexOf(fn);
      if (fnIndex !== -1) {
        requestInterceptors.splice(fnIndex, 1);
      } else {
        throw new Error("需要移除的拦截器尚未注册");
      }
    };
    this.request = {
      use: useRequestInterceptors,
      eject: ejectRequestInterceptors,
    };
    const useResponseInterceptors = (fn: any) => {
      responseInterceptors.push(fn);
    };
    const ejectResponseInterceptors = (fn: any) => {
      const fnIndex = responseInterceptors.indexOf(fn);
      if (fnIndex !== -1) {
        responseInterceptors.splice(fnIndex, 1);
      } else {
        throw new Error("需要移除的拦截器尚未注册");
      }
    };
    this.responese = {
      use: useResponseInterceptors,
      eject: ejectResponseInterceptors,
    };
  }
}

class AxiosConstructor {
  private dafaults: defaultsOption = {};
  private interceptors;
  constructor(dafaults: defaultsOption) {
    this.dafaults = dafaults;
    this.interceptors = new InterceptorsConstructor();
  }
  private request = (config: requestConfig) => {
    const defaults = this.dafaults;
    let newConfig = merge(defaults, config);
    if (defaults.hasOwnProperty("baseURL")) {
      newConfig.url = defaults.baseURL + newConfig.url;
    }
    return new Promise((resolve, reject) => {
      const requestInterceptors = this.interceptors.requestInterceptors;
      for (let i = 0; i < requestInterceptors.length; i++) {
        const interceptor = requestInterceptors[i];
        const isBreak = interceptor(newConfig);
        if (isBreak === false) {
          reject();
          return;
        }
      }
      const success = (res: responseOption) => {
        const responseInterceptors = this.interceptors.responseInterceptors;
        for (let i = 0; i < responseInterceptors.length; i++) {
          const interceptor = responseInterceptors[i];
          const isBreak = interceptor(res);
          if (isBreak === false) {
            reject();
            return;
          }
        }
        resolve(res);
      };
      const fail = (err: any) => reject(err);
      wx.request({
        ...newConfig,
        //@ts-ignore
        success,
        fail,
      });
    });
  };

  create = (config: defaultsOption) => {
    return new AxiosConstructor(config);
  };

  get = (
    url: string,
    config?: Omit<requestConfig, "method" | "url">
  ) => {
    config = config === undefined ? {}: config
    const newConfig: requestConfig = {
      ...config,
      url,
      method: "GET",
    };
    return this.request(newConfig);
  };

  post = (
    url: string,
    config?: Omit<requestConfig, "method" | "url">
  ) => {
    config = config === undefined ? {}: config
    const newConfig: requestConfig = {
      ...config,
      url,
      method: "POST",
    };
    return this.request(newConfig);
  };

  options = (
    url: string,
    config?: Omit<requestConfig, "method" | "url">
  ) => {
    config = config === undefined ? {}: config
    const newConfig: requestConfig = {
      ...config,
      url,
      method: "OPTIONS",
    };
    return this.request(newConfig);
  };

  head = (
    url: string,
    config?: Omit<requestConfig, "method" | "url">
  ) => {
    config = config === undefined ? {}: config
    const newConfig: requestConfig = {
      ...config,
      url,
      method: "HEAD",
    };
    return this.request(newConfig);
  };

  put = (
    url: string,
    config?: Omit<requestConfig, "method" | "url">
  ) => {
    config = config === undefined ? {}: config
    const newConfig: requestConfig = {
      ...config,
      url,
      method: "PUT",
    };
    return this.request(newConfig);
  };

  delete = (
    url: string,
    config?: Omit<requestConfig, "method" | "url">
  ) => {
    config = config === undefined ? {}: config
    const newConfig: requestConfig = {
      ...config,
      url,
      method: "DELETE",
    };
    return this.request(newConfig);
  };

  trace = (
    url: string,
    config?: Omit<requestConfig, "method" | "url">
  ) => {
    config = config === undefined ? {}: config
    const newConfig: requestConfig = {
      ...config,
      url,
      method: "TRACE",
    };
    return this.request(newConfig);
  };

  connect = (
    url: string,
    config?: Omit<requestConfig, "method" | "url">
  ) => {
    config = config === undefined ? {}: config
    const newConfig: requestConfig = {
      ...config,
      url,
      method: "CONNECT",
    };
    return this.request(newConfig);
  };
}

export default new AxiosConstructor({})