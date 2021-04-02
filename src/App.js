import logo from './logo.svg';
import './App.css';
import * as d3 from "d3";
import {useState, useEffect} from "react";

const url =
    'https://gist.githubusercontent.com/curran/0ac4077c7fc6390f5dd33bf5c06cb5ff/raw/605c54080c7a93a417a3cea93fd52e7550e76500/UN_Population_2019.csv';

const height = 500;
const width = 800;
const margin = {
    top: 20,
    bottom: 60,
    left: 220,
    right: 10,
}

function App() {
    const [data, setData] = useState(null);
    useEffect(_ => {
        const row = d => {
            /*create another row named 2020, which contains int, not string*/
            d.population = (+d['2020']) * 1000;
            return d;
        }
        d3.csv(url, row)
            .then(dataArg => {
                setData(dataArg.slice(0, 10));
            })
    }, [])
    if (!data) {
        return <pre>Loading...</pre>;
    }

    const innerHeight = height - margin.top - margin.bottom;
    const innerWidth = width - margin.left - margin.right;
    const axisLabelOffset = 60;
    const yScale = d3.scaleBand()
        .domain(data.map(d => d.Country))
        .range([0, innerHeight])
        .paddingInner(0.1);
    const maxPop = d3.max(data, d => d.population);
    const xScale = d3.scaleLinear()
        .domain([0, maxPop])
        .range([0, innerWidth])
    return (
        <>
            <svg width={width} height={height}>
                <g transform={`translate(${margin.left}, ${margin.right})`}>
                    {
                        xScale.ticks().map(tickValue => (
                            <g className={'tick'} transform={`translate(${xScale(tickValue)}, ${0})`}>
                                <line y2={innerHeight} stroke={'black'}/>
                                <text style={{'textAnchor': 'middle'}} y={innerHeight + 5} dy=".71em">
                                    {d3.format(".2s")(tickValue).replace('G', 'B')}
                                </text>
                            </g>
                        ))
                    }
                    {
                        yScale.domain().map(tickValue => (
                            <g className={'tick'} transform={`translate(${0}, ${yScale(tickValue) + yScale.bandwidth()/2})`}>
                                <text style={{'textAnchor': 'end'}} x={-3} dy={'.32em'}> {tickValue} </text>
                            </g>
                        ))
                    }
                    <text className={'axis-label'} x={innerWidth/2} y={innerHeight + axisLabelOffset} textAnchor={'middle'}>Population</text>
                    {data.map((d) => (
                        <rect
                            className={'mark'}
                            key={d.Country}
                            y={yScale(d.Country)}
                            width={xScale(d.population)}
                            height={yScale.bandwidth()}
                        >
                            <title>
                                {
                                    d3.format(".2s")((d.population)).replace('G', 'B')
                                }
                            </title>
                        </rect>
                    ))}
                </g>
            </svg>
        </>
    );
}

export default App;
