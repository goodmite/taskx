<script>
    import * as d3 from 'd3';

    export let xScale, innerHeight;
</script>
{#each xScale.ticks() as tickValue}
    <g class={'tick'} transform={`translate(${xScale(tickValue)}, ${0})`}>
        <line y2={innerHeight} stroke={'black'}/>
        <text style={{'textAnchor': 'middle'}} y={innerHeight + 5} dy=".71em">
            {d3.format(".2s")(tickValue).replace('G', 'B')}
        </text>
    </g>
{/each}