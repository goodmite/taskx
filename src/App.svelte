<script>
    import * as d3 from "d3";

    const url =
        'https://gist.githubusercontent.com/curran/0ac4077c7fc6390f5dd33bf5c06cb5ff/raw/605c54080c7a93a417a3cea93fd52e7550e76500/UN_Population_2019.csv';

    let width = 800, innerHeight, innerWidth, axisLabelOffset, yScale, maxPop, xScale, height = 500, data = [],
        year = 1950;
    const margin = {
        top: 20,
        bottom: 60,
        left: 220,
        right: 10,
    }

    const addPopulation = (data, year) => {
        return data.map(d => ({...d, population: (+d[year]) * 1000})).slice(0, 10);
    }

    d3.csv(url)
        .then(dataArg => {
            const interval = setInterval(() => {
                data = addPopulation(dataArg, year);
                if (year === 2020) {
                    year = 1950;
                } else {
                    year++;
                }
            }, 100);
        })

    const updateGraph = () => {
        innerHeight = height - margin.top - margin.bottom;
        innerWidth = width - margin.left - margin.right;
        axisLabelOffset = 60;
        yScale = d3.scaleBand()
            .domain(data.map(d => d.Country))
            .range([0, innerHeight])
            .paddingInner(0.1);
        maxPop = d3.max(data, d => d.population);
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

</script>

{#if data}
    <div class="wrapper">
        <svg width={width} height={height}>
            <g transform={`translate(${margin.left}, ${margin.right})`}>

                {#each xScale.ticks() as tickValue}
                    <g class={'tick'} transform={`translate(${xScale(tickValue)}, ${0})`}>
                        <line y2={innerHeight} stroke={'black'}/>
                        <text style={{'textAnchor': 'middle'}} y={innerHeight + 5} dy=".71em">
                            {d3.format(".2s")(tickValue).replace('G', 'B')}
                        </text>
                    </g>
                {/each}


                {#each yScale.domain() as tickValue}
                    <g class={'tick'} transform={`translate(${0}, ${yScale(tickValue) + yScale.bandwidth()/2})`}>
                        <text style="text-anchor: end" x={-3} dy={'.32em'}> {tickValue} </text>
                    </g>
                {/each}

                <text class="axis-label" x={innerWidth/2} y={innerHeight + axisLabelOffset} textAnchor={'middle'}>
                    Population ({year})
                </text>

                {#each data as d(d.Country)}
                    <!--{#key xScale(d.population)}-->
                    <rect
                            class="mark"
                            y={yScale(d.Country)}
                            width={xScale(d.population)}
                            height={yScale.bandwidth()}>
                        <title>
                            {
                                d3.format(".2s")((d.population)).replace('G', 'B')
                            }
                        </title>
                    </rect>
                    <!--{/key}-->
                {/each}
            </g>
        </svg>

    </div>
{/if}

<style>
</style>
