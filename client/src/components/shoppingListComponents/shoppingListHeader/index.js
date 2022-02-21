import * as React from 'react'
import Box from '@mui/material/Box'
import {PlainButton} from '../../buttons'

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
