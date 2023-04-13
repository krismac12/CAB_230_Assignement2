import logo from './logo.svg';
import './App.css';
import Home from './Pages/Home';
import Movies from './Pages/Movies';
import MovieData from './Pages/MovieData';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' exact Component={Home}></Route>
      <Route path='/movies' exact Component={Movies}></Route>
      <Route path='/movie/data' exact Component={MovieData}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
