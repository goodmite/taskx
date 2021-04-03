<script>
    export let data, yScale, xScale, X_COLUMN, Y_COLUMN, formatterFn;
</script>

{#each data as d}
    <rect
            class="mark"
            y={yScale(d[Y_COLUMN])}
            width={xScale(d[X_COLUMN])}
            height={yScale.bandwidth()}>
        <title>{formatterFn(d[X_COLUMN])}</title>
    </rect>
{/each}


<style>
    
</style>