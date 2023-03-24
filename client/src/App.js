import React from "react"
import Navigation from "./Component/Navigation/Navigation"
import useAuth from './hooks/auth.hook'
import AuthContext from './context/AuthContext'
import TemporaryBasketContext from './context/TemporaryBasketContext'
import useBasket from './hooks/basket.hook'

function App() {
  const { login, logout, CheckingAuthorizedUser, updateUserBasket, token, userId, role, userBasket } = useAuth()
  const { basket, AddBasket, DeleteBasket, DecrementBasket, IncrementBasket, UpdateUserBasket } = useBasket()
  const isAuth = !!role

  return (

    <AuthContext.Provider value={{ token, userId, role, userBasket, updateUserBasket, login, logout, CheckingAuthorizedUser, isAuth }}>
      <TemporaryBasketContext.Provider value={{ basket, AddBasket, DeleteBasket, DecrementBasket, IncrementBasket, UpdateUserBasket }}>
        <div>
          <Navigation />
        </div>
      </TemporaryBasketContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
