import { Typography } from '@mui/material'
import { dark1, dark2, dark4, dark5, dark6, mixed1, mixed4, mixed5, mixed6 } from '../../themes/Color'

type FeatureCardProps = {
    iconPath: string
    class: string
    headingText: string
    detailText: string
}

const FeatureCard = (props: FeatureCardProps) => {

    const logoColor = { filter: 'invert(100%) sepia(99%) saturate(100%) hue-rotate(81deg) brightness(111%) contrast(0%)' }

    return (
        <div className={props.class}>

            {/* Icon */}
            <div style={{
                height: '64px',
                width: '64px',
            }}>
                <img
                    src={props.iconPath}
                    style={logoColor}
                    width="100%"
                    alt="icon" />
            </div >

            {/* Heading */}
            <Typography
                variant='h3'
                color='white'>
                {props.headingText}
            </Typography>

            {/* Details */}
            <Typography
                variant='h6'
                color={mixed6}>
                {props.detailText}
            </Typography>
        </div >
    )
}

export default FeatureCard