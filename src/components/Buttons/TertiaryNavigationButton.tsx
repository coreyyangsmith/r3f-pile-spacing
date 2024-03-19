// MUI
import { Button, Typography } from "@mui/material";

// Themes
import { useTheme } from '@mui/material/styles';

type TertiaryNavigationButtonProps = {
    text: string;
    onClick: () => void;
}

const TertiaryNavigationButton = (props: TertiaryNavigationButtonProps) => {
    const theme = useTheme();
    console.log(theme)

    return (
        <Button
            variant="text"
            size="large"
            color="secondary"
            style={{
                borderRadius: 25,
            }}
            onClick={props.onClick}
        >
            <Typography
                variant="body1"
                color={theme.palette.mixed3.main}
            >
                {props.text}</Typography>
        </Button>
    )
}

export default TertiaryNavigationButton