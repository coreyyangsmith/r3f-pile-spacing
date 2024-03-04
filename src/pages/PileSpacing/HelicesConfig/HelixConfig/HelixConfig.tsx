import { Button, Paper, Stack, Typography } from '@mui/material'
import { useState } from 'react';
import { usePiles } from '../../../../hooks/usePiles';
import { useHelices } from '../../../../hooks/useHelices';

const HelixConfig = () => {
    const [selectedPile, setSelectedPile] = useState<number>(0);
    const [selectedHelix, setSelectedHelix] = useState<number>(0);

    const piles = usePiles();
    const helices = useHelices()

    const handlePileSelection = (pileId: number) => {
        setSelectedPile(pileId);
    }

    const handleHelixSelection = (helixId: number) => {
        setSelectedHelix(helixId);
    }

    const generateIndividualPileSelection = () => {
        if (!piles) return (<>Error</>)
        return piles.piles.piles.map((pile, i) => {
            return (
                <Button className={i == selectedPile && 'active' || ''} key={i} onClick={() => { handlePileSelection(i) }}> Pile {i + 1}</Button >
            )
        })
    }

    const generateIndividualHelixSelection = () => {
        if (!piles) return (<>Error</>)
        if (!helices) return (<>Error</>)
        if (selectedPile === null) return (<>No Pile Selected</>)

        const matchingHelices = helices.helicesCollection.helicesCollection.filter(helices => helices.pileRef.id === selectedPile)
        if (matchingHelices.length <= 0) return (<>No Helices</>)

        return matchingHelices[0].helices.map((helix, i) => {
            return (
                <Button className={i == selectedHelix && 'active' || ''} key={i} onClick={() => { handleHelixSelection(i) }}> Helix {i + 1}</Button >
            )
        })

    }

    return (
        <Paper
            square={true}
            variant='outlined'
            sx={{
                position: 'absolute',
                top: 'calc(75%)',
                zIndex: 10,
                background: 'rgba(255, 255, 255, 0.1)',
                margin: '16px',
                width: 'calc(100% - 32px)',
                height: 'calc(25% - 32px)',
            }}
        >
            <Typography variant='h6' sx={{
                marginLeft: '16px',
                padding: '8px',
                textAlign: 'left',
                color: 'white'
            }}>
                Individual Piles
            </Typography>

            {/* Container */}
            <Stack direction='row' sx={{ border: '1px solid green', width: '100%', height: 'calc(100% - 48px)' }}>
                {/* Pile Selection */}
                <Stack direction='column' sx={{ overflowY: 'scroll', border: '1px solid red', height: '100%' }}>
                    {generateIndividualPileSelection()}
                </Stack>

                <Stack direction='column' sx={{ overflowY: 'scroll', border: '1px solid red', height: '100%' }}>
                    {generateIndividualHelixSelection()}
                </Stack>

                {/* Inidivual Helix Settings */}
            </Stack>
        </Paper>
    )
}

export default HelixConfig