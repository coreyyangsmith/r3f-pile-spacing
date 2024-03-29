import Cell from "./Cell"

type TableRowProps = {
    key: number,
    data: Array<string>
    height: number
    width: number
    tolerance: number
}

const TableRow = (props: TableRowProps) => {
    const generateCells = (data: Array<string>, tolerance: number) => {
        return data.map((cell, i) => {
            // Style Text
            if (Number.isNaN(parseFloat(cell))) {
                return <Cell
                    key={i}
                    value={cell}
                    height={props.height}
                    width={props.width}
                    color="white"
                />
            }

            // Style Numbers
            console.log(tolerance)
            if (parseFloat(cell) > tolerance) {
                return <Cell
                    key={i}
                    value={cell}
                    height={props.height}
                    width={props.width}
                    color="gray"
                />
            } else {
                return <Cell
                    key={i}
                    value={cell}
                    height={props.height}
                    width={props.width}
                    color="#D49190"
                />
            }
        })
    }

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
            }}>
            {generateCells(props.data, props.tolerance)}
        </div>
    )
}

export default TableRow