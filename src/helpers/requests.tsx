// import { API_URL } from "../config";
import { LoginParamsType, QueueParamsType } from "../types";
import { $api } from "./api";
// import Cookies from "js-cookie";
// @ts-ignore
import { getLoginJson } from "../../electron/helper/filehelper";

const loginData = getLoginJson();
const loginParse = JSON.parse(loginData);

const API_URL = loginParse?.ip;

export const requests = {
  postLogin: (params: LoginParamsType) => $api.post(`${API_URL}/login`, params),
  postLogout: () => $api.post(`${API_URL}/logout`),
  fetchMe: () => $api.get(`${API_URL}/me`),
  fetchCategory: () => $api.get(`${API_URL}/get-category-by-kiosk`),
  queueCreate: (params: QueueParamsType) =>
    $api.post(`${API_URL}/queue`, params),
  checkAQueue: (params: { queue_id: number }) =>
    $api.post(`${API_URL}/check-a-queue`, params),
};
