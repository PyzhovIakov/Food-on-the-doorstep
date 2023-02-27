import * as React from "react"
import Navigation from "./Component/Navigation/Navigation"
import useAuth from './hooks/auth.hook'
import AuthContext from './context/AuthContext'

function App() {
  const {token,userId,role,login,logout} = useAuth()
  const isAuth=!!token

  return (
    <AuthContext.Provider value={{token,userId,role,login,logout,isAuth}}>
      <div>
        <Navigation/>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
