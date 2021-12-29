import {useContext, useState} from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import {UserCtx} from '../context/userCtx'
function Signup(){

    const [fname,setfname] = useState("")
    const [lname,setlname] = useState("")
    const [email,setemail] = useState("")
    const [pass,setpass] = useState("")
    const [mess,setmess] = useState("")
    const navigate = useNavigate()
    const {user} = useContext(UserCtx)
    const onSumbit = async (e) =>{
      e.preventDefault()
      console.log("user",user)
      if (JSON.stringify(user) !== "{}"){
        setmess("user already logged in !!")
        console.log(user)
        return
      }
      if (fname.length === 0|| fname.length < 3){
        setmess("full name is not valid")
        return
      }
      if (lname.length === 0){
        setmess("last name is not valid")
        return
      }
      if (email.length === 0){
        setmess("email is empty")
        return 
      }
      if (!email.includes('@') || !email.includes('.')){
          setmess("email is badly formatted")
          return
      }
      if (pass.length === 0){
          setmess("password is empty")
          return 
      }
      
      await axios.post('http://3.140.210.76:8000/api/user/',{
        "first_name":fname,
        "last_name":lname,
        "email":email,
        "password":pass
      })
      .then(
        (res) => {
          setmess(res.data.message)
          if (res.data.message === "A user with the email already exist!") return
          navigate('/login')
        }
      )
      .catch(
        (err) => setmess("Bad formatting")
      )
    }

    return(
        <div className="App">

          <div>
            <p>First name</p>
            <input type="text" placeholder="firstname"required onChange={(e) => setfname(e.target.value)}/>
          </div>
          <div>
            <p>last name</p>
            <input type="text" placeholder="lastname" required onChange={(e) => setlname(e.target.value)}/>
          </div>
          <div>
            <p>Email</p>
            <input type="email" placeholder="email" required onChange={(e) => setemail(e.target.value)}/>
          </div>
          <div>
            <p>password</p>
            <input type="password" placeholder="password" required onChange={(e) => setpass(e.target.value)}/>
          </div>
          <div>
          <input type="submit" value={'Submit'} onClick={(e) => onSumbit(e)}/>
          </div>
          <div className='font'>{mess}</div>
          
      </div>
    )


}

export default Signup