import React from 'react'
import './Seats.css'

const Seats = ({seat_no, seat_status}) => {
  return (
    <div className='Seats' id = {seat_status?'booked':'available'}>
        <p>{seat_no}</p>
        <p>{seat_status}</p>
    </div>
  )
}

export default Seats;
