import React, {useEffect, useState} from 'react'
import './App.css'
import {
    ClerkProvider,
    SignedIn,
    SignedOut,
    RedirectToSignIn
} from '@clerk/clerk-react'
import {useNavigate} from 'react-router-dom'
import {Header} from './components/header'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import useShoppingList, {ShoppingListProvider} from './hooks/useShoppingList'
import {Loader} from './components/loader'
import {ShoppingListItem} from './components/shoppingListComponents/shoppingListItem'
import {ShoppingListHeader} from './components/shoppingListComponents/shoppingListHeader'
import {ShoppingListEmpty} from './components/shoppingListComponents/shoppingListEmpty'
import {ShoppingItemDialog} from './components/shoppingListComponents/shoppingListItemDialog'
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
    const [open, setOpen] = useState(false)
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

    if (shoppingList.shoppingListLoaded) {
        return <Loader />
    }

    return (
        <div>
            <Header />
            <ShoppingItemDialog
                handleClose={handleClose}
                itemToEdit={itemToEdit}
                open={open}
            />
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
                        <ShoppingListHeader handleOpen={handleOpen} />
                        {items
                            .sort(
                                (x, y) =>
                                    Number(x.purchased) - Number(y.purchased)
                            )
                            .map((item) => (
                                <ShoppingListItem
                                    key={item.id}
                                    item={item}
                                    editItem={editItem}
                                />
                            ))}
                    </Stack>
                ) : (
                    <ShoppingListEmpty handleOpen={handleOpen} />
                )}
            </Box>
        </div>
    )
}

export default App
