import React from 'react'
import Box from '@mui/material/Box'
import Dialog from '@mui/material/Dialog'
import DialogTitle from '@mui/material/DialogTitle'
import CloseIcon from '@mui/icons-material/Close'
import {ShoppingItemForm} from '../shoppingItemForm'

export const ShoppingItemDialog = ({handleClose, open, itemToEdit}) => {
    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle sx={{backgroundColor: '#fafafa'}} marginBottom={2}>
                <Box display="flex" justifyContent="space-between">
                    <Box>SHOPING LIST</Box>
                    <Box>
                        <CloseIcon onClick={handleClose} />
                    </Box>
                </Box>
            </DialogTitle>
            <ShoppingItemForm handleClose={handleClose} item={itemToEdit} />
        </Dialog>
    )
}
