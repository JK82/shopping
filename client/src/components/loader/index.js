import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import {UserButton} from '@clerk/clerk-react'
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
