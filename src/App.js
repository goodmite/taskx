import logo from './logo.svg';
import './App.css';
import * as d3 from "d3";
import {Eyes} from "./smiley/Eye";
import {Mouth} from "./smiley/Mouth";
import {Background} from "./smiley/Background";
import {Face} from "./smiley/Face";

const width = 500;
const height = 500;
const centerX = width / 2;
const centerY = height / 2;
const strokeWidth = 10;
const eyeRadius = 50;
const eyeOffsetX = width / 6;
const eyeOffsetY = 50;

const mouthWidth = 20;
const mouthRadius = 140;

const arr = [1, 2, 3];

function App() {
    return (
        <div className="App">
            {
                arr.map(() => (
                    <Face

                              width={width}
                              height={height}
                              centerX={centerX}
                              centerY={centerY}
                          >

                                <Background strokeWidth={strokeWidth} centerY={centerY}/>
                                <Eyes eyeOffsetX={eyeOffsetX} eyeOffsetY={eyeOffsetY} eyeRadius={eyeRadius* Math.random()}/>
                                <Mouth mouthRadius={mouthRadius} mouthWidth={mouthWidth * Math.random()}/>

                    </Face>
                ))
            }
        </div>
    );
}

export default App;
