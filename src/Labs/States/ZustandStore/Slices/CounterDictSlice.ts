import {StateCreator} from "zustand"
import {ZustandState} from "../useStoreZustand";

export interface CounterDictSlice {
    counter_dict: Map<string, number>,
    add1: (name: string) => void,
}

const createCounterDictSlice: StateCreator<ZustandState> = (
    set,
    get,
    api) => ({
    counter_dict: new Map<string, number>(),
    add1: (name: string) => {
        set((state) => {
                return {
                    counter_dict:
                        state.counter_dict.set(
                            name,
                            (state.counter_dict?.get(name) ?? 0) + 1)
                };
            }
        );
    },
});

export default createCounterDictSlice;