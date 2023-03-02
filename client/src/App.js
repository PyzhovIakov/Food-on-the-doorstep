import React from "react"
import Navigation from "./Component/Navigation/Navigation"
import useAuth from './hooks/auth.hook'
import AuthContext from './context/AuthContext'
import TemporaryBasketContext from './context/TemporaryBasketContext'
import useBasket from './hooks/basket.hook'

function App() {
  const {login,logout,token,userId,role} = useAuth()
  const {basket,AddBasket} = useBasket()
  const isAuth=!!role

  return (
   
    <AuthContext.Provider value={{token,userId,role,login,logout,isAuth}}>
      <TemporaryBasketContext.Provider value={{basket,AddBasket}}>
        <div>
          <Navigation/>
        </div>
      </TemporaryBasketContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
