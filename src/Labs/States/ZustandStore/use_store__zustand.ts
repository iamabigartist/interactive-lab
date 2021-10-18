import create from "zustand";

const useStore_Zustand =
    create<{
        counter1: number,
        plus1: () => void
    }>((set, get, api) => ({
        counter1: 0,
        plus1: () => {
            set((state) => ({counter1: state.counter1 + 1}));
        },
    }))

export default useStore_Zustand;