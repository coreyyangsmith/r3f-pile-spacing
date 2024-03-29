import Divider from "../../components/Divider";
import NavBar from "../../components/Navigation/NavBar"
import { mixed1 } from "../../themes/Color";
import LandingFeaureContent from "./LandingFeaureContent";
import LandingHeroContent from "./LandingHeroContent";
import LandingPricingContent from "./LandingPricingContent";

const Landing = () => {

    return (
        <div style={{
            background: mixed1,
            width: '100%',
            height: '100%',
            overflow: 'auto',
        }}>
            {/* NavBar */}
            <NavBar />

            <Divider />
            <div style={{ marginTop: '32px' }} />
            <LandingHeroContent />
            <div style={{ marginTop: '32px' }} />
            <LandingFeaureContent />
            {/* <LandingPricingContent /> */}

        </div >
    )
}

export default Landing