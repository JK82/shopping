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
import {ShoppingItemForm} from './components/shoppingItemForm'
import useShoppingList, {ShoppingListProvider} from './hooks/useShoppingList'

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
    const session = useSession()
    const shoppingList = useShoppingList()
    const items = shoppingList.items
    const api = useApi()
    const [loading, setLoading] = useState(true)

    const [open, setOpen] = React.useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    console.log(items)

    useEffect(() => {
        const getOrCreateShoppingList = async () => {
            try {
                setLoading(true)
                shoppingList.getOrCreateShoppingList()
            } catch (e) {
                alert(e)
            } finally {
                setLoading(false)
            }
        }
        getOrCreateShoppingList()
    }, [])

    return (
        <div>
            <Header />
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>SHOPING LIST</DialogTitle>
                <ShoppingItemForm handleClose={handleClose} />
            </Dialog>
            <Box
                display={'flex'}
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{minHeight: '70vh'}}
            >
                <Box
                    display={'flex'}
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    sx={{
                        border: '1px gray solid',
                        borderRadius: '5px',
                        height: '400px',
                        width: '800px'
                    }}
                >
                    <Stack spacing={2}>
                        <Box>Your shopping list is empty :(</Box>
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
            </Box>
        </div>
    )
}

export default App
