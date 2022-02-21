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
import {
    Checkbox,
    Container,
    FormControl,
    FormControlLabel,
    LinearProgress
} from '@mui/material'
import {useApi} from '../../hooks/useApi'
import useShoppingList from '../../hooks/useShoppingList'
import {PlainButton} from '../buttons'

export const ShoppingItemForm = ({handleClose, item = undefined}) => {
    const [isEdit, setIsEdit] = React.useState(false)

    React.useEffect(() => {
        if (item?.id) {
            setIsEdit(true)
        }
    }, [item?.id])

    const shoppingList = useShoppingList()
    const formik = useFormik({
        initialValues: {
            name: item?.name || '',
            description: item?.description || '',
            quantity: item?.quantity || 1,
            purchased: item?.purchased
        },
        onSubmit: (values) => {
            if (isEdit) {
                values.id = item.id
                shoppingList.updateItemInShoppingList(values)
                setIsEdit(false)
                handleClose()
            } else {
                shoppingList.addItemToShoppingList(values)
                handleClose()
            }
        }
    })
    return (
        <Container sx={{width: '600px'}} padding="32px">
            <form onSubmit={formik.handleSubmit}>
                <Stack spacing={1}>
                    <Box sx={{fontSize: '20px'}}>
                        {isEdit ? 'Update an item' : 'Add an Item'}
                    </Box>
                    <Stack spacing={2}>
                        <Box sx={{color: '#5c6269'}}>
                            {isEdit
                                ? 'Update your item below'
                                : 'Add your new item below'}
                        </Box>

                        <TextField
                            sx={{width: '100%'}}
                            id="name"
                            label="Item Name"
                            variant="outlined"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                        />
                        <TextField
                            multiline={true}
                            rows={6}
                            helperText={`${formik.values.description.length}/100`}
                            sx={{width: '100%'}}
                            id="description"
                            label="Description"
                            variant="outlined"
                            inputProps={{maxLength: 100}}
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
                        {isEdit && (
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        id="purchased"
                                        checked={formik.values.purchased}
                                    />
                                }
                                label="Purchased"
                                value={formik.values.purchased}
                                onChange={formik.handleChange}
                            />
                        )}
                    </Stack>
                </Stack>
                <Box
                    marginTop={24}
                    display="flex"
                    justifyContent={'flex-end'}
                    paddingBottom={3}
                >
                    <PlainButton
                        sx={{color: '#000000', marginRight: '16px'}}
                        onClick={() => {
                            setIsEdit(false)
                            handleClose()
                        }}
                    >
                        Cancel
                    </PlainButton>
                    <PlainButton type="submit" variant="contained">
                        {isEdit ? 'Update Item' : 'Add Item'}
                    </PlainButton>
                </Box>
            </form>
            {shoppingList?.updating && <LinearProgress />}
        </Container>
    )
}
