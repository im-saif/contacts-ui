import './App.css';
import Contacts from './components/Contacts'
import NewContact from './components/NewContact';
import {Route} from 'react-router-dom'

function App() {
  return (
    <div>
      <Route path="/" exact component={Contacts} />
      <Route path="/new-contact" exact component={NewContact}/>
    </div>
  );
}

export default App;
