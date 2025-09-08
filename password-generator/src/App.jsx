import { useState } from 'react'
import './App.css'
import usePasswordGenerator from './hooks/use-password-generator';
import PasswordStrengthIndicator from './component/StrengthChecker';
import Button from './component/Buttons';
import Checkbox from './component/CheckBox';

function App() {
  const [length,setLength] = useState(4);
  const [checkboxData,setCheckboxData] = useState(
    [{
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
    }]
  )
  const [copied,setCopied] = useState(false);

  const handleCheckboxChange = (i)=>{
    const updatedCheckboxData = [...checkboxData]
    updatedCheckboxData[i].state = !updatedCheckboxData[i].state
    setCheckboxData(updatedCheckboxData)
  }

  const handleCopy = () =>{
    navigator.clipboard.writeText(password);
    setCopied(true);

    setTimeout(()=>{
      setCopied(false);
    },1000)

  }

  const { password ,errorMessage, generatePassword} = usePasswordGenerator()

  return (
    <div className='container'>
      {password&&
      <div className='header'>
        <div className='title'>{password}</div>
        <Button customClass = 'copyBtn' onClick = {handleCopy} text={copied?"Copied":"Copy"}/>
      </div>
      }

      <div className='charLength'>
        <span>
          <label>Character Length</label>
          <label>{length}</label>
        </span>
        <input type="range" min='4' max='20'value={length} onChange={(e)=>{setLength(e.target.value)}} />
      </div>

      <div className='checkboxes'>
        {checkboxData.map((data,i)=>{
          return(<Checkbox key={i} type="checkbox" title={data.title} state={data.state} onChange={()=>handleCheckboxChange(i)}/>);
        })}
      </div>

      <PasswordStrengthIndicator password={password}/>
      
      {errorMessage&&<div className='errorMessage'>
        {errorMessage}
        </div>}

      <Button customClass = 'generateBtn' onClick = {()=>generatePassword(checkboxData,length)} text="Generate"/>
    </div>
  )
}

export default App
