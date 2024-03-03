import './App.css'
import { Button } from './components/ui/button'

function App() {

  const Temp = () =>{
    alert('Humari Team Zindabad')
  }

  return (
    <div onClick={Temp} className=' h-screen w-screen flex justify-center items-center'>
      <Button className='bg-black text-white hover:bg-black rounded-xl hover:rounded-2xl'>Click me</Button>
    </div>
  )
}

export default App
