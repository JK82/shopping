import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Checkbox from '@mui/material/Checkbox'
import Stack from '@mui/material/Stack'
import {UserButton} from '@clerk/clerk-react'
import CircularProgress from '@mui/material/CircularProgress'
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import useShoppingList from '../../../../hooks/useShoppingList'

export const ShoppingListItem = ({item, editItem}) => {
    const shoppingList = useShoppingList()
    const deleteItem = (item) => {
        shoppingList.deleteItemFromShoppingList(item.id)
    }

    const setItemPurchased = (item) => {
        item.purchased = !item.purchased
        shoppingList.updateItemInShoppingList(item)
    }
    return (
        <Box
            px={4}
            py={4}
            sx={
                item.purchased
                    ? {
                          backgroundColor: '#f8fafb',
                          textDecoration: 'line-through'
                      }
                    : {
                          border: '1px #5c6269 solid',
                          borderRadius: '5px'
                      }
            }
        >
            <Box display="flex">
                <Checkbox
                    onClick={() => setItemPurchased(item)}
                    checked={item.purchased}
                />
                <Stack spacing={2} marginLeft={2}>
                    <Box>{item.name}</Box>
                    <Box sx={{color: '#5c6269'}}>{item.description}</Box>
                </Stack>
                <Box marginLeft="auto" alignSelf="center">
                    <Button onClick={() => editItem(item)}>
                        <ModeEditOutlineIcon sx={{color: 'black'}} />
                    </Button>
                    <Button onClick={() => deleteItem(item)}>
                        <DeleteOutlineIcon sx={{color: 'black'}} />
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}
