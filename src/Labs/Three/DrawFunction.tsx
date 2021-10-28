import {FC, useState} from "react";
import {Canvas} from "@react-three/fiber";
import {acos, chain, compile, derivative, evaluate, exp, parse, parser, simplify, string} from "mathjs";
import {Line, OrbitControls, useHelper} from "@react-three/drei";
import {ArrowHelper, Vector2, Vector3} from "three";
import {Slider} from "rsuite";

const approach_line_len = 100000;


export function derivative_n(f: string, variable: string, order: number) {

    let f_parsed = parse(f);
    for (let i = 0; i < order; i++) {
        f_parsed = derivative(f_parsed, variable);
    }
    return f_parsed;
}

export function TaylorExpandTerm(f: string, variable: string, x0: number, order: number) {
    return `((${variable}-${x0})^${order})*${derivative_n(f, variable, order)}/${order}!`;
}

export function derivative_0_to_n(f: string, variable: string, order: number) {
    let f_parsed = parse(f);
    let derivatives = [f_parsed];
    for (let i = 0; i < order; i++) {
        f_parsed = derivative(f_parsed, variable);
        derivatives.push(f_parsed);
    }
    return derivatives;
}

export function TaylorExpansion(f: string, variable: string, x0: number, order: number) {
    let derivatives = derivative_0_to_n(f, variable, order);
    let expansion = "";
    for (let i = 0; i <= order; i++) {
        expansion += `+((${variable}-${x0})^${i})*${derivatives[i].evaluate({x: x0})}/${i}!`;
    }
    return expansion;
}

export function SampleFx(
    f: (x: number) => number,
    range: [number, number],
    step: number) {
    let sample_point_array = [];
    for (let cur_x = range[0]; cur_x < range[1]; cur_x += step) {
        let cur_y = f(cur_x);
        if (cur_y === Infinity) continue;
        sample_point_array.push(new Vector2(cur_x, cur_y));
    }
    return sample_point_array;
}

export function Array_V2TOV3(array_V2: Vector2[]) {
    let array_V3 = [];
    for (const v2 of array_V2) {
        array_V3.push(new Vector3(v2.x, v2.y, 0));
    }
    return array_V3;
}

const DrawFunction: FC = () => {

    const [ori_f, setOri_f] = useState("sin(x^2)");
    const [order, setOrder] = useState(3);
    const [range, setRange] = useState<[number, number]>([-5, 5]);
    const [step, setStep] = useState(0.01);

    let cur_curve_string = TaylorExpansion(ori_f, "x", 1, order);
    let cur_curve = compile(simplify(cur_curve_string).toString());
    let cur_curve_points = Array_V2TOV3(SampleFx(
        (x) =>
            cur_curve.evaluate({x: x}),
        range, step));

    let ori_curve = compile(simplify(ori_f).toString());
    let ori_curve_points = Array_V2TOV3(SampleFx(
        (x) =>
            ori_curve.evaluate({x: x}),
        range, step));

    return (<div style={{
        backgroundColor: "ghostwhite",
        position: "absolute",
        left: "10%",
        width: "80%",
        top: "30%",
        height: "50%",
        flexDirection: "row",
        display: "flex"
    }}>
        <div style={{backgroundColor:"beige",marginLeft:"10px"}}>
            <Canvas gl={{antialias: true}} camera={{zoom: 1}}>
                <Line points={cur_curve_points} color={"red"}/>
                <Line points={ori_curve_points}/>
                <OrbitControls enableRotate={false} maxDistance={30} minDistance={0.1}/>
            </Canvas>
        </div>
        <div style={{width:"30%",backgroundColor:"azure",}}>
            <div style={{margin:"10px 10px 10px 10px"}}>
                <p>Order</p>
                <Slider step={1} min={0} max={7} value={order} onChange={(v) => {
                    setOrder(v);
                }}/>
            </div>
        </div>
    </div>);
}

export default DrawFunction;