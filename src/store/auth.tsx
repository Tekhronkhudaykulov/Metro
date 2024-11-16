import { SetState } from "zustand";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { requests } from "../helpers/requests";
import { LoginParamsType, MeType } from "../types";
import { message } from "antd";
import { $api } from "../helpers/api";
// @ts-ignore
import { loginToFile } from "../../electron/helper/filehelper";

interface StateAction {
  login: (params: LoginParamsType) => Promise<any>;
  loginLoading: boolean;
  me: () => Promise<any>;
  meLoading: boolean;
  user: MeType;
  logout: () => Promise<any>;
  logoutLoading: boolean;
}

const initialState: StateAction = {
  login: async () => {},
  loginLoading: false,
  me: async () => {},
  meLoading: false,
  user: {},
  logout: async () => {},
  logoutLoading: false,
};

const authStore = create(
  devtools((set: SetState<StateAction>) => ({
    ...initialState,
    login: async (params) => {
      set({ loginLoading: true });
      try {
        const data = await requests.postLogin(params);
        if (data?.status === 200) {
          message.success({ content: data?.data?.message });
          loginToFile({
            deviceName: params?.deviceName,
            email: params?.email,
            password: params?.password,
            ip: params?.ip,
            token: data?.data?.data?.authorization?.token,
          });
          set({ user: data?.data?.data?.user });
          $api.defaults.headers.common.Authorization = `Bearer ${data?.data?.data?.authorization?.token}`;
          return data?.data;
        }
      } catch (err: any) {
        if (err?.response?.data?.message) {
          message.error({ content: err?.response?.data?.message });
        }
        return err;
      } finally {
        set({ loginLoading: false });
      }
    },
    logout: async () => {
      set({ logoutLoading: true });
      try {
        const data = await requests.postLogout();
        if (data?.status === 200) {
          message.success({ content: "Вы вышли из системы" });
          return data?.data;
        }
      } catch (err) {
        return err;
      } finally {
        set({ logoutLoading: false });
      }
    },
    me: async () => {
      set({ meLoading: true });
      try {
        const data = await requests.fetchMe();
        if (data?.status === 200) {
          set({ user: data?.data?.data?.user });
          return data?.data;
        }
      } catch (err) {
        return err;
      } finally {
        set({ meLoading: false });
      }
    },
  }))
);

export default authStore;
