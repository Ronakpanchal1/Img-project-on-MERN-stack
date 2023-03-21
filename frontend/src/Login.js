import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {

    const passSIcon ="https://cdn-icons-png.flaticon.com/128/4298/4298899.png"
    const passHicon ="https://cdn-icons-png.flaticon.com/512/2710/2710718.png"

    let history = useNavigate()

    const [type, setType] = useState("password")
    const [imgIcon,setImgIcon] = useState(passSIcon)
    

    const [credentials, setCredentials] = useState({ email: "", password: "" })
    const [props, setProps] = useState({ err: null, msg: null })

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }

    const changeIcon = () => {
        if(type === "text"){
            setType("password")
            setImgIcon(passSIcon)
        }else{
            setType("text")
            setImgIcon(passHicon)
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault()

        const response = await fetch("http://localhost:3001/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password })
        })
        const json = await response.json()
        console.log(json)

        if (json.success) {
            localStorage.setItem('token', json.authToken)
            history('/')

        } else {
            setProps({ ...props, err: true, msg: json.msg })

        }

    }

    return (
        <div className='Register'>
            <form className="form" onSubmit={handleSubmit}>
                <h1 style={{ textAlign: "center" }}>Login</h1>
                <div className="inputs">
                    <label htmlFor="email" className='email'>Email</label>
                    <input type="email" id='email' name='email' value={credentials.email} onChange={onChange} /></div>
                <div className="inputs">
                    <label htmlFor="password" className='password'>Password</label>
                    <div className="searchWrapper">
                        <input type={type} id='password' name='password' alue={credentials.password} onChange={onChange} />
                        <img src={imgIcon} alt="eye"  onClick={changeIcon}/>
                    </div>
                </div>
                {props.err && <span className='hint'> {props.msg} </span>}
                <Link to="/register" className='hint'>Not registered go here?</Link>
                <button className='btn'>Submit</button>
            </form>
        </div>
    )
}
