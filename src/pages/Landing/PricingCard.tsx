import { Button, Stack, Typography } from "@mui/material"
import { mixed2 } from "../../themes/Color"
import Divider from "../../components/Divider"

type PricingCardProps = {
    price: string
    title: string
    feature1icon: string
    feature1text: string
    feature2icon: string
    feature2text: string
    feature3icon: string
    feature3text: string
}

const PricingCard = (props: PricingCardProps) => {
    return (
        <div style={{
            height: '100%',
            width: "300px",
            background: mixed2,
            borderRadius: '25px',
        }}>
            <Stack direction="column" spacing={1}
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    width: '100%',
                    height: '100%',
                    paddingTop: '32px',
                    paddingLeft: '32px',
                    paddingRight: '32px',

                }}>
                <Typography variant="h3" color='white' style={{ textAlign: 'center' }}>{props.title}</Typography>
                <Typography variant="h3" color='white' style={{ textAlign: 'center' }}>${props.price}</Typography>
                <Divider />
                <Typography variant="body1" color='gray'>• {props.feature1text}</Typography>
                <Typography variant="body1" color='gray'>• {props.feature2text}</Typography>
                <Typography variant="body1" color='gray'>• {props.feature3text}</Typography>
                <div style={{ marginTop: '16px' }} />
                <Button variant="outlined">Try Now</Button>
            </Stack>
        </div>
    )
}

export default PricingCard