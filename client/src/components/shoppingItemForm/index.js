import * as React from 'react'
import {useFormik} from 'formik'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import DialogTitle from '@mui/material/DialogTitle'
import Dialog from '@mui/material/Dialog'
import TextField from '@mui/material/TextField'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import {Checkbox, Container, FormControl, FormControlLabel} from '@mui/material'
import {useApi} from '../../hooks/useApi'
import useShoppingList from '../../hooks/useShoppingList'

export const ShoppingItemForm = ({handleClose, item = undefined}) => {
    const shoppingList = useShoppingList()
    const formik = useFormik({
        initialValues: {
            name: item?.name || '',
            description: item?.description || '',
            quantity: item?.quantity || 1,
            purchased: item?.purchased || false
        },
        onSubmit: (values) => {
            shoppingList.addItemToShoppingList(values)
        }
    })
    return (
        <Container sx={{width: '600px'}} p="32px">
            <form onSubmit={formik.handleSubmit}>
                <Stack spacing={2}>
                    <Box>Add an Item</Box>
                    <Box>Add your new item below</Box>

                    <TextField
                        sx={{width: '100%'}}
                        id="name"
                        label="Item Name"
                        variant="outlined"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                    />
                    <TextField
                        sx={{width: '100%'}}
                        id="description"
                        label="Description"
                        variant="outlined"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                    />
                    <Select
                        labelId="demo-simple-select-label"
                        id="quantity"
                        placeholder="How many?"
                        label="How many"
                        value={formik.values.quantity}
                        onChange={formik.handleChange}
                    >
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                    </Select>
                    <FormControlLabel
                        control={<Checkbox id="purchased" />}
                        label="Purchased"
                        value={formik.values.purchased}
                        onChange={formik.handleChange}
                    />
                </Stack>
                <Box display="flex" justifyContent={'flex-end'}>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button type="submit">Add Item</Button>
                </Box>
            </form>
        </Container>
    )
}
