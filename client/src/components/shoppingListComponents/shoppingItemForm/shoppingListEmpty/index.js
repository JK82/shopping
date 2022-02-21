import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import {UserButton} from '@clerk/clerk-react'
import CircularProgress from '@mui/material/CircularProgress'
import Stack from '@mui/material/Stack'

export const ShoppingListEmpty = ({handleOpen}) => {
    return (
        <Box
            display={'flex'}
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{
                border: '1px #5c6269 solid',
                borderRadius: '5px',
                height: '400px',
                width: '800px'
            }}
        >
            <Stack spacing={2}>
                <Box sx={{color: '#5c6269'}}>
                    Your shopping list is empty :(
                </Box>
                <Box
                    display={'flex'}
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Button onClick={handleOpen} variant="contained">
                        Add your first item
                    </Button>
                </Box>
            </Stack>
        </Box>
    )
}
