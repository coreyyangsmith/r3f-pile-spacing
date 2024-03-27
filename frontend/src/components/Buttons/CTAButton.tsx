// MUI
import { Button, Typography } from "@mui/material";

// Themes
import { useTheme } from '@mui/material/styles';


type CTAButtonProps = {
    text: string;
    onClick: () => void;
    size: "small" | "medium" | "large";
}

const CTAButton = (props: CTAButtonProps) => {
    const theme = useTheme();
    console.log(theme)

    return (
        <Button
            variant="contained"
            size={props.size}
            style={{
                borderRadius: 25,
                backgroundColor: theme.palette.primary1.main,
            }}
            onClick={props.onClick}
        >
            <Typography variant="body1">{props.text}</Typography>
        </Button>
    )
}

export default CTAButton