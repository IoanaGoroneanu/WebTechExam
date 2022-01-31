import React, {useState} from 'react';
import Sidebar from './Sidebar/Sidebar';
import ViewShips from './ViewShips';

function Homepage() {
  return(
    <>
    <Sidebar/>
   <ViewShips/>
   </>
  )
}

export default Homepage;
