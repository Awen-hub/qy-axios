import { defaultsOption, requestConfig } from "./index";

const merge = (defaultConfig: defaultsOption, customConfig: requestConfig) => {
  const configContainer: defaultsOption & requestConfig = { url: "" };
  const defaultConfigKeys = Object.keys(defaultConfig);
  for (let i = 0; i < defaultConfigKeys.length; i++) {
    const key = defaultConfigKeys[i];
    //@ts-ignore
    const item = defaultConfig[key];
    if (typeof item === "object") {
      //@ts-ignore
      configContainer[key] = merge({}, item);
    } else {
      if (key !== "baseURL") {
        //@ts-ignore
        configContainer[key] = item;
      }
    }
  }

  const customConfigKeys = Object.keys(customConfig);
  for (let i = 0; i < customConfigKeys.length; i++) {
    const key = customConfigKeys[i];
    //@ts-ignore
    const item = customConfig[key];
    if (typeof item === "object") {
      //@ts-ignore
      configContainer[key] = merge({}, item);
    } else {
      if (key !== "baseURL") {
        //@ts-ignore
        configContainer[key] = item;
      }
    }
  }
  return configContainer;
};

export default merge;
