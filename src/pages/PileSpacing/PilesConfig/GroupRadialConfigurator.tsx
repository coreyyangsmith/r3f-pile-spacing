import { Paper, Stack, TextField, Typography } from '@mui/material'
import { useCustomization } from '../../../context/Customization';
import Pile from '../../../components/Pile';
import { usePiles } from '../../../context/PileContext';

const GroupRadialConfigurator = () => {
    const {
        number,
        length,
        diameter,
        radius,
        setRadius,
        batterAngle
    } = useCustomization();
    const { piles, setPiles } = usePiles();

    const handleChange = (event) => {
        setRadius(event.target.value);
        const newPiles = {}
        for (let i = 0; i < number; i++) {
            newPiles[i] = new Pile(length, diameter, radius, batterAngle);
        }
        setPiles(newPiles)
    }
    return (
        <Paper
            square={true}
            variant='outlined'
            sx={{
                zIndex: 1,
                background: 'rgba(255, 255, 255, .1)',
                marginLeft: "16px",
                marginRight: "16px",
                width: "calc(100% - 32px)",
            }}>
            <Stack direction="row" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="body1" color='white' sx={{ paddingLeft: "16px" }}>Radius</Typography>
                <TextField size='small'
                    type='number'
                    variant='standard'
                    color='primary'
                    onChange={handleChange}
                    value={radius}
                    sx={{ input: { color: 'white', textAlign: 'right', paddingRight: '16px' }, width: "150px" }} />
            </Stack>
        </Paper>
    )
}

export default GroupRadialConfigurator