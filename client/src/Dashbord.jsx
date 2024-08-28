import axios from 'axios';
import React, { useEffect } from 'react'

const Dashbord = () => {
useEffect(() => {
  axios.get('http://localhost:3001/dashboard')
    .then(res => console.log(res))
    .catch(err => console.log(err))
})

  return (
    <h2>Dashbord</h2>
  )
}

export default Dashbord