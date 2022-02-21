import React from 'react'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

export const Loader = () => {
    return (
        <Box
            display={'flex'}
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{minHeight: '70vh'}}
        >
            <CircularProgress />
        </Box>
    )
}
