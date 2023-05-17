import React, { useState, useRef, useEffect } from 'react';

const KanbanBoard = ({ kanbanData, headers, doubleClick }) => {
    const groupedData = kanbanData.reduce((acc, curr) => {
        if (!acc[curr.status]) {
            acc[curr.status] = [];
        }
        acc[curr.status].push(curr);
        return acc;
    }, {});

    // console.log(kanbanData, 'kan');

    const datas = Object.keys(groupedData).map((key) => {
        return {
            status: key,
            items: groupedData[key],
        };
    });

    const [list, setList] = useState(datas);

    const [dragging, setDragging] = useState(false);
    const dragItem = useRef(null);
    const dragNode = useRef(null);

    const handleDragStart = (e, params) => {
        console.log('drag start', params);
        dragItem.current = params;
        dragNode.current = e.target;
        dragNode.current.addEventListener('dragend', handleDragEnd);
        setTimeout(() => {
            setDragging(true);
        }, 0);
    };

    const handleDragEnter = (e, params) => {
        const currentItem = dragItem.current;
        console.log('drag enter', currentItem);
        if (e.target !== dragNode.current) {
            setList((oldList) => {
                // let newList = JSON.parse(JSON.stringify(oldList));
                let newList = [...oldList];
                newList[params.grpI].items?.splice(
                    params.itemI,
                    0,
                    newList[currentItem.grpI].items?.splice(
                        currentItem.itemI,
                        1
                    )[0]
                );
                dragItem.current = params;
                return newList;
            });
        }
    };

    const handleDragEnd = (e) => {
        setDragging(false);
        dragNode.current.removeEventListener('dragend', handleDragEnd);
        dragItem.current = null;
        dragNode.current = null;
    };

    const getStyles = (params) => {
        const currentItem = dragItem.current;
        if (
            currentItem.grpI === params.grpI &&
            currentItem.itemI === params.itemI
        ) {
            return 'bg-slate-200 rounded p-4 min-h-[150px] ';
        }
        return 'bg-white rounded p-4 min-h-[150px] ';
    };

    return (
        <>
            <header className="header flex items-center  overflow-x-auto ">
                <div className="drag-n-drop grid grid-cols-kanban  p-2 items-start gap-2 h-full w-full overflow-x-auto  ">
                    {headers.map((data, grpI) => (
                        <div
                            onDragEnter={
                                dragging && !data?.items?.length
                                    ? (e) =>
                                          handleDragEnter(e, {
                                              grpI,
                                              itemI: 0,
                                          })
                                    : null
                            }
                            key={grpI}
                            className="dnd-grp bg-slate-100 p-2 rounded space-y-4  "
                        >
                            <div className="grp-title text-md  font-bold">
                                {data?.headerText}
                            </div>
                            {/* {!list[grpI]?.items && (
                                <div className="bg-white rounded p-4 min-h-[100px] italic text-slate-600 ">
                                    No items
                                </div>
                            )} */}

                            {list
                                .find((item) => item.status === data?.keyField)
                                ?.items?.map((item, itemI) => (
                                    <div
                                        key={itemI}
                                        onDoubleClick={() => doubleClick(item)}
                                        draggable
                                        onDragStart={(e) => {
                                            handleDragStart(e, {
                                                grpI,
                                                itemI,
                                            });
                                        }}
                                        onDragEnter={
                                            dragging
                                                ? (e) => {
                                                      handleDragEnter(e, {
                                                          grpI,
                                                          itemI,
                                                      });
                                                  }
                                                : null
                                        }
                                        className={
                                            dragging
                                                ? getStyles({ grpI, itemI })
                                                : 'dnd-item bg-white rounded p-4 min-h-[150px] '
                                        }
                                    >
                                        <p className="text-slate-700 text-xl font-semibold">
                                            {item?.title}
                                        </p>
                                        <p className="text-slate-600 text-base">
                                            {item?.summary}
                                        </p>
                                    </div>
                                ))}
                        </div>
                    ))}
                </div>
            </header>
        </>
    );
};
export default KanbanBoard;
