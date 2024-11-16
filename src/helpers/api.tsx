import i18n from "../../i18n";
// import Cookies from "js-cookie";

import axios from "axios";
// @ts-ignore
import { getLoginJson, loginToFile } from "../../electron/helper/filehelper";
// import { API_URL } from "../config";

// const IP_ADDRESS = Cookies.get("ip");

// const SAVE_TIME = { expires: 365, path: "/" };

const loginData = getLoginJson();
console.log(loginData);

const loginParse = loginData && JSON.parse(loginData);
export const $api = axios.create({
  baseURL: loginParse?.ip,
});

$api.defaults.headers.common["Accept"] = "application/json";

export const initApp = () => {
  const loginData = getLoginJson();
  const loginParse = loginData && JSON.parse(loginData);
  const token = loginParse?.token;
  // const token = window.localStorage.getItem("queue_token");
  $api.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const setToken = (token: string) => {
  // Cookies.set("queue_token", token, SAVE_TIME);
  const loginData = getLoginJson();
  const loginParse = loginData && JSON.parse(loginData);
  loginToFile({
    ...loginParse,
    token: token,
  });
  // window.localStorage.setItem("queue_token", token);
  $api.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const getToken = () => {
  const loginData = getLoginJson();
  const loginParse = loginData && JSON.parse(loginData);
  const token = loginParse?.token;
  // const token = window.localStorage.getItem("queue_token");
  return token;
};

export const removeToken = () => {
  const loginData = getLoginJson();
  const loginParse = loginData && JSON.parse(loginData);
  loginToFile({
    ...loginParse,
    token: null,
  });
  // window.localStorage.removeItem("queue_token");
  $api.defaults.headers.common.Authorization = `Bearer`;
};

// Language
$api.interceptors.request.use((config) => {
  config.headers["Accept-Language"] = i18n.language.toLowerCase();
  return config;
});

export const changeLanguage = (lng: string) => {
  i18n.changeLanguage(lng);
  $api.defaults.headers.common["Accept-Language"] = lng;
};
