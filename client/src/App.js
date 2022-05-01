import { Route, BrowserRouter } from 'react-router-dom';
import './App.css';
import Createvideogame from './components/CreateVideogame';
import DetailVideogame from './components/DetailVideogame';
import Home from './components/Home';
import NavBar from './components/NavBar';
import PagInicio from './components/PagInicio';

function App() {
  
  return (
  <BrowserRouter>
    <div className="App">
     
     
      <Route path='/' exact component={PagInicio}/>
      <Route path='/home' component= {NavBar}/>
      <Route path='/home' exact component={Home}/>
      <Route path='/home/videogame/:id' component={DetailVideogame}/>
      <Route path='/home/create/videogame' exact component={Createvideogame}/>
    
     {/* <Route path='/' exact component ={PagInicio}/> */}
  
    </div> 
    </BrowserRouter>
  );
}

export default App;
