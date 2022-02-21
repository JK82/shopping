import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import {UserButton} from '@clerk/clerk-react'
import CircularProgress from '@mui/material/CircularProgress'
import {PlainButton} from '../../../buttons'

export const ShoppingListHeader = ({handleOpen}) => {
    return (
        <Box display="flex">
            <Box>Your Items</Box>
            <Box marginLeft="auto" alignSelf="center">
                <PlainButton onClick={handleOpen} variant="contained">
                    Add Item
                </PlainButton>
            </Box>
        </Box>
    )
}
