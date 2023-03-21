import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import axios from "axios"

export default function GetUser() {

  const [msg, setMsg] = useState("")

  const Alert = (message) => {
    setMsg(message)
    setTimeout(() => {
      setMsg("")
    }, 3000);
  }

  const imgUrl = "http://localhost:3001/photo"
  const [user, setUser] = useState()

  const getUser = async () => {
    const response = await fetch(`http://localhost:3001/userInfo`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'authToken': localStorage.getItem("token")
      }
    })
    const json = await response.json()
    setUser(json.data[0])
    // console.log(json)
  }

  useEffect(() => {
    getUser()
  }, [])

  const [img, setImg] = useState('')

  const submitImg = async () => {
    let formData = new FormData();
    formData.append("photo", img)

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        "authToken": localStorage.getItem("token")
      }
    }
    const res = await axios.post("http://localhost:3001/uploadImg", formData, config)

    console.log(res.data)
    if (res.data.success) {
      Alert(res.data.msg)
    } else {
      Alert(res.data.msg)
    }
    getUser()
  }



  return (<>
    <Navbar />
    <div className='ALERT'>
      {msg && <span> {msg}</span>}
    </div>
    <div className='GetUser'>
      <div className='image'>
        {
          user?.img ?
            <img src={`${imgUrl}/${user?.img}`} alt={`${user?.img}`} /> :
            <div className="div"> Image Not Uploaded !</div>
        }
      </div>
      <div className="UploadInputs">
        <label htmlFor="images" className='Upload'>Upload new image</label>
        <input type="file" id='images' name='images' style={{ display: "none" }} onChange={(e) => { setImg(e.target.files[0]) }} />
        <button className='uploadBtn' onClick={submitImg}>Done</button>
      </div>
      <div className='content'>
        <span>{user?.username}</span>
        <span>{user?.email}</span>
        <span>{user?.profession}</span>
      </div>

    </div>
  </>
  )
}
