import { useTheme } from '@emotion/react';
import { Typography } from '@mui/material';
import { BaseSyntheticEvent } from 'react';
import { useSelection } from '../../hooks/useSelection';

type ChipProps = {
    text: string;
    onClick: (event: BaseSyntheticEvent) => void;
    type: string;
}

const Chip = (props: ChipProps) => {
    const theme = useTheme();
    const selection = useSelection();


    const checkActive = (selection: string, section: string) => {
        // Activity for Selection
        if (props.type == "selection" && selection === section) return true
        return false
    }

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
        <div style={chipStyle}
            onClick={props.onClick}
            id={props.text}
            className={checkActive(selection?.state.selection.selectedSection, props.text) ? "active" : ""}
        >
            <Typography
                variant="body2"
                style={typographyStyle}
                className={checkActive(selection?.state.selection.selectedSection, props.text) ? "active" : ""}
            >{props.text}</Typography>
        </div>
    )
}

export default Chip