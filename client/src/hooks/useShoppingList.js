import {createContext, useContext, useMemo, useState} from 'react'
import {useApi} from './useApi'

const ShoppingListContext = createContext()
export const ShoppingListProvider = ShoppingListContext.Provider

export default function useShoppingList() {
    const api = useApi()
    const {shoppingList, setShoppingList} = useContext(ShoppingListContext)
    const [isUpdating, setIsUpdating] = useState(false)

    const self = useMemo(() => {
        return {
            ...shoppingList,

            get updating() {
                return isUpdating
            },

            get shoppingListLoaded() {
                return !shoppingList?.id
            },

            get hasItems() {
                console.log(shoppingList)
                return shoppingList?.items?.length > 0
            },

            async getOrCreateShoppingList() {
                let shoppingList = await api.getShoppingList()
                if (!shoppingList || shoppingList.length <= 0) {
                    shoppingList = await api.createShoppingList()
                }
                setShoppingList(shoppingList[0])
                return shoppingList
            },

            async addItemToShoppingList(values) {
                values.list_id = shoppingList.id
                setIsUpdating(true)
                await api.createShoppingListItem(values)
                let updatedShoppingList = await api.getShoppingList()
                setShoppingList(updatedShoppingList[0])
                setIsUpdating(false)
            },

            async updateItemInShoppingList(values) {
                values.list_id = shoppingList.id
                setIsUpdating(true)
                await api.updateShoppingListItem(values)
                let updatedShoppingList = await api.getShoppingList()
                setShoppingList(updatedShoppingList[0])
                setIsUpdating(false)
            },

            async deleteItemFromShoppingList(itemId) {
                setIsUpdating(true)
                await api.deleteShoppingListItem(itemId)
                let updatedShoppingList = await api.getShoppingList()
                setShoppingList(updatedShoppingList[0])
                setIsUpdating(false)
            }
        }
    }, [shoppingList, api, setShoppingList, isUpdating])

    return self
}
