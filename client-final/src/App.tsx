import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import './App.css'
import Navbar from './components/Navbar'
import ContractInteraction from './pages/ContractInteraction'
import CreateContract from './pages/CreateContract'

function App() {

  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/contract/:id' element={<ContractInteraction/>}/>
        <Route path='dashboard/createContract/:type' element={<CreateContract/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
