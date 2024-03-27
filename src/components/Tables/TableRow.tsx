import Cell from "./Cell"

type TableRowProps = {
    key: number,
    data: Array<string>
    height: number
    width: number
}

const TableRow = (props: TableRowProps) => {

    const generateCells = (data: Array<string>) => {
        return data.map((cell, i) => {
            return <Cell
                key={i}
                value={cell}
                height={props.height}
                width={props.width}
            />
        })
    }

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
            }}>
            {generateCells(props.data)}
        </div>
    )
}

export default TableRow