import {useSession} from '@clerk/clerk-react'

export const useApi = () => {
    const session = useSession()

    const getSupabaseToken = async () => {
        const supabaseAccessToken = await session.getToken({
            template: 'Supabase'
        })

        return supabaseAccessToken
    }

    const getShoppingList = async () => {
        const accessToken = await getSupabaseToken()
        const list = await fetch(`/api/list?accesstoken=${accessToken}`)
        const listJson = await list.json()
        return listJson
    }

    const createShoppingList = async () => {
        const accesstoken = await getSupabaseToken()
        const data = {
            userId: session.user.id,
            accesstoken
        }
        const list = await fetch(`/api/list`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const listJson = await list.json()
        return listJson
    }

    const createShoppingListItem = async (data) => {
        const accesstoken = await getSupabaseToken()
        const item = await fetch(`/api/item`, {
            method: 'POST',
            body: JSON.stringify({data, accesstoken}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const itemJson = await item.json()
        return itemJson
    }

    const updateShoppingListItem = async (data) => {
        const accesstoken = await getSupabaseToken()
        const item = await fetch(`/api/item`, {
            method: 'PATCH',
            body: JSON.stringify({data, accesstoken}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const itemJson = await item.json()
        return itemJson
    }

    const deleteShoppingListItem = async (itemId) => {
        const accesstoken = await getSupabaseToken()
        const item = await fetch(`/api/item`, {
            method: 'DELETE',
            body: JSON.stringify({itemId, accesstoken}),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const itemJson = await item.json()
        return itemJson
    }

    return {
        getShoppingList,
        createShoppingList,
        createShoppingListItem,
        updateShoppingListItem,
        deleteShoppingListItem
    }
}
