<script>
    import * as d3 from 'd3';

    export let data, yScale, xScale;
</script>

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