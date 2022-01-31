import React, {useState} from 'react';
import {useHistory} from 'react-router-dom'
import {Button} from 'react-bootstrap'
import { shipsData } from '../Data/Ships';
import './Form.css'

function ViewShips() {

    const [searchTerm, setSearchTerm] = useState('')


    const history=useHistory(); 

    const routeChange = () => {
        let path='/addship';
        history.push(path)
    }


  return (
      <>
      <div className='viewform'>
      <h2>SHIPS</h2>
      <div className='search-container'>
      <input 
       className='input'
       type="text"
       placeholder="Search..."
       onChange={event => {setSearchTerm(event.target.value)}}
       />
       </div>
       <div className="form-inner">
          {shipsData.filter((val) => {
           if(searchTerm==""){
               return val
           }
           else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())){
               return val
           }
           else if (val.displacement.toLowerCase().includes(searchTerm.toLowerCase())){
              return val
          }
          else if (val.crewmembers.toLowerCase().includes(searchTerm.toLowerCase())){
              return val
          }
       }).map((data, key) => {
              return(
                  <>
                  <div key={key}>
                      {
                          data.name + 
                          " , " +
                          data.displacement + 
                          " | crew members: " +
                          data.crewmembers
                      }
                  </div>
                  </>
              )
          })}
          <Button onClick={routeChange}>Add new ship</Button>
      </div>
      </div>
      </>
  )
}

export default ViewShips;
