import { useEffect, useState } from 'react'
import './App.css'
import ProgressBar from './components/ProgressBar'

function App() {
  const [value, setvalue] = useState(0);
  const [status,setStatus] = useState(false);

  useEffect(()=>{
    const timer = setInterval(()=>{
      setvalue((Prev)=>Prev+1)
    },100)
    return ()=> clearInterval(timer);
  },[]);
  return (
    <>
      <div className='app'>
        <span>ProgressBar</span>
        <ProgressBar value={value} onComplete={()=>{setStatus(true)}}/>
          <span>{status?"Completed":"Loading.."}</span>
      </div>
    </>
  )
}

export default App
