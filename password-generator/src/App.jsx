import { useState } from 'react'
import './App.css'

function App() {
  const [length,setLength] = useState(4);
  const [checkboxData,setCheckboxData] = useState(
    {
      title:"Include Uppercase Letters",
      state:false
    },
    {
      title:"Include Lowercase Letters",
      state:false
    },
    {
      title:"Include Numbers",
      state:false
    },
    {
      title:"Include Symbol",
      state:false
    }
  )

  const handleCheckboxChange = (i)=>{
    const updatedCheckboxData = [...checkboxData]
    updatedCheckboxData[i].state = !updatedCheckboxData[i].state
    setCheckboxData(updatedCheckboxData)
  }

  

  return (
    <div className='container'>
      <div className='header'>
        <div className='title'>afesf124</div>
        <button className='copyBtn' onClick={()=>{}}>copy</button>
      </div>

      <div className='charLength'>
        <span>
          <label>Character Length</label>
          <label>{length}</label>
        </span>
        <input type="range" min='4' max='20'value={length} onChange={(e)=>{setLength(e.target.value)}} />
      </div>

      <div className='checkboxes'>
        {checkboxData.map((data,i)=>{
          return <div key={i}>
            <input type="checkbox" checked={data.state} onChange={(i)=>handleCheckboxChange(i)}/>
            <label>{data.title}</label>
            </div>
        })}
      </div>

      {/* strength */}

      <button className='generateBtn' onClick={()=>{}}>Generate</button>


    </div>
  )
}

export default App
