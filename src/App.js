import logo from './logo.svg';
import './App.css';
import * as d3 from "d3";
import {useState, useEffect} from "react";

const url = "https://gist.githubusercontent.com/curran/b236990081a24761f7000567094914e0/raw/cssNamedColors.csv";

const height = window.innerHeight;
const width = window.innerWidth;
const arc = d3.arc()
    .innerRadius(0)
    .outerRadius(height*100)
function App() {
    let message;
    const [data, setData] = useState(null);
    useEffect(_ => {
        d3.csv(url)
            .then(dataArg => {
                setData(dataArg);
            })
    }, [])
    return (
        <svg width={width} height={height} overflow={'hidden'}>
            <g transform={`translate(${width/10}, ${height/5})`}>
                {
                    data && data.map((e, index) => {
                        return (
                            <path height={200} fill={e['RGB hex value']} d={arc({
                                startAngle:(index * 2* Math.PI/(data.length)),
                                endAngle: ((index + 1) * 2* Math.PI/(data.length)),
                            })}></path>
                        )
                    })}
            </g>
        </svg>
    );
}

export default App;
