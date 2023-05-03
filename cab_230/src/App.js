// Imports the necessary files and components
import './App.css';
import Home from './Pages/Home';
import Movies from './Pages/Movies';
import MovieData from './Pages/MovieData';
import PersonDetails from './Pages/PersonDetails';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import useHideAlertAfterDelay from './Containers/AlertContainer';
import AuthContainer from './Containers/AuthContainer';
import RefreshTokenContainer from './Containers/RefreshContainer';

// Defines the main component of the application
function App() {

  // A function that hides an Alert after 5 seconds
  useHideAlertAfterDelay()
  // Container Functions
  AuthContainer()
  RefreshTokenContainer()

  // Returns the different routes of the application using React Router
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' exact Component={Home}></Route>
      <Route path='/movies' exact Component={Movies}></Route>
      <Route path='/movie/data/:id' exact Component={MovieData}></Route>
      <Route path='/movie/person/:id' exact Component={PersonDetails}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
