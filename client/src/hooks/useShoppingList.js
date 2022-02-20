import {createContext, useContext, useMemo} from 'react'
import {useApi} from './useApi'

const ShoppingListContext = createContext()
export const ShoppingListProvider = ShoppingListContext.Provider

export default function useShoppingList() {
    const api = useApi()
    const {shoppingList, setShoppingList} = useContext(ShoppingListContext)

    const self = useMemo(() => {
        return {
            ...shoppingList,

            // Check if a this represents a valid shoppingList

            get itemCount() {
                return shoppingList.items?.length || 0
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
                console.log(shoppingList)
                values.list_id = shoppingList.id
                console.log(values)
                await api.createShoppingListItem(values)
                let updatedShoppingList = await api.getShoppingList()
                setShoppingList(updatedShoppingList[0])
            },

            async deleteItemToShoppingList(itemId) {
                await api.deleteShoppingListItem(itemId)
                let updatedShoppingList = await api.getShoppingList()
                setShoppingList(updatedShoppingList[0])
            }
        }
    }, [shoppingList, api, setShoppingList])

    return self
}
