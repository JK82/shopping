import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import {UserButton} from '@clerk/clerk-react'

export const Header = () => {
    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{mr: 2}}
                    ></IconButton>
                    <Box sx={{flexGrow: 1}}>SHOPPING LIST</Box>
                    <UserButton />
                </Toolbar>
            </AppBar>
        </Box>
    )
}
