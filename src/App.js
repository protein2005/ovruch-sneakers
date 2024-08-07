import { useEffect, useState } from "react";
import axios from "axios";
import {Route, Routes} from "react-router-dom";
import AppContext from "./context";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import Home from "./pages/Home"
import Favorites from "./pages/Favorites";
import Orders from "./pages/Orders";

function App() {
  const [items, setItems] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [favorites, setFavorites] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [cardOpened, setCartOpened] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (cardOpened) {
      document.body.classList.add('hidden');
    } else {
      document.body.classList.remove('hidden');
    }
  }, [cardOpened])

  useEffect(() => {
    async function fetchData() {
      try {
        const cartResponse = await axios.get(`https://66a82d2153c13f22a3d20538.mockapi.io/cart`);
        const favoritesResponse = await axios.get(`https://66aa1ae1613eced4eba7933a.mockapi.io/favorites`);
        const itemsResponse = await axios.get(`https://66a82d2153c13f22a3d20538.mockapi.io/items`);

        setIsLoading(false)

        setCartItems(cartResponse.data)
        setFavorites(favoritesResponse.data)
        setItems(itemsResponse.data)
      } catch (error) {
        alert('Помилка при отриманні товарів ;(')
      }
    }
    fetchData()
  }, [])

  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find((item) => Number(item.productId) === Number(obj.productId))
      if (findItem) {
        await axios.delete(`https://66a82d2153c13f22a3d20538.mockapi.io/cart/${findItem.id}`)
        setCartItems(prev => prev.filter(item => Number(item.productId) !== Number(obj.productId)))
      } else {
          const {data} = await axios.post(`https://66a82d2153c13f22a3d20538.mockapi.io/cart`, obj);
          setCartItems([...cartItems, data])
      }

    } catch (error) {
      alert('Не вдалось додати товар до кошика')
    }
  }

  const onRemoveItem = (id) => {
    try {
      const findItem = cartItems.find(obj => obj.productId === id)
      if (findItem) {
        axios.delete(`https://66a82d2153c13f22a3d20538.mockapi.io/cart/${findItem.id}`)
        setCartItems((prev) => prev.filter((item) => Number(item.productId) !== Number(id)));
      }
    } catch (error) {
      alert('Ошибка при удалении из корзины');
      console.error(error);
    }
  }

  const onAddFavorite = async (obj) => {
    try {
      const findItem = favorites.find(favObj => Number(favObj.productId) === Number(obj.productId))
      if (findItem) {
        await axios.delete(`https://66aa1ae1613eced4eba7933a.mockapi.io/favorites/${findItem.id}`)
        setFavorites(prev => prev.filter(item => Number(item.productId) !== Number(obj.productId)))
      } else {
        const {data} = await axios.post(`https://66aa1ae1613eced4eba7933a.mockapi.io/favorites`, obj);
        setFavorites([...favorites, data])
      }
    } catch (error) {
      alert("Не вдалось додати у вподобанні")
    }
  }

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value)
  }

  const isItemFavorited = (id) => {
    return favorites.some((obj) => Number(obj.productId) === Number(id))
  }

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.productId) === Number(id))
  }

  return (
    <AppContext.Provider value={{items, cartItems, favorites, isItemAdded, onAddFavorite, setCartOpened, setCartItems, onAddToCart, isItemFavorited}}>
      <div className="wrapper clear">
        <Drawer items={cartItems} onRemove={(id) => onRemoveItem(id)} onClose={() => setCartOpened(false)} opened={cardOpened}/>
        <Header onClickCart={() => setCartOpened(true)}/>
        <Routes>
          <Route path="/" element={
            <Home 
              items={items}
              cartItems={cartItems} 
              searchValue={searchValue} 
              setSearchValue={setSearchValue} 
              onChangeSearchInput={onChangeSearchInput}
              onAddFavorite={onAddFavorite}
              onAddToCart={onAddToCart}
              isLoading={isLoading}/>
              } exact> 
          </Route>
          <Route path="/favorites" element={
            <Favorites/>
              } exact> 
          </Route>
          <Route path="/orders" element={
            <Orders/>
              } exact>
          </Route>
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
