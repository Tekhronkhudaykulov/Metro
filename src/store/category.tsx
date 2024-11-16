import { SetState, create } from "zustand";
import { devtools } from "zustand/middleware";
import { requests } from "../helpers/requests";
import { ServiceCardType } from "../types";

interface StateAction {
  getList: () => Promise<any>;
  list: ServiceCardType[];
  listLoading: boolean;
}

const initialState: StateAction = {
  getList: async () => {},
  list: [],
  listLoading: false,
};

const categoryStore = create(
  devtools((set: SetState<StateAction>) => ({
    ...initialState,
    getList: async () => {
      set({ listLoading: true });
      try {
        const { data } = await requests.fetchCategory();
        set({ list: data?.data });
        return data;
      } catch (err) {
        return err;
      } finally {
        set({ listLoading: false });
      }
    },
  }))
);

export default categoryStore;
