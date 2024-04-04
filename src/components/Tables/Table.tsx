import TableRow from "./TableRow"

type ProcessedData = {
    data: Array<Array<string>>
    tolerance: number
}


const Table = (props: TableProps) => {

    /**
     * Given data, will generate a vertical column of cells
     * @param {string} topVal : 
     * @param {Array<string>} cellVals :
     * @returns 
     */
    const generateTableRows = (pocessedData: ProcessedData) => {
        return pocessedData.map((item, i) => {
            return <TableRow
                key={i}
                data={item}
                height={41}
                width={67}
                tolerance={props.tolerance}
            />
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
                {generateTableRows(props.data)}
            </div>

        </div>
    )
}

export default Table