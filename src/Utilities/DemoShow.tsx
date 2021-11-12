import React, {FC, useState} from 'react';
import "rsuite/dist/rsuite.min.css";
import {MyCanvas} from "../Labs/Three/MyCanvas";
import {Dropdown} from "rsuite";
import {OneStore} from "../Labs/States/ZustandStore/ZustandLab";
import DrawFunction from "../Labs/Three/DrawFunction";

const DemoShow: FC = () => {

    const [display_i, setDisplay_i] = useState(2);
    const display_demos = ([
        {name: "plain THREE canvas", item: <MyCanvas/>},
        {name: "Zustand", item: <OneStore/>},
        {name: "THREE draw function", item: <DrawFunction/>},
        {
            name: "Test End", item:
                <div>
                    <h1>This repo is used to test all kinds of interactive packages for our website.</h1>
                    <a href={"https://github.com/64cksp4c3"}>Studio HomePage</a>
                </div>
        }
    ]);

    return (
        <div>
            {display_demos[display_i].item}

            {/*The demo selector*/}
            <Dropdown
                title={display_demos[display_i].name}
                activeKey={display_i}
                style={{position: "fixed", top: "2.5%", left: "2.5%"}}
                onSelect={eventKey => {
                    setDisplay_i(eventKey);
                }}
            >
                <div>
                    {display_demos.map((value, index) =>
                        <Dropdown.Item key={index} eventKey={index}>{value.name} </Dropdown.Item>)}
                </div>
            </Dropdown>
        </div>
    );
}

export default DemoShow;
