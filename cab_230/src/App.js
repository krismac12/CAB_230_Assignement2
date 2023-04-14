// Imports the necessary files and components
import logo from './logo.svg';
import './App.css';
import Home from './Pages/Home';
import Movies from './Pages/Movies';
import MovieData from './Pages/MovieData';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import useHideAlertAfterDelay from './Containers/AlertContainer';

// Defines the main component of the application
function App() {

  // A function that hides an Alert after 5 seconds
  useHideAlertAfterDelay()

  // Returns the different routes of the application using React Router
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
