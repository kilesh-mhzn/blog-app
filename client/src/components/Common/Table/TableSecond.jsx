import React from "react";
import Pagination from "../Pagination/Pagination";
import {CircularProgress} from "@material-ui/core";

const TableSecond = ({ cols,data, pages, page, changePage, loading }) => {
    return(
        <>
            <div className="flex justify-between flex-col w-full overflow-x-auto bg-white rounded shadow min-h-[75vh]">
                <table className="items-center w-full bg-transparent border-collapse">
                    <thead>
                    <tr>
                        {cols.map((headerItem, index) => (
                            <th key={index} className="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-white text-slate-900 border-slate-200">
                                {headerItem.title}
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>

                    {loading?<tr><td><CircularProgress /></td></tr>:
                        data?.map((item, index) => (
                            <tr key={index}>
                                {cols.map((col, key) => (
                                    <td key={key} className = "border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-slate-900 border-slate-200 max-w-md">
                                        {col.render(item)}
                                    </td>
                                ))}
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
                <div className="flex justify-end border-t-2 py-3 px-2">
                    <Pagination pages={pages} page={page} changePage={changePage}/>
                </div>

            </div>
        </>
    )
}

export default  TableSecond