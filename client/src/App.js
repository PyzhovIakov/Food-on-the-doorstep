import React from "react"
import Navigation from "./Component/Navigation/Navigation"
import useAuth from './hooks/auth.hook'
import AuthContext from './context/AuthContext'

function App() {
  const {login,logout,token,userId,role} = useAuth()
  const isAuth=!!role

  return (
    <AuthContext.Provider value={{token,userId,role,login,logout,isAuth}}>
      <div>
        <Navigation/>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
