import {IoChevronBack, IoChevronForward} from "react-icons/io5";
const Pagination = ({pages,page,changePage}) => {
    let middlePagination;
    if(pages<=5){
        middlePagination = [...Array(pages)].map((_,i)=>{
            return <button className="pagination-btn" key={i+1} onClick={()=>changePage(i+1)} disabled={page===i+1}>{i+1}</button>

        })
    }else{
        const startValue = Math.floor((page-1)/5)*5;

        middlePagination = (
            <>
                {[...Array(5)].map((_,i)=>(
                    <button
                        className="pagination-btn"
                        key={startValue+i+1}
                        disabled={page===startValue+i+1}
                        onClick={()=>changePage(startValue+i+1)}
                    >
                        {startValue+i+1}
                    </button>
                ))}
                <span>...</span>
                <button
                    className="pagination-btn"
                    onClick={()=>changePage(pages)}
                    disabled={page===pages}
                >
                    {pages}
                </button>
            </>
        )
        if(page>5){
            if(pages-page>=5){
                middlePagination = (
                    <>
                        <button
                            className="pagination-btn"
                            onClick={()=>changePage(1)}
                            disabled={page===1}
                        >
                            1
                        </button>
                        <span>...</span>
                        <button className="pagination-btn" onClick={()=>changePage(startValue)}>{startValue}</button>
                        {[...Array(5)].map((_,i)=>(
                            <button
                                className="pagination-btn"
                                key={startValue}
                                onClick={()=>changePage(startValue+i+1)}
                                disabled={page===startValue+i+1}
                            >
                                {startValue+i+1}
                            </button>
                        ))}
                        <span>...</span>
                        <button
                            className="pagination-btn"
                            onClick={()=>changePage(pages)}
                            disabled={page===pages}
                        >
                            {pages}
                        </button>
                    </>
                )
            }else{
                let amountLeft = pages - page + 5
                middlePagination = (
                    <>
                        <button
                            className="pagination-btn"
                            onClick={()=>changePage(1)}
                            disabled={page===1}
                        >
                            1
                        </button>
                        <span>...</span>
                        <button onClick={()=>changePage(startValue)}>{startValue}</button>
                        {[...Array(amountLeft)].map((_,i)=>(
                            <button
                                className="pagination-btn"
                                key={startValue+i+1}
                                onClick={()=>changePage(startValue+i+1)}
                                disabled={page===startValue+i+1}
                                style={pages < startValue + i + 1 ? { display: "none" } : null}
                            >
                                {startValue+i+1}
                            </button>
                        ))}
                    </>
                )
            }
        }
    }
    return (
        pages>1&&(
        <div className="flex items-center gap-x-2">
            <button className="pagination-btn disabled:bg-slate-100 disabled:text-slate-500" onClick={()=>changePage(page=>page-1)} disabled={page===1}><IoChevronBack /></button>
            {middlePagination}
            <button className="pagination-btn disabled:bg-slate-100 disabled:text-slate-500" onClick={()=>changePage(page=>page+1)} disabled={page>=pages}><IoChevronForward /></button>
        </div>
    ))

}

export default Pagination;