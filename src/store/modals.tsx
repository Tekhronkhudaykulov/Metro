import { create } from "zustand";

type StateAction = {
  openModal: (modalName: string) => void;
  closeModal: (modalName: string) => void;
  modals?: {
    logout?: boolean;
    check?: boolean;
    printCheck?: boolean;
    success?: boolean;
    cashModal? : boolean
  };
};

const initialState: StateAction = {
  openModal: () => {},
  closeModal: () => {},
  modals: {
    logout: false,
    check: false,
    printCheck: false,
    success: false,
    cashModal: false
  },
};

const modalsStore = create<StateAction>((set) => ({
  ...initialState,
  openModal: async (modalName) => {
    set((state) => ({ modals: { ...state.modals, [modalName]: true } }));
  },
  closeModal: async (modalName) => {
    set((state) => ({ modals: { ...state.modals, [modalName]: false } }));
  },
}));

export default modalsStore;




// {modals?.cashModal && (
//   <Notification  message={"Внесенные купюры могут быть подделкой !"} />
//   )}