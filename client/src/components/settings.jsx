import React, { useState } from 'react';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { FiSettings } from 'react-icons/fi';
import { Drawer } from '@material-ui/core';

const Settings = () => {
    const [drawer, setDrawer] = useState(false);

    const openDrawer = () => {
        setDrawer(true);
    };
    return (
        <>
            <div className="fixed bottom-4 right-4 cursor-pointer z-50">
                <TooltipComponent content="Settings" position="TopCenter">
                    <button
                        type="button"
                        className="text-3xl drop-shadow-md hover:drop-shadow-xl  rounded-full p-2"
                        style={{ background: 'white' }}
                        onClick={openDrawer}
                    >
                        <FiSettings size={29} />
                    </button>
                </TooltipComponent>
            </div>
            <Drawer
                anchor="right"
                open={drawer}
                onClose={() => setDrawer(false)}
            >
                test
            </Drawer>
        </>
    );
};

export default Settings;
