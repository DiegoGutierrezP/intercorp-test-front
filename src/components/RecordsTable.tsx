import { useEffect, useState } from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { FileInformation } from "../interfaces";
import { Button } from "primereact/button";

export const RecordsTable = () => {

    const [records, setRecords] = useState([])
    const [loading, setLoading] = useState(false);
    const [totalRows, setTotalRows] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        getData(1)
    }, [])


    const getData = async (page: number) => {
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:5025/files-readed?pageNumber=${page}`);

            if (!response.ok) {
                throw Error('Ocurrio un error al listar')
            }

            const json = await response.json();

            console.log(json)

            setRecords(json.items)
            setTotalRows(json.totalCount)
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    const columns: TableColumn<FileInformation>[] = [
        {
            name: 'Id',
            width: '50px',
            selector: (row) => row.id,
        },
        {
            name: 'Regex',
            width: '200px',
            selector: (row) => row.regEx,
        },
        {
            name: 'Enum',
            width: '150px',
            selector: (row) => row.enum,
        },
        {
            name: 'FileName',
            width: '150px',
            selector: (row) => row.fileName,
        },
        {
            name: 'Last Updated',
            selector: (row) => row.lastUpdated,
        },
        {
            name: 'Last Modified',
            selector: (row) => row.lastModified,
        },
    ];

    const handlePageChange = (page: number) => {
        getData(page);
        setCurrentPage(page);
    };

    const onRefresh = () => {
        getData(1);
        setCurrentPage(1);
    };

    return (
        <>
            <div className="w-full sm:max-w-[900px] overflow-x-auto">
                <Button
                    className="bg-slate-400 p-2 mb-4 text-white px-4 shadow"
                    label="Refrescar"
                    onClick={onRefresh}
                />
                <DataTable
                    style={{
                        maxWidth: '800px'
                    }}
                    columns={columns}
                    progressPending={loading}
                    data={records}
                    pagination
                    paginationServer
                    paginationTotalRows={totalRows}
                    paginationDefaultPage={currentPage}
                    onChangePage={handlePageChange}
                />
            </div>

        </>
    )
}
