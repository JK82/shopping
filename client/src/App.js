import React, {useEffect, useState} from 'react'
import './App.css'
import {
    ClerkProvider,
    SignedIn,
    SignedOut,
    UserButton,
    useUser,
    RedirectToSignIn,
    useSession
} from '@clerk/clerk-react'
import {useNavigate} from 'react-router-dom'
import {useSupabaseToken} from './hooks/useSupabase'
import {useApi} from './hooks/useApi'
import {Header} from './components/header'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'
import TextField from '@mui/material/TextField'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import {Checkbox, Container, FormControl, FormControlLabel} from '@mui/material'
import {styled} from '@mui/system'
import {ShoppingItemForm} from './components/shoppingItemForm'
import useShoppingList, {ShoppingListProvider} from './hooks/useShoppingList'
import {Loader} from './components/loader'
import {PlainButton} from './components/buttons'
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import LastPageIcon from '@mui/icons-material/LastPage'

const frontendApi = process.env.REACT_APP_CLERK_FRONTEND_API

function App() {
    const navigate = useNavigate()
    const [shoppingList, setShoppingList] = useState(null)

    return (
        <ClerkProvider
            frontendApi={frontendApi}
            navigate={(to) => navigate(to)}
        >
            <ShoppingListProvider value={{shoppingList, setShoppingList}}>
                <SignedIn>
                    <Homepage />
                </SignedIn>
                <SignedOut>
                    <RedirectToSignIn />
                </SignedOut>
            </ShoppingListProvider>
        </ClerkProvider>
    )
}

function Homepage() {
    const shoppingList = useShoppingList()
    const hasItems = shoppingList.hasItems
    const items = shoppingList.items

    const [itemToEdit, setItemToEdit] = useState(undefined)

    const [open, setOpen] = React.useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => {
        setOpen(false)
        setItemToEdit(undefined)
    }

    useEffect(() => {
        const getOrCreateShoppingList = async () => {
            try {
                shoppingList.getOrCreateShoppingList()
            } catch (e) {
                alert(e)
            } finally {
            }
        }
        getOrCreateShoppingList()
    }, [])

    const editItem = (item) => {
        setItemToEdit(item)
        setOpen(true)
    }

    const deleteItem = (item) => {
        shoppingList.deleteItemFromShoppingList(item.id)
    }

    const setItemPurchased = (item) => {
        item.purchased = !item.purchased
        shoppingList.updateItemInShoppingList(item)
    }

    if (shoppingList.shoppingListLoaded) {
        return <Loader />
    }

    return (
        <div>
            <Header />
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
            <Box
                marginTop={6}
                display={'flex'}
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
            >
                {hasItems ? (
                    <Stack spacing={1} width="80%">
                        <Box display="flex">
                            <Box>Your Items</Box>
                            <Box marginLeft="auto" alignSelf="center">
                                <PlainButton
                                    onClick={() => setOpen(true)}
                                    variant="contained"
                                >
                                    Add Item
                                </PlainButton>
                            </Box>
                        </Box>
                        {items.map((item) => (
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
                                        <Box sx={{color: '#5c6269'}}>
                                            {item.description}
                                        </Box>
                                    </Stack>
                                    <Box marginLeft="auto" alignSelf="center">
                                        <Button onClick={() => editItem(item)}>
                                            <ModeEditOutlineIcon
                                                sx={{color: 'black'}}
                                            />
                                        </Button>
                                        <Button
                                            onClick={() => deleteItem(item)}
                                        >
                                            <DeleteOutlineIcon
                                                sx={{color: 'black'}}
                                            />
                                        </Button>
                                    </Box>
                                </Box>
                            </Box>
                        ))}
                    </Stack>
                ) : (
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
                                <Button
                                    onClick={handleOpen}
                                    variant="contained"
                                >
                                    Add your first item
                                </Button>
                            </Box>
                        </Stack>
                    </Box>
                )}
            </Box>
        </div>
    )
}

export default App
