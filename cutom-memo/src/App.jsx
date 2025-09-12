import { useState, } from 'react'
import './App.css'
import useCustomMemo from './hooks/use-custom-memo'

function App() {
  const [counter, setCounter] = useState(0)
  const [counter2, setCounter2] = useState(100)

  const squareValue = ()=>{
    console.log("Expensive Calculations");
    return counter*counter;
  }

  const memoisedSquareValue = useCustomMemo(squareValue,[counter])
  return (
    <div className='App'>
      <h2>Counter: {counter}</h2>
      <h2>Square Counter: {memoisedSquareValue}</h2>
      <button onClick={()=>{setCounter(counter+1)}}>Increment</button>
      <h2>Counter: {counter2}</h2>
      <button onClick={()=>{setCounter2(counter2-1)}}>Decrement</button>
    </div>
  )
}

export default App
