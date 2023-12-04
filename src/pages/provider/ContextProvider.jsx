import { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import app from '../firebase/firebase.config';
import useAxiosPublic from '../../assets/hook/useAxiosPublic';



export const AuthContext = createContext(null)
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const ContextProvider = ({children}) => {
    const axiosPublic = useAxiosPublic();
    const [loading,setLoading] = useState(true);
    const [user,setUser] = useState(null);
    //user creation with email and password

    const createUser = (email,password)=>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password)
    }
    //sign In with email and Password
    const login = (email,password) =>{
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password);
    }

    //PROFILE UPDATE

    const userProfileUpdate = (name,photo) =>{
       return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo,
          });
    }

    //sign in with google

    const googleSign = ()=>{
        setLoading(true);
        return signInWithPopup(auth,provider)
    }

    //signOut

    const logOut = () =>{
        setLoading(true);
       return signOut(auth);
    }

    //promise


    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth,currentuser=>{
            setUser(currentuser);
            if(currentuser){
               const userInfo = { email : currentuser.email };
               axiosPublic.post('/jwt',userInfo)
               .then(res=>{
                    if(res.data.token){
                        localStorage.setItem('access-token',res.data.token);
                        setLoading(false);
                    }
               })

            }else{
                localStorage.removeItem('access-token');
                setLoading(false);
            }
           
        });
        return () =>{
            return unSubscribe();
        }
    },[])

    const authInfo = { user,createUser,login,userProfileUpdate,googleSign,logOut,loading }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default ContextProvider;