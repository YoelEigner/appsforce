import logo from './logo.svg';
import './App.css';
import { Home } from './Components/Home';
import './User.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavbarComp } from './Components/Navbar';

function App() {
  return (
    <div className="App">
      <NavbarComp/>
      <Home />
    </div>
  );
}

export default App;
