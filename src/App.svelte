<script>
    import * as d3 from "d3";
    import AxisBottom from "./population/AxisBottom.svelte";
    import AxisLeft from "./population/AxisLeft.svelte";
    import Marks from "./population/Marks.svelte";

    //reference: https://www.youtube.com/watch?v=2LhoCfjm8R4&t=21206s
    //code in react: https://vizhub.com/curran/32dfc8d2393844c6a5b9d199d9a35946?edit=files&file=index.js
    const url =
        'https://gist.githubusercontent.com/curran/0ac4077c7fc6390f5dd33bf5c06cb5ff/raw/605c54080c7a93a417a3cea93fd52e7550e76500/UN_Population_2019.csv';

    /*margin: margin surrounding the svg*/
    const margin = {
        top: 20,
        bottom: 60,
        left: 220,
        right: 10,
    }
    let width = 800, innerHeight, innerWidth, axisLabelOffset = 60, yScale, maxPop, xScale, height = 500, data = [],
        year = 1950;
    innerHeight = height - margin.top - margin.bottom;
    innerWidth = width - margin.left - margin.right;
    const Y_COLUMN = "Country", X_COLUMN = "population";

    const addColumn = (data, year) => {
        return data.map(d => ({...d, [X_COLUMN]: (+d[year]) * 1000})).slice(0, 10);
    }

    d3.csv(url)
        .then(dataArg => {
            const interval = setInterval(() => {
                data = addColumn(dataArg, year);
                if (year === 2020) {
                    year = 1950;
                } else {
                    year++;
                }
            }, 100);
        })

    const updateGraph = () => {
        yScale = d3.scaleBand()
            .domain(data.map(d => d[Y_COLUMN]))
            .range([0, innerHeight])
            .paddingInner(0.1);
        maxPop = d3.max(data, d => d[X_COLUMN]);
        xScale = d3.scaleLinear()
            .domain([0, maxPop])
            .range([0, innerWidth])
    }

    $:{
        if (data) {
            updateGraph()
        }
    }

    const reveal = (node, {duration}) => {
        const widthAttr = d3.select(node).attr('width');
        return {
            duration,
            tick: (t, u) => {
                const w = (u) * widthAttr;
                return d3.select(node).attr('width', w);
            }
        };
    }

    const formatterFn = _ => d3.format(".2s")((_)).replace('G', 'B');

</script>

{#if data}
    <div class="wrapper">
        <svg width={width} height={height}>
            <g transform={`translate(${margin.left}, ${margin.right})`}>

                <AxisBottom
                        xScale={xScale}
                        innerHeight={innerHeight}
                />

                <AxisLeft yScale={yScale}/>

                <text class="axis-label" x={innerWidth/2} y={innerHeight + axisLabelOffset} text-anchor="middle">
                    Population ({year})
                </text>
                <Marks
                        data={data}
                        xScale={xScale}
                        yScale={yScale}
                        X_COLUMN="{X_COLUMN}"
                        Y_COLUMN="{Y_COLUMN}"
                        formatterFn="{formatterFn}"
                />


            </g>
        </svg>

    </div>
{/if}


