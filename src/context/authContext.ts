import { createContext } from "react";



//here we simply add a state and its setState to the AuthContext just
//as we always add declare state and later add it in the Provider tags..  
 const AuthContext = createContext<{
    authStatus: boolean;   //these are simply types coz this is Ts :)
    setAuthStatus: (status: boolean) => void;   // type  ;)
}>({
    authStatus: false,
    setAuthStatus: () => {}
})


//now we create the provider, 
export const AuthProvider = AuthContext.Provider;

export default AuthContext;

//we'll design a custom hook in a different file useAuth() :)
