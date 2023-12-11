/* eslint-disable */
import { useContext, createContext } from "react";
const AuthContext = createContext()

export const AuthContextProvider = ({children, value}) =>{
    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAutValue = ()=>{
    return useContext(AuthContext)
}