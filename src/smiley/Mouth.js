import * as d3 from "d3";

export const Mouth = ({mouthRadius, mouthWidth}) => {
    const mouthArc = d3.arc()
        .innerRadius(mouthRadius)
        .outerRadius(mouthRadius + mouthWidth)
        .startAngle(Math.PI * 2.5 / 4)
        .endAngle(Math.PI * 5.5 / 4);
    return (
        <>
            <path d={mouthArc()}/>
        </>
    )
}
