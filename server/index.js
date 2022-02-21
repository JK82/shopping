require('dotenv').config({path: __dirname + '/.env.local'})
const express = require('express')
const path = require('path')
var bodyParser = require('body-parser')
const {
    getShoppingListAndItems,
    createShoppingList,
    createShoppingListItem,
    deleteShoppingListItem,
    updateShoppingListItem
} = require('./database-connector')

const PORT = process.env.PORT || 3001

const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, '../client/build')))

//Routes
app.get('/api/list', async (req, res) => {
    const {accesstoken} = req.query
    const response = await getShoppingListAndItems(accesstoken)
    res.json(response.data)
})

app.post('/api/list', async (req, res) => {
    const {userId, accesstoken} = req.body
    const response = await createShoppingList(accesstoken, {user_id: userId})
    res.json(response.data)
})

app.post('/api/item', async (req, res) => {
    const requestBody = req.body
    const response = await createShoppingListItem(
        requestBody.accesstoken,
        requestBody.data
    )
    console.log(response)
    res.json(response.data)
})

app.delete('/api/item', async (req, res) => {
    const requestBody = req.body
    const {data} = await deleteShoppingListItem(requestBody.accesstoken, {
        id: requestBody.itemId
    })
    res.json(data)
})

app.patch('/api/item', async (req, res) => {
    const requestBody = req.body
    const response = await updateShoppingListItem(
        requestBody.accesstoken,
        requestBody.data
    )
    res.json(response.data)
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'))
})

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`)
})
