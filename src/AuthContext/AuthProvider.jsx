import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../Firebase/Firebase.init";
import UseAxiosPublic from "../hook/useAxiosPublic/UseAxiosPublic";
const provider = new GoogleAuthProvider();


//create context
export const AuthContext =createContext(null)

const AuthProvider = ({children}) => {
    const [user,setUser]=useState(null)
    const [loading,setLoading]=useState(true)
    const axiosPublic=UseAxiosPublic()
    // sign up
    const createuser=(email,password)=>{
        setLoading(true)
        return createUserWithEmailAndPassword(auth,email,password)
    }
    // sing in
    const signInUser=(email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }
    // Social Login/Register

    const signInWithGoogle=()=>{
        return signInWithPopup(auth,provider)
     }
  
      // sign out
      const logOut=()=>{
        setLoading(true)
        return signOut(auth)
    }
    // survilance 
    useEffect(()=>{
        const unSubscribe= onAuthStateChanged(auth,currentUser=>{
            if(currentUser){
                const userInfo= {email: currentUser?.email};
                axiosPublic.post('/users',{email: currentUser?.email,userName:currentUser?.displayName})
                .then((res)=>{
                    if(res.data.insertedId){
                        console.log('userCreated')
                    }
                   
                })
                .catch((error)=>{
                    console.log(error.message)
                })
                axiosPublic.post('/jwt',userInfo)
                .then((res)=>{
                    if(res.data.token){
                        localStorage.setItem('access-token',res.data.token)
                        setLoading(false)
                    }
                })
            }
            else{
                localStorage.removeItem('access-token');
                setLoading(false)
            }
             console.log('Current User', currentUser);
             setUser(currentUser);
             
           
         })
         return ()=>{ 
             unSubscribe()
         }
     },[axiosPublic])
   

    const authInfo={
        user,loading,createuser,signInUser,signInWithGoogle,logOut,setLoading
    }
    return (
       <AuthContext.Provider value={authInfo}>
        {children}
       </AuthContext.Provider>
    );
};

export default AuthProvider;
