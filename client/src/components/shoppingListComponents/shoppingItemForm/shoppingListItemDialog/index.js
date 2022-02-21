import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import {UserButton} from '@clerk/clerk-react'
import CircularProgress from '@mui/material/CircularProgress'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import LastPageIcon from '@mui/icons-material/LastPage'
import {ShoppingItemForm} from '../../shoppingItemForm'

export const ShoppingItemDialog = ({handleClose, open, itemToEdit}) => {
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle sx={{backgroundColor: '#fafafa'}} marginBottom={2}>
                <Box display="flex" justifyContent="space-between">
                    <Box>SHOPING LIST</Box>
                    <Box>
                        <LastPageIcon />
                    </Box>
                </Box>
            </DialogTitle>
            <ShoppingItemForm handleClose={handleClose} item={itemToEdit} />
        </Dialog>
    )
}
