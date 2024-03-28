import Divider from "../../components/Divider";
import NavBar from "../../components/Navigation/NavBar"
import { mixed1 } from "../../themes/Color";
import LandingFeaureContent from "./LandingFeaureContent";
import LandingHeroContent from "./LandingHeroContext";

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
            {/* Hero Content */}
            <LandingHeroContent />
            <LandingFeaureContent />



        </div >
    )
}

export default Landing