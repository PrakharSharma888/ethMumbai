import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Dashboard from './pages/CreateUser'

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/createUser' element={<Dashboard/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
