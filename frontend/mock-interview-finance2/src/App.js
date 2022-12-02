import Home from './pages/Home/Home'

import Interview from './pages/Interview/Interview'
import Interviews from './pages/Interviews/Interviews'

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
/*
If user id is not found, send user to /
*/
function App() {
  return (
    <Router>
      <nav>
        <span>mockinterview.finance</span>
      </nav>
    <Routes>
      <Route path='/' element={<Home />}/>
      <Route path='/Interview' element={<Interview />}/>
      <Route path='/Interviews' element={<Interviews />}/>

      
    </Routes>
    </Router>

  );
}

export default App;
