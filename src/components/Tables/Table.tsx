import Cell from "./Cell"
import { useEffect, useState } from 'react'
import TableRow from "./TableRow"

type ProcessedData = {
    data: Array<Array<string>>
}


const Table = (props: TableProps) => {

    const data = [
        ["X", "P1", "P2", "P3", "P4", "P5"],
        ["H1", "8.13", "8.13", "8.13", "8.13", "8.13"],
        ["H2", "8.13", "8.13", "8.13", "8.13", "8.13"],
        ["H3", "8.13", "8.13", "8.13", "8.13", "8.13"],
        ["H4", "8.13", "8.13", "8.13", "8.13", "8.13"],
        ["H5", "8.13", "8.13", "8.13", "8.13", "8.13"],
        ["H6", "8.13", "8.13", "8.13", "8.13", "8.13"],
        ["H7", "8.13", "8.13", "8.13", "8.13", "8.13"],
        ["H8", "8.13", "8.13", "8.13", "8.13", "8.13"],
        ["H9", "8.13", "8.13", "8.13", "8.13", "8.13"],
        ["H10", "8.13", "8.13", "8.13", "8.13", "8.13"],
        ["H11", "8.13", "8.13", "8.13", "8.13", "8.13"],
        ["H12", "8.13", "8.13", "8.13", "8.13", "8.13"],
        ["H12", "8.13", "8.13", "8.13", "8.13", "8.13"],
        ["H12", "8.13", "8.13", "8.13", "8.13", "8.13"],
    ]

    /**
     * Given data, will generate a vertical column of cells
     * @param {string} topVal : 
     * @param {Array<string>} cellVals :
     * @returns 
     */
    const generateTableRows = (pocessedData: ProcessedData) => {
        return pocessedData.map((item, i) => {
            return <>
                <TableRow
                    key={i}
                    data={item}
                    height={41}
                    width={67}
                />
            </>
        })
    }

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                marginLeft: '16px',
                marginTop: '16px',
                paddingBottom: '32px',
                width: "284px",
                height: '100%',
            }}
        >
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                overflow: 'auto',
            }}>
                {generateTableRows(data)}
            </div>

        </div>
    )
}

export default Table