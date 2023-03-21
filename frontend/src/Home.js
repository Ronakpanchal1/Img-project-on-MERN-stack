import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Card from './Card'
import Navbar from './Navbar'

export default function Home() {

  const history = useNavigate()
  const [data, setData] = useState([])


  const fetchData = async () => {
    const res = await fetch("http://localhost:3001/allUserInfo")
    const json = await res.json()
    setData(json)
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      fetchData()
    } else {
      history('/login')
    }
    // eslint-disable-next-line
  }, [])

  return (
    <div>
      <Navbar />
      <div className="Home">
        {
          data?.map((item) => {
            return <Card key={item.id} item={item} />
          })
        }
      </div>
    </div>
  )
}
