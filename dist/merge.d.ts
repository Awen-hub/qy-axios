import { defaultsOption, requestConfig } from "./index";
declare const merge: (defaultConfig: defaultsOption, customConfig: requestConfig) => defaultsOption & requestConfig;
export default merge;
