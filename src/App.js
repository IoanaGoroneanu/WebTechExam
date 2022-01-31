import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';
import AddCrewView from './Components/AddCrewView';
import AddShipView from './Components/AddShipView';
import Homepage from './Components/Homepage';
import ViewCrew from './Components/ViewCrew';

function App() {
  return (
    <>
    <Router>
      <Switch>
      <Route path='/' exact>
        <Homepage />
      </Route>
      <Route path='/addship' exact>
        <AddShipView />
      </Route>
      <Route path='/addcrew' exact>
        <AddCrewView />
      </Route>
      <Route path='/crew' exact>
        <ViewCrew />
      </Route>
      </Switch>
    </Router>
    </>
  );
}

export default App;
