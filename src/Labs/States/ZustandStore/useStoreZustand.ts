import create from "zustand";
import createCounterDictSlice, {CounterDictSlice} from "./Slices/CounterDictSlice";
import {MoutainDictSlice} from "./Slices/MoutainSlice";


export type ZustandState = CounterDictSlice & MoutainDictSlice;

const useStoreZustand =
    create<ZustandState>(((
        set,
        get,
        api) => (
        {
            ...createCounterDictSlice(set, get, api),
        })));

export default useStoreZustand;