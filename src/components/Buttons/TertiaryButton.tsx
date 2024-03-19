// MUI
import { Button, Typography } from "@mui/material";

// Themes
import { useTheme } from '@mui/material/styles';

type TertiaryButtonProps = {
    text: string;
    onClick: () => void;
}

const TertiaryButton = (props: TertiaryButtonProps) => {
    const theme = useTheme();

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
                color={theme.palette.dark6.main}
            >
                {props.text}</Typography>
        </Button>
    )
}

export default TertiaryButton