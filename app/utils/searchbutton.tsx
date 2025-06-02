import React from 'react'
import "E:/NodeJs/weatherapp/app/globals.css"
import evidence from "./evidence.png"
import Image from 'next/image'
import { useFormState } from 'react-dom'

const searchbutton = () => {
  return (
    <div>
      <button className='NavButton' type='submit'>
        <Image src={evidence}
        alt=""
        className="NavIcon"/>
      </button>
        
    </div>
  )
}

export default searchbutton