import {StateCreator} from "zustand"
import {ZustandState} from "../useStoreZustand";
import produce, {enableAllPlugins} from "immer";

export interface CounterDictSlice {
    counter_dict: Map<string, number>,
    add1: (name: string) => void,
}

enableAllPlugins();

const createCounterDictSlice: StateCreator<ZustandState> = (
    set,
    get,
    api) => ({
    counter_dict: new Map<string, number>(),
    add1: (name: string) => {
        set(produce<CounterDictSlice>(state => {
            state.counter_dict.set(name, (state.counter_dict.get(name) ?? 0) + 1);
        }));
    },
});

export default createCounterDictSlice;