import logo from './logo.svg';
import './App.css';
import * as d3 from "d3";

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

const mouthArc = d3.arc()
    .innerRadius(mouthRadius)
    .outerRadius(mouthRadius + mouthWidth)
    .startAngle(Math.PI* 2.5 / 4)
    .endAngle(Math.PI * 5.5 / 4);

function App() {
    return (
        <div className="App">
            <svg width={width} height={height}>
                <g transform={`translate(${centerX},${centerY})`}>
                    <circle cx={0} r={centerY - strokeWidth} stroke={'black'}
                            strokeWidth={strokeWidth}
                            fill={'yellow'}/>
                    <circle cx={-eyeOffsetX} cy={-eyeOffsetY} r={eyeRadius}/>
                    <circle cx={eyeOffsetX} cy={-eyeOffsetY} r={eyeRadius}/>
                    <path d={mouthArc()}/>
                </g>
            </svg>
        </div>
    );
}

export default App;
