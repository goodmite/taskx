export const Background = ({centerY, strokeWidth}) => {
    return (
        <>
            <circle cx={0} r={centerY - strokeWidth} stroke={'black'}
                    strokeWidth={strokeWidth}
                    fill={'yellow'}/>
        </>
    )
}
