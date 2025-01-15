import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../Firebase/Firebase.init";
const provider = new GoogleAuthProvider();

//create context
export const AuthContext =createContext(null)

const AuthProvider = ({children}) => {
    const [user,setUser]=useState(null)
    const [loading,setloading]=useState(true)
    // sign up
    const createuser=(email,password)=>{
        setloading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }
    // sing in
    const signInUser=(email,password)=>{
        setloading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }
    // Social Login/Register

    const signInWithGoogle=()=>{
        return signInWithPopup(auth,provider)
     }
  
      // sign out
      const logOut=()=>{
        setloading(true)
        return signOut(auth)
    }
    // survilance 
    useEffect(()=>{
        const unSubscribe= onAuthStateChanged(auth,currentUser=>{
             console.log('Current User', currentUser);
             setUser(currentUser);
             setloading(false)
         })
         return ()=>{ 
             unSubscribe()
         }
     },[])
   

    const authInfo={
        user,loading,createuser,signInUser,signInWithGoogle,logOut
    }
    return (
       <AuthContext.Provider value={authInfo}>
        {children}
       </AuthContext.Provider>
    );
};

export default AuthProvider;