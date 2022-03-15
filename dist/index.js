import merge from "./merge";
class InterceptorsConstructor {
    constructor() {
        this.requestInterceptors = [];
        this.responseInterceptors = [];
        const requestInterceptors = [];
        const responseInterceptors = [];
        this.requestInterceptors = requestInterceptors;
        this.responseInterceptors = responseInterceptors;
        const useRequestInterceptors = (fn) => {
            requestInterceptors.push(fn);
        };
        const ejectRequestInterceptors = (fn) => {
            const fnIndex = requestInterceptors.indexOf(fn);
            if (fnIndex !== -1) {
                requestInterceptors.splice(fnIndex, 1);
            }
            else {
                throw new Error("需要移除的拦截器尚未注册");
            }
        };
        this.request = {
            use: useRequestInterceptors,
            eject: ejectRequestInterceptors,
        };
        const useResponseInterceptors = (fn) => {
            responseInterceptors.push(fn);
        };
        const ejectResponseInterceptors = (fn) => {
            const fnIndex = responseInterceptors.indexOf(fn);
            if (fnIndex !== -1) {
                responseInterceptors.splice(fnIndex, 1);
            }
            else {
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
    constructor(dafaults) {
        this.dafaults = {};
        this.request = (config) => {
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
                const success = (res) => {
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
                const fail = (err) => reject(err);
                wx.request({
                    ...newConfig,
                    //@ts-ignore
                    success,
                    fail,
                });
            });
        };
        this.create = (config) => {
            return new AxiosConstructor(config);
        };
        this.get = (url, config) => {
            config = config === undefined ? {} : config;
            const newConfig = {
                ...config,
                url,
                method: "GET",
            };
            return this.request(newConfig);
        };
        this.post = (url, config) => {
            config = config === undefined ? {} : config;
            const newConfig = {
                ...config,
                url,
                method: "POST",
            };
            return this.request(newConfig);
        };
        this.options = (url, config) => {
            config = config === undefined ? {} : config;
            const newConfig = {
                ...config,
                url,
                method: "OPTIONS",
            };
            return this.request(newConfig);
        };
        this.head = (url, config) => {
            config = config === undefined ? {} : config;
            const newConfig = {
                ...config,
                url,
                method: "HEAD",
            };
            return this.request(newConfig);
        };
        this.put = (url, config) => {
            config = config === undefined ? {} : config;
            const newConfig = {
                ...config,
                url,
                method: "PUT",
            };
            return this.request(newConfig);
        };
        this.delete = (url, config) => {
            config = config === undefined ? {} : config;
            const newConfig = {
                ...config,
                url,
                method: "DELETE",
            };
            return this.request(newConfig);
        };
        this.trace = (url, config) => {
            config = config === undefined ? {} : config;
            const newConfig = {
                ...config,
                url,
                method: "TRACE",
            };
            return this.request(newConfig);
        };
        this.connect = (url, config) => {
            config = config === undefined ? {} : config;
            const newConfig = {
                ...config,
                url,
                method: "CONNECT",
            };
            return this.request(newConfig);
        };
        this.dafaults = dafaults;
        this.interceptors = new InterceptorsConstructor();
    }
}
export default new AxiosConstructor({});
