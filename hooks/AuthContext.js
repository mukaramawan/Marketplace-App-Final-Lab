import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null);

    const setAuth = AuthUser => {
        setUser(AuthUser);
    }

    //Will be use in future to Store User Data
    const setUserData = userData => {
        setUser({...userData});
    }

    return <AuthContext.Provider value={{user, setAuth, setUserData}}>
        {children}
    </AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext);

