import { Stack } from "@mui/material"
import FeatureCard from "./FeatureCard"

const LandingFeaureContent = () => {
    return (
        <div style={{
            width: "100%",
            border: '1px solid white',
            height: '500px',
            padding: '32px',
        }}>
            {/* Feature Card Container */}
            <Stack
                direction="row"
                spacing={4}
                style={{
                    height: '100%',
                    width: '100%',
                }}>
                <FeatureCard
                    iconPath="/icons/icon-drilling.png"
                    headingText="Effortlessly create and manipulate 3D models of grouped helical piles."
                    detailText="Manupilate pile and helix designs, and surrounding soil properties." />
                <FeatureCard
                    iconPath="/icons/icon-drilling.png"
                    headingText="Analyze pile spacing, depth, and load distribution in real-time."
                    detailText="Instantly assess pile performance and stability across a range of conditions."
                />
                <FeatureCard
                    iconPath="/icons/icon-drilling.png"
                    headingText="Export high-quality visuals for presentations and reports."
                    detailText="Effortlessly export professional-grade visuals for presentations and reports to effectively communicate design concepts and findings." />

            </Stack>
        </div>
    )
}

export default LandingFeaureContent