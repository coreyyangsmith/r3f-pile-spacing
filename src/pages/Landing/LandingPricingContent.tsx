import { Stack, Typography } from "@mui/material"
import FeatureCard from "./FeatureCard"
import PricingCard from "./PricingCard"

const LandingPricingContent = () => {
    return (
        <div style={{
            width: "100%",
            height: '500px',
            padding: '32px',
            display: 'flex',
            flexDirection: 'column',
        }}>
            <Stack direction="row" spacing={8}
                style={{
                    display: 'flex',
                    flexGrow: 1,
                    justifyContent: 'center',
                }}>
                {/* Pricing Card Container */}
                <PricingCard
                    price="0.00"
                    title="Community"
                    feature1icon="test"
                    feature1text="Access the visualization editor and create designs."
                    feature2icon="test"
                    feature2text="Visualize group pile designs in three-dimensions."
                    feature3icon="test"
                    feature3text="Adjust material, pile and helix properties, and find conflicts."
                />
                <PricingCard
                    price="99.99"
                    title="Professional"
                    feature1icon="test"
                    feature1text="Configure soil layers for in-depth designs."
                    feature2icon="test"
                    feature2text="Save projects and designs for future reference."
                    feature3icon="test"
                    feature3text="Export your projects and design data to csv."
                />
            </Stack>
        </div>
    )
}

export default LandingPricingContent