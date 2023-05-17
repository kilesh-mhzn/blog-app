import {IoEllipse} from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import React from "react";

const TableWrapper = ({ columns,data, openDrawer, action }) => {
    return(
        <>
            {/*<div className="block w-full overflow-x-auto bg-white rounded shadow ">*/}
            {/*    <table className="items-center w-full bg-transparent border-collapse overflow-hidden">*/}
            {/*        <thead>*/}
            {/*        <tr>*/}
            {/*            {columns.map((column, index) => (*/}
            {/*                <th key={index} className = "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-white text-slate-900 border-slate-200">*/}
            {/*                    {column.Header}*/}
            {/*                </th>*/}
            {/*            ))}*/}
            {/*            <th  className = "px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left bg-white text-slate-900 border-slate-200">*/}
            {/*                Actions*/}
            {/*            </th>*/}
            {/*        </tr>*/}
            {/*        </thead>*/}
            {/*        <tbody>*/}
            {/*        {data.map((row, index) => (*/}
            {/*            <tr key={index}>*/}
            {/*                {columns.map((column, index) => (*/}
            {/*                    <td key={index} className = "px-6 align-middle border border-solid py-3 text-xs whitespace-nowrap text-left bg-white text-slate-900 border-slate-200">*/}
            {/*                        {row[column.accessor]}*/}
            {/*                    </td>*/}
            {/*                ))}*/}
            {/*            </tr>*/}
            {/*        ))}*/}
            {/*        </tbody>*/}
            {/*    </table>*/}
            {/*</div>*/}
        </>
    )
}

export default  TableWrapper