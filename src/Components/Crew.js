import React, {useState} from 'react';
import {useHistory} from 'react-router-dom'
import {Button} from 'react-bootstrap'
import { crewData } from '../Data/crew-data';
import './Form.css'

function Crew() {

    const history=useHistory(); 

    const routeChange = () => {
        let path='/addcrew';
        history.push(path)
    }

    const [searchTerm, setSearchTerm] = useState('')
  return (
    <>
    <div className='crewform'>
    <h2>CREW MEMBERS</h2>
    <div className='search-container'>
    <input 
       className='input'
       type="text"
       placeholder="Search..."
       onChange={event => {setSearchTerm(event.target.value)}}
       />
    </div>
    <div className="form-inner">
        {crewData.filter((val) => {
           if(searchTerm==""){
               return val
           }
           else if (val.name.toLowerCase().includes(searchTerm.toLowerCase())){
               return val
           }
           else if (val.role.toLowerCase().includes(searchTerm.toLowerCase())){
              return val
          }
          else if (val.ship.toLowerCase().includes(searchTerm.toLowerCase())){
              return val
          }
       }).map((data, key) => {
            return(
                <>
                <div key={key}>
                    {
                        data.name + 
                        " , " +
                        data.role + 
                        " | ship: " +
                        data.ship
                    }
                </div>
                </>
            )
        })}
        <Button onClick={routeChange}>Add new crew member</Button>
    </div>
    </div>

    </>
  )
}

export default Crew;
