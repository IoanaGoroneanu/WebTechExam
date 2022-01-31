import React , {useState} from 'react';
import {useHistory} from 'react-router-dom'
import {Button} from 'react-bootstrap'
import './Form.css'

function AddCrew() {
    const [ship, setShip] = useState("");
    const [role, setRole] = useState("");
    const [name, setName] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    const history=useHistory();

    const routeChange = () => {
        let path='/crew';
        history.push(path)
        alert('You have added a new crew member')
    }
  return (
    <>
    <div className="userform">
       <form onSubmit={handleSubmit}>
           <div className="form-inner">
           <h1>Add a new crew member</h1>
               <div className='form-group'>
                   <label>Name </label>
                   <input
                   type="text"
                   value={name}
                   onChange={(e) => setName(e.target.value)}/>
               </div>
               <br/>
               <div className='form-group'>
                   <label>Role</label>
                   <select value={role}
                   onChange={(e) => setRole(e.target.value)}>
                    <option value="Captain">Captain</option>
                    <option value="Boatswain">Boatswain</option>
                    <option value="ChiefEngineer">Chief Engineer</option>
                   </select>
                   </div>
               <div className='form-group'>
                   <label>Ship</label>
                   <input
                   type="text"
                   value={ship}
                   onChange={(e) => setShip(e.target.value)}/>
               </div>
               <Button type="submit" onClick={routeChange}>Submit</Button>
           </div>
       </form>
     </div>
    </>
  )
}

export default AddCrew;
