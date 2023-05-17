import React from 'react';
import {
    KanbanComponent,
    ColumnsDirective,
    ColumnDirective,
} from '@syncfusion/ej2-react-kanban';

const kanbanGrid = [
    { headerText: 'To Do', keyField: 'Not Started', allowToggle: true },

    { headerText: 'In Progress', keyField: 'In Progress', allowToggle: true },

    { headerText: 'Completed', keyField: 'Completed', allowToggle: true },
    { headerText: 'Staging Test', keyField: 'Staging Test', allowToggle: true },
];

const Kanban = ({ data }) => {
    return (
        <>
            <KanbanComponent
                id="kanban"
                dataSource={data}
                cardSettings={{ contentField: 'summary', headerField: 'title' }}
                keyField="status"
            >
                <ColumnsDirective>
                    {kanbanGrid.map((item, index) => (
                        <ColumnDirective key={index} {...item} />
                    ))}
                </ColumnsDirective>
            </KanbanComponent>
        </>
    );
};
export default Kanban;
