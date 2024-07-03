import React from "react";
import Box from '@mui/material/Box';
import Toollist from "../toollist/Toollist";
import Ppelist from "../ppelist/Ppelist";
import Dresslist from "../dresslist/Dresslist";
import Trainingreport from "../trainingreport/Trainingreport";

export default function Organizationalreportbody() {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
            <h2>Equipment List Report</h2>
            <Box sx={{ width: '100%' }}>
                <Toollist />
            </Box>
            <Box sx={{ width: '100%' }}>
                <Ppelist />
            </Box>
            <Box sx={{ width: '100%' }}>
                <Dresslist />
            </Box>
            <hr style={{ width: '100%' }} />
            <h2>Training Report</h2>
            <Box sx={{ width: '100%' }}>
                <Trainingreport />
            </Box>
        </Box>
    );
}
