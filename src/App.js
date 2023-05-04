import { useState } from 'react';
import './App.css';

import Seats from './components/Seats'

function App() {
  
  const [seats, setSeats] = useState(0);
  const [list, setlist] = useState([]);

  const showAllHandler = async () => {
    //call api to fetch all seats
    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      
    }
    var result = await fetch('http://localhost:5000/getallseats', options);
    var jsonData = await result.json();
    setlist(jsonData.result);
  }

  const changeHandler = (e) => {
    if(e.target.value < 8){
      setSeats(seats => e.target.value)
    }else{
      setSeats(seats => 0)
    }
  }
  const bookHandler = async () => {
    let options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({seats: seats})
    }
    //call api here to book seats and pass seats in body
    var result = await fetch('http://localhost:5000/bookseats', options);
    var jsonData = await result.json();
    //you get array of seats no to be booked, while rendering pass prop to that particular seat
    setSeats(0);
    setlist(jsonData.result);
  }
  return (
    <div className="App">
      <div className='seats-list'>
          {list.map(item => <ul>{<Seats seat_no = {item.id} seat_status = {item.seat_status}></Seats>}</ul>)}
      </div>
      <div className='booking'>
        <input value = {seats} onChange={changeHandler}></input>
        <button onClick={bookHandler}>Book</button>
      </div>
      
      <button onClick={showAllHandler}>showAll</button>
    </div>
  );
}

export default App;
