import { useTheme } from '@emotion/react';
import { Typography } from '@mui/material';
import { BaseSyntheticEvent } from 'react';

type ChipProps = {
    text: string;
    onClick: (event: BaseSyntheticEvent) => void;
    type: string;
    class: string,
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
        marginRight: '8px',
    }

    const typographyStyle = {
        color: theme.palette.dark6.main,
        marginLeft: '4px',
        marginRight: '4px',
    }

    return (
        <div style={chipStyle}
            onClick={props.onClick}
            id={props.text}
            className={props.class}>
            <Typography
                variant="body2"
                style={typographyStyle}
                className={props.class}>
                {props.text}
            </Typography>
        </div>
    )
}

export default Chip