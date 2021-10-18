import React, {FC, useEffect, useRef, useState} from 'react';
import "rsuite/dist/rsuite.min.css";
import * as THREE from "three";
import {Slider} from "rsuite";

export const MyCanvas: FC = () => {

    const [v, setV] = useState(5);
    const canvas = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

        const renderer = new THREE.WebGLRenderer({antialias: true});
        renderer.setSize(window.innerWidth, window.innerHeight);
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial({color: new THREE.Color(0.1 * v, 0.1 * v, 0.1 * v)});
        const cube = new THREE.Mesh(geometry, material);
        const animate = function () {
            requestAnimationFrame(animate);

            cube.rotation.x = v;
            cube.rotation.y = v;

            renderer.render(scene, camera);
        };

        scene.add(cube);

        camera.position.z = v;

        animate();
        console.log(canvas.current);
        canvas.current?.replaceChildren(renderer.domElement);


    }, [canvas, v]);

    return (
        <div>
            <div ref={canvas}/>
            <div style={{padding: "50px 50px 50px 50px"}}>
                <Slider
                    progress
                    value={v}
                    min={5}
                    max={10}
                    step={0.01}
                    onChange={value => {
                        setV(value);
                    }}
                />
            </div>

        </div>
    )
}

