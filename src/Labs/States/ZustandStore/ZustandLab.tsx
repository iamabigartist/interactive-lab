import useStoreZustand from "./useStoreZustand";
import React, {useEffect} from "react";
import {useControls} from "leva";

export const OneStore = () => {
    const {counter_dict, add1} = useStoreZustand();
    const {v1} = useControls({v1: {min: 0, max: 10, value: 1}});


    useEffect(() => {
        add1("On Once Effect")
    }, [add1]);

    useEffect(() => {
        add1("On v1 change")
    }, [v1]);


    return <div>
        <h1>Show the num of rendering  :</h1>
        {Array.from(counter_dict,
            ([name, num]) =>
                <h3>{name}: {num}</h3>)}
    </div>;
}