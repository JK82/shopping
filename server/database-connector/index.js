const supabaseLib = require('@supabase/supabase-js')

// Set Up
const supabaseClient = async (supabaseAccessToken) => {
    const supabase = supabaseLib.createClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_KEY
    )

    // set Supabase JWT on the client object,
    // so it is sent up with all Supabase requests
    supabase.auth.setAuth(supabaseAccessToken)
    return supabase
}

const initSupabase = async (supabaseAccessToken) => {
    const supabase = await supabaseClient(supabaseAccessToken)
    return supabase
}
// Set Up

const getShoppingListAndItems = async (supabaseAccessToken, table) => {
    const supabase = await initSupabase(supabaseAccessToken)
    const response = await supabase.from('lists').select('id, items (*)')
    return response
}

const createShoppingList = async (supabaseAccessToken, data) => {
    const supabase = await initSupabase(supabaseAccessToken)
    const response = await await supabase.from('lists').insert([data])
    return response
}

const createShoppingListItem = async (supabaseAccessToken, data) => {
    const supabase = await initSupabase(supabaseAccessToken)
    const response = await await supabase.from('items').insert([data])
    return response
}

const updateShoppingListItem = async (supabaseAccessToken, data) => {
    const supabase = await initSupabase(supabaseAccessToken)
    const response = await await supabase
        .from('items')
        .update(data)
        .match({id: data.id})
    return response
}

const deleteShoppingListItem = async (supabaseAccessToken, data) => {
    const supabase = await initSupabase(supabaseAccessToken)
    const response = await supabase.from('items').delete().match({id: data.id})
    return response
}

module.exports = {
    getShoppingListAndItems,
    createShoppingList,
    deleteShoppingListItem,
    updateShoppingListItem,
    createShoppingListItem
}
