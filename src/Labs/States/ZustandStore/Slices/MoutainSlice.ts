import {StateCreator} from "zustand"
import {ZustandState} from "../useStoreZustand";
import produce, {enableAllPlugins} from "immer";

export interface MoutainDictSlice {
    counter_dict: Map<string, number>,
    add1: (name: string) => void,
}

enableAllPlugins();

const createMoutainDictSlice: StateCreator<ZustandState> = (
    set,
    get,
    api) => ({
    counter_dict: new Map<string, number>(),
    add1: (name: string) => {
        set(produce<MoutainDictSlice>(state => {
            state.counter_dict.set(name, (state.counter_dict.get(name) ?? 0) + 1);
        }));
    },
});

export default createMoutainDictSlice;