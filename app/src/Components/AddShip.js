import React, {useState} from 'react';
import {useHistory} from 'react-router-dom'
import {Button} from 'react-bootstrap'
import './Form.css'

function AddShip() {
    const [name, setName] = useState("");
    const [displacement, setDisplacement] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
    }

    const history=useHistory();

    const routeChange = () => {
        let path='/';
        history.push(path)
        alert('You have added a new ship')
    }


  return (
    <>
    <div className="userform">
       <form onSubmit={handleSubmit}>
           <div className="form-inner">
           <h1>Add a new ship</h1>
               <div className='form-group'>
                   <label>Name </label>
                   <input
                   type="text"
                   value={name}
                   onChange={(e) => setName(e.target.value)}/>
               </div>
               <br/>
               <div className='form-group'>
                   <label>Displacement</label>
                   <input
                   type="text"
                   value={displacement}
                   onChange={(e) => setDisplacement(e.target.value)}/>
               </div>
               <Button type="submit" onClick={routeChange}>Submit</Button>
           </div>
       </form>
     </div>
    </>
  )
}

export default AddShip;
