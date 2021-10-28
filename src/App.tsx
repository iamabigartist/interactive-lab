import React, {useState} from 'react';
import "rsuite/dist/rsuite.min.css";
import './App.css';
import {MyCanvas} from "./Labs/Three/MyCanvas";
import {Dropdown} from "rsuite";
import {OneStore} from "./Labs/States/ZustandStore/ZustandLab";
import DrawFunction from "./Labs/Three/DrawFunction";

function App() {

    const [display_i, setDisplay_i] = useState(2);
    const display_items = ([
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
        <div className="App">
            {display_items[display_i].item}
            <Dropdown
                title={display_items[display_i].name}
                activeKey={display_i}
                style={{position: "fixed", top: "5%", left: "5%"}}
                onSelect={eventKey => {
                    setDisplay_i(eventKey);
                }}
            >
                {display_items.map((value, index) =>
                    <Dropdown.Item key={index} eventKey={index}>{value.name} </Dropdown.Item>)}
            </Dropdown>
        </div>
    );
}

export default App;
