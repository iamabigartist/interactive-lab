import create from "zustand";
import createCounterDictSlice, {CounterDictSlice} from "./Slices/CounterDictSlice";

export type ZustandState = CounterDictSlice;

const useStoreZustand =
    create<ZustandState>(((
        set,
        get,
        api) => (
        {
            ...createCounterDictSlice(set, get, api),
        })));

export default useStoreZustand;