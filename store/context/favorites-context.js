import { createContext, useState } from "react"

export const FavoritesContext = createContext({
  ids: [],
  addFavorite: (id) => {},
  removeFavorite: (id) => {},
})

const FavoritesContextProvider = ({ children }) => {
  const [favoriteIds, setFavoriteIds] = useState([])
  const addFavorite = (id) => {
    setFavoriteIds((current) => [...current, id])
  }
  const removeFavorite = (id) =>
    setFavoriteIds((current) => current.filter((currId) => currId !== id))
  const value = {
    ids: favoriteIds,
    addFavorite: addFavorite,
    removeFavorite: removeFavorite,
  }
  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  )
}
export default FavoritesContextProvider
