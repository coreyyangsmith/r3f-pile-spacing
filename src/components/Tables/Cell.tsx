import { Typography } from '@mui/material'
import { mixed2 } from '../../themes/Color'

type CellProps = {
    value: number | string
    height: number
    width: number
    color: string
}

const Cell = (props: CellProps) => {
    return (
        <div
            style={{
                width: `${props.width}px`,
                height: `${props.height}px`,
                background: mixed2,
            }}>
            <Typography
                variant='body1'
                color={props.color}
                style={{
                    textAlign: 'center',
                    justifyContent: 'center',
                    width: `${props.width}px`,
                    lineHeight: `${props.height}px`,
                    background: mixed2,
                    border: '1px solid #131313'

                }}>{props.value}</Typography>
        </div>
    )
}

export default Cell