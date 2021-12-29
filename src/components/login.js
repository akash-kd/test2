import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserCtx } from "../context/userCtx";
import '../App.css'

function Login(){
    const [email,setemail] = useState("")
    const [pass,setpass] = useState("")
    const [mess,setmess] = useState("")
    const navigate = useNavigate()
    const {user,setUser} = useContext(UserCtx)
    console.log(user)

    const onSumbit = async(e) =>{
        e.preventDefault()
        if (JSON.stringify(user) != "{}"){
            setmess("user already logged in !!")
            console.log(user)
            return
        }
        if (email.length == 0){
            setmess("email is empty")
            return 
        }
        if (!email.includes('@') || !email.includes('.')){
            setmess("email is badly formatted")
            return
        }
        if (pass.length == 0){
            setmess("password is empty")
            return 
        }
        await axios.post('http://3.140.210.76:8000/api/token/',{
            "email":email,
            "password":pass,
        })
        .then(
            (res) => {
                console.log(res.data)
                setUser(res.data)
                navigate('/user')
            }
        )
        .catch(
            (err) => {
                setmess("user not found !!")
            }
        )
    }
    return (
        <div className="App">
        <div>
          <a>Email</a>
          <input type="email" placeholder="email" required onChange={(e) => setemail(e.target.value)}/>
        </div>
        <div>
          <a>password</a>
          <input type="password" placeholder="password" required onChange={(e) => setpass(e.target.value)}/>
        </div>
        <div>
            <input type="submit" value={'Submit'} onClick={(e) => onSumbit(e)}/>
        </div>
        <a>{mess}</a>
            
    </div>
    )
}

export default Login