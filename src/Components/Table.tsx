import React, {ReactElement} from "react";
import TableRows from "./TabelRows";
import TableHeader from "./TableHeader";

export type ColumnDefinitionType<T, K extends keyof T> = {
    key: K;
    header: string;
    width?: number;
}

type TableProps<T, K extends keyof T> = {
    data: Array<T>;
    columns: Array<ColumnDefinitionType<T, K>>;
}

const style = {
    borderCollapse: 'collapse'
} as const

const Table = <T, K extends keyof T>({ data, columns }: TableProps<T, K>): ReactElement => {
    return (
        <table style={style}>
            <TableHeader columns={columns} />
            <TableRows
                data={data}
                columns={columns}
            />
        </table>
    );
};

export default Table;