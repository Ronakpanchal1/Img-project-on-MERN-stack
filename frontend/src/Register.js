import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'

export default function Register() {

    const passSIcon ="https://cdn-icons-png.flaticon.com/128/4298/4298899.png"
    const passHicon ="https://cdn-icons-png.flaticon.com/512/2710/2710718.png"

    let history = useNavigate()

    const [type, setType] = useState("password")
    const [imgIcon,setImgIcon] = useState(passSIcon)

    const changeIcon = () => {
        if(type === "text"){
            setType("password")
            setImgIcon(passSIcon)
        }else{
            setType("text")
            setImgIcon(passHicon)
        }
    }

    const [credentials, setCredentials] = useState({username:"", email: "", password: "",profession:"" })
    const [props, setProps] = useState({ err: null, msg: null })


    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const handleSubmit = async(e)=>{
        e.preventDefault()
        const response = await fetch("http://localhost:3001/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email,profession:credentials.profession, password: credentials.password ,username:credentials.username})
        })
        const json = await response.json()
        console.log(json)

        if (json.success) {
            history('/login')

        } else {
            setProps({ ...props, err: true, msg: json.msg })

        }

        console.log(credentials)
        
    }
    
  return (
    <div className='Register'>
    <form className="form" onSubmit={handleSubmit}>
        <h1 style={{ textAlign: "center" }}>Register</h1>
        <div className="inputs">
            <label htmlFor="username" className='username'>Username</label>
            <input type="text" id='username' name='username' onChange={onChange} required value={credentials.username}/>
        </div>
        <div className="inputs">
            <label htmlFor="email" className='email'>Email</label>
            <input type="email" id='email' name='email' onChange={onChange} required value={credentials.email}/></div>
        <div className="inputs">
            <label htmlFor="password" className='password'>Password</label>
            <div className="searchWrapper">
                        <input type={type} id='password' name='password' alue={credentials.password} onChange={onChange} />
                        <img src={imgIcon} alt="eye"  onClick={changeIcon}/>
                    </div>
        </div>
        <div className="inputs">
            <label htmlFor="profession" className='profession'>Profession</label>
            <input type="text" id='profession' name='profession' onChange={onChange} value={credentials.profession}/>
        </div>
        {/* <div className="inputs">
            <label htmlFor="images" className='images'><span>Upload Img</span><img src='https://static.thenounproject.com/png/896434-200.png' alt='Error 404 not found'/></label>
            <input type="file" id='images' name='images' style={{display:"none"}}/>
        </div> */}
        {props.err && <span className='hint'> {props.msg} </span>}

        <Link to="/login" className='hint'>Already a user Login here?</Link>
        <button className='btn' >Submit</button>
    </form>
</div>
  )
}
