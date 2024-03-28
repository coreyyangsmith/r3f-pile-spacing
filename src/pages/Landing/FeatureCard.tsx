import { Typography } from '@mui/material'
import { mixed2 } from '../../themes/Color'

type FeatureCardProps = {
    iconPath: string
    headingText: string
    detailText: string
}

const FeatureCard = (props: FeatureCardProps) => {

    const logoColor = {
        filter: 'invert(100%) sepia(99%) saturate(100%) hue-rotate(81deg) brightness(111%) contrast(0%)',
    }

    return (
        <div
            style={{
                background: mixed2,
                height: "100%",
                width: "100%",
                borderRadius: '25px',
                padding: '16px',
            }}>
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
            </div>
            <Typography
                variant='h3'
                color="white">
                {props.headingText}
            </Typography>
            <Typography
                variant='h6'
                color="gray">
                {props.detailText}
            </Typography>
        </div>
    )
}

export default FeatureCard