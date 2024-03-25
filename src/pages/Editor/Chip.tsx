import { Typography } from '@mui/material';
import { BaseSyntheticEvent } from 'react';
import { dark6 } from '../../themes/Color';

type ChipProps = {
    text: string;
    onClick: (event: BaseSyntheticEvent) => void;
    type: string;
    class: string,
}

const Chip = (props: ChipProps) => {
    const chipStyle = {
        display: 'flex',
        border: '1px solid ' + dark6,
        borderRadius: '50px',
        height: '25px',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '4px 16px 4px 16px',
        marginRight: '8px',
        whiteSpace: 'nowrap',
    }

    const typographyStyle = {
        color: dark6,
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