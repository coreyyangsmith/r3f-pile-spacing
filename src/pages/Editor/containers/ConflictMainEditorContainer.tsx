import { Stack, Typography } from '@mui/material';
import { useState, useEffect } from 'react'
import Divider from '../../../components/Divider';
import TertiaryButton from '../../../components/Buttons/TertiaryButton';
import SelectionChipContainer from './SelectionChipContainer';
import { mixed1, mixed2 } from '../../../themes/Color';
import DataComponent from '../components/DataComponent';
import ConflictPileSelectionChipContainer from './ConflictPileSelectionChipContainer';
import Table from "../../../components/Tables/Table.tsx"
import { getPileObjectFromPileId } from '../../../utils/PileUtils.ts';
import { usePiles } from '../../../hooks/usePiles.tsx';
import { Piles } from '../../../components/Pile.ts';
import { IPosition } from '../../../types/common/Common.ts';

const ConflictMainEditorContainer = () => {
    const [firstPile, setFirstPile] = useState(-1);
    const [secondPile, setSecondPile] = useState(-1);
    const [calcDiameter, setCalcDiameter] = useState(2.5);
    const [tolerance, setTolerance] = useState(0);
    const [data, setData] = useState([[]])
    const piles = usePiles()

    /**
     * Calculates the XYZ position for a helix
     * @param {Pile} pile : the Pile object to examine
     * @param {number} helixCount : the current number/id of the helix to compare
     * @returns {IPosition} : XYZ position of centre-of-helix
     */
    function calculateHelixXYZFromPileObjAndHelixCount(pile: Pile, helixCount: number): IPosition {
        let startingXYZ: IPosition = {
            x: pile.x,
            y: pile.y,
            z: pile.z
        }

        // Apply Pile Length
        startingXYZ.y -= pile.length

        // Apply First Spacing Dist
        startingXYZ.y += pile.helices.distanceFromBottom

        // Apply Spacing
        startingXYZ.y += (helixCount - 1) * pile.helices.spacing

        return startingXYZ;

    }

    /**
     * Calculates the Euclidean distance between two 3-dimensional points
     * @param {IPosition} pos1 : The first XYZ position
     * @param {IPosition} pos2 : The second XYZ position
     * @returns 
     */
    function calculateDistance(pos1: IPosition, pos2: IPosition): number {
        const dx = pos2.x - pos1.x;
        const dy = pos2.y - pos1.y;
        const dz = pos2.z - pos1.z;

        // Calculate the Euclidean distance
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
        return distance
    }

    /**
     * Calculate Data from Piles
     */
    useEffect(() => {
        const p1 = getPileObjectFromPileId(piles?.state.piles as Piles, firstPile as number)
        const p2 = getPileObjectFromPileId(piles?.state.piles as Piles, secondPile as number)

        const topHeadings = ["X"]
        const sideHeadings = [];
        const workingData = []
        const finalData = []

        // Generate Top Heading from FirstPile Selection
        if (p1 && p2) {
            if (p1.helices?.helices.length as number > 0) {
                // Iterate First Pile and Initialize Top Headings
                const p1HelixCount = p1.helices?.helices.length as number
                const p2HelixCount = p2.helices?.helices.length as number

                for (let i = 0; i < p1HelixCount; i++) {
                    topHeadings.push("P" + i)
                }

                // Iterate Second Pile and Initialize Side Headings
                for (let i = 0; i < p2HelixCount; i++) {
                    sideHeadings.push(["P" + i])
                }

                // Calculate Spacing Data
                for (let j = 0; j < p2HelixCount; j++) {
                    const rowData = []
                    for (let i = 0; i < p1HelixCount; i++) {
                        const p1HelixPos = calculateHelixXYZFromPileObjAndHelixCount(p1, i)
                        const p2HelixPos = calculateHelixXYZFromPileObjAndHelixCount(p2, j)
                        const distance = calculateDistance(p1HelixPos, p2HelixPos).toFixed(2)
                        rowData.push(distance.toString())
                    }
                    workingData.push(rowData)
                }
            }
        }

        finalData.push(topHeadings)
        // Create Final Dataset
        for (let i = 0; i < sideHeadings.length; i++) {
            const tmp = [...sideHeadings[i], ...workingData[i]]
            finalData.push(tmp)
        }

        // console.log('topHeadings', topHeadings)
        // console.log('sideHeadings', sideHeadings)
        // console.log('workingData', workingData)
        // console.log('finalData', finalData)

        setData(finalData)

    }, [firstPile, secondPile, calcDiameter])


    /**
     * Set Tolerance
     */
    useEffect(() => {
        const p1 = getPileObjectFromPileId(piles?.state.piles as Piles, firstPile as number)
        if (p1) {
            console.log(p1)
            const tol = calcDiameter * p1.helices?.helices[0].diameter as number
            setTolerance(tol)
        }
    }, [firstPile, calcDiameter])

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                width: "350px",
                borderRadius: "25px",
                backgroundColor: mixed2,
                padding: "24px 16px 24px 16px",
                height: "100%",
            }}
        >
            <SelectionChipContainer />
            {/* Form Info */}
            <div style={{ height: '16px' }} />
            <ConflictPileSelectionChipContainer
                value={firstPile}
                setter={setFirstPile}
            />

            <div style={{ height: '16px' }} />
            <ConflictPileSelectionChipContainer
                value={secondPile}
                setter={setSecondPile}
            />
            <Divider />
            <Typography variant="body1" sx={{
                color: 'white',
            }}>
                Conflict Settings
            </Typography>

            <div style={{
                display: 'flex',
                flexDirection: 'column',
            }}>
                <DataComponent
                    value={calcDiameter}
                    setter={setCalcDiameter}
                    step={0.25}
                    precision={2}
                    unit="x"
                    text="helix diameter"
                    style="unlocked" />
            </div>

            <Divider />
            <Typography variant="body1" sx={{
                color: 'white',
            }}>
                Calculation
            </Typography>

            {/* Table Container */}
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                flexGrow: 1,
                background: mixed1,
                borderRadius: '25px',
                height: '150px',
            }}>
                <Table
                    data={data}
                    tolerance={tolerance} />
            </div>

            <Divider />
            {/* Button Container */}
            <Stack
                direction="row"
                style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center',
                }}>
                <TertiaryButton text="Export Design to CSV" onClick={() => console.log("Export Design to CSV")} />
            </Stack>

        </div>
    )
}

export default ConflictMainEditorContainer