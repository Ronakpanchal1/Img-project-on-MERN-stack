import React from 'react'
import './App.css';

export default function Card({ item }) {
    const url = `http://localhost:3001/photo/`


    return (
        <div className='Card'>
            <div className='image'>
                {
                    item?.img ?
                        <img src={`${url}${item.img}`} alt="" /> :
                        <div className='div'>Image not Uploaded !</div>
                }
            </div>
            <div className='name'>
                <span>{item.username}</span>
                <span>{item.profession ? item.profession : "Senior UI/UX Designer"}</span>
            </div>

        </div>
    )
}
