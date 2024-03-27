import { Typography } from '@mui/material'
import { mixed1, mixed2 } from '../../themes/Color'

type CellProps = {
    value: number | string
    height: number
    width: number
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
                color='white'
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