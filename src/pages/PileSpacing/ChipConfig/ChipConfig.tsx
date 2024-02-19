import { Chip, Paper, Stack } from '@mui/material'
import { BaseSyntheticEvent } from 'react'

const ChipConfig = (props) => {

    const handleClick = (event: BaseSyntheticEvent) => {
        const target = event?.currentTarget
        if (target) {
            props.setChipState(target.id)
        }
    }

    return (
        <Paper
            square={true}
            variant='outlined'
            sx={{
                position: 'absolute',
                zIndex: 10,
                background: 'rgba(255, 255, 255, 0.1)',
                margin: '16px',
                width: {
                    xs: 'calc(33% - 32px)', // 0 - 600px
                    sm: 'calc(33% - 32px)', // 600 - 900px
                    md: 'calc(33% - 32px)', // 900 - 1200px
                    lg: 'calc(25% - 32px)', // 1200 - 1536px
                    xl: 'calc(25% - 32px)', // 1536px and up
                },
                height: {
                    xs: 'calc(8% - 16px)', // 0 - 600px
                    sm: 'calc(8% - 16px)', // 600 - 900px
                    md: 'calc(8% - 16px)', // 900 - 1200px
                    lg: 'calc(8% - 16px)', // 1200 - 1536px
                    xl: 'calc(8% - 16px)', // 1536px and up
                },
                display: 'flex',
                alignItems: 'center'
            }}
        >
            <Stack direction="row" sx={{
                display: 'flex',
                alignItems: 'center',
                width: "100%", height: "100%",
                margin: '8px',
                justifyContent: 'center'
            }} spacing={1}>
                <Chip className={`conflict ${props.chipState === 'conflict' && 'active'}`} id="conflict" onClick={handleClick} label='Conflict' variant='outlined' size='small' color='primary' sx={{ display: 'flex', justifyContent: 'left' }} />
                <Chip className={`pile ${props.chipState === 'pile' && 'active'}`} id="pile" onClick={handleClick} label="Pile" variant='outlined' size='small' color='primary' sx={{ display: 'flex', justifyContent: 'left' }} />
                <Chip className={`helix ${props.chipState === 'helix' && 'active'}`} id="helix" onClick={handleClick} label="Helix" variant='outlined' size='small' color='primary' sx={{ display: 'flex', justifyContent: 'left' }} />
                <Chip className={`settings ${props.chipState === 'settings' && 'active'}`} id="settings" onClick={handleClick} label="Settings" variant='outlined' size='small' color='primary' sx={{ display: 'flex', justifyContent: 'right' }} />
            </Stack>
        </Paper >
    )
}

export default ChipConfig