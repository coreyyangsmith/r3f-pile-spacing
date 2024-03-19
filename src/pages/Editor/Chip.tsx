import { useTheme } from '@emotion/react';
import { Typography } from '@mui/material';

type ChipProps = {
    text: string;
}

const Chip = (props: ChipProps) => {
    const theme = useTheme();

    const chipStyle = {
        border: '1px solid ' + theme.palette.dark6.main,
        borderRadius: '50px',
        height: '25px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '4px 16px 4px 16px',
    }

    const typographyStyle = {
        color: theme.palette.dark6.main,
        marginLeft: '4px',
        marginRight: '4px',
    }

    return (
        <div style={chipStyle}>
            <Typography variant="body2" style={typographyStyle}>{props.text}</Typography>
        </div>
    )
}

export default Chip