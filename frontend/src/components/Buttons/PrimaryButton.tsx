// MUI
import { Button, Typography } from "@mui/material";

// Themes
import { useTheme } from '@mui/material/styles';


type PrimaryButtonProps = {
    text: string;
    onClick: () => void;
    size: "small" | "medium" | "large";
}

const PrimaryButton = (props: PrimaryButtonProps) => {
    const theme = useTheme();

    return (
        <Button
            variant="contained"
            size={props.size}
            style={{
                borderRadius: 25,
                backgroundColor: theme.palette.primary6.main,
                width: "100px",
                height: '35px'
            }}
            onClick={props.onClick}
        >
            <Typography variant="body1">{props.text}</Typography>
        </Button>
    )
}

export default PrimaryButton