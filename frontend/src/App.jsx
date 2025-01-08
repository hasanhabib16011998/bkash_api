import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './components/Home';
import Success from './components/Success';
import Error from './components/Error';

function App() {

  return (
    <>
    <BrowserRouter>
      <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/error' element={<Error/>}/>
      <Route path='/success' element={<Success/>}/>
      </Routes>
    </BrowserRouter>
     
    </>
  )
}

export default App
