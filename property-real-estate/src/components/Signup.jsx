import React, { useState } from "react";
import {useDispatch, useSelector} from "react-redux"
import { signupUser } from "../features/auth/authSlice";

function Signup(){
    const dispatch = useDispatch()
    const {user,loading,error} = useSelector((state)=>state.action);
    const [email,setEmail ] = useState("")
    const [password,setPassword] = useState("")
    const [formError,setFormError] = useState("")

    const handleSubmit = (e)=>{
        e.preventDefault();

        if(!email||!password){
            setFormError("Please fill details")
            return 
        }
        if(password.length<6){
            setFormError("Password must be at least 6 charactors")
            return
        }
        setFormError("")
        dispatch(signupUser({email,password}))
    };

    return (
        <>
            <div>
                {/*logo*/}
            </div>
            <h2>Signup</h2>
            <form onSubmit = {handleSubmit}>
                <input type="email" placeholder="Enter email" value={email} onChange={(e)=>setEmail(e.target.value)} />
                <input type="password" placeholder="Enter password" value={password} onChange={(e)=>setPassword(e.target.value)} />

                {/*form validation error handling */}
                {formError && (<div>{formError}</div>)}

                {/*backend error handling */}
                {error && (<div>{error}</div>)}
                <button type="submit" disabled={loading}>{loading?"Signing up...":"Sign up"}</button>
            </form>
        </>
    )
    
}
export default Signup