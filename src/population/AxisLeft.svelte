<script>
    export let yScale, data, xScale, xValue, yValue;
</script>

{#each yScale.domain() as tickValue}
    <g class={'tick'} transform={`translate(${0}, ${yScale(tickValue) + yScale.bandwidth()/2})`}>
        <text style="text-anchor: end" x={-3} dy={'.32em'}> {tickValue} </text>
    </g>
{/each}