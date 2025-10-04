//Functionality to be added
// when buttons are clicked, the display should update accordingly
// when '=' is clicked, the expression should be evaluated and the result shown on the display
//when an operator is clicked, it should be added to the expression
//when operator is clicked for 2nd time, previous expression should be evaluated and new operator should be added
//old should still be visible on the display
// when 'C' is clicked, the display should be cleared


// import Display from './components/Display'
// import Keypad from './components/Keypad'
import { useState } from 'react'
import './App.css'

function App() {
  const [evaluated, setEvaluated] = useState(false);
  const [displayValue, setDisplayValue] = useState("")
  const [previousExpression, setPreviousExpression] = useState("")
  const [operatorClicked, setOperatorClicked] = useState(false);

  function handleOperatorClick(e) {
    let operator = e.target.innerHTML;
    if(operator === 'x') operator = '*';
    else if(operator === '÷') operator = '/';
    if(operatorClicked){
      // evaluate the previous expression
      let result = eval(displayValue);
      setPreviousExpression(displayValue);
      // set the display value to the result and the new operator
      setDisplayValue(result + operator);
      setEvaluated(true);
    }
    else
    {
      // just add the operator to the display value
      setOperatorClicked(true);
      setDisplayValue(displayValue + operator);
      setEvaluated(false);
    }
  }

  function handleNumberClick(e) {
    if(evaluated)return;
    let number = e.target.innerHTML;
    setDisplayValue(displayValue + number);
  }

  function handleEqualClick() {
    console.log(`Equal Clicked:${displayValue}`);
    if(displayValue === "Error") return;
    try {
      let result = eval(displayValue);
      setPreviousExpression(displayValue);
      setDisplayValue(result);
    } catch (error) {
      setDisplayValue("Error");
      setTimeout(() => {
        setDisplayValue("");
        setPreviousExpression("");
      }, 1000);
    }
    finally{
      setOperatorClicked(false);
      setEvaluated(true);
    }
  }

  function handleClearClick() {
    setDisplayValue("");
    setPreviousExpression("");
    setOperatorClicked(false);
    setEvaluated(false);
  }

  return (
    <>
      <DisplayScreen displayValue={displayValue} previousExpression={previousExpression}/>
      <Keypad 
      handleClearClick={handleClearClick} 
      handleNumberClick={handleNumberClick} 
      handleOperatorClick={handleOperatorClick} 
      handleEqualClick={handleEqualClick} />
    </>
  )
}

export default App


function DisplayScreen({displayValue, previousExpression}) {
  return (
    <div className="display" style={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center', padding: '10px', backgroundColor: '#222', color: '#fff', fontSize: '24px', height: '100px', boxSizing: 'border-box'}}>
      <div className='display__prevExpresstion'>
        {previousExpression}
      </div>
      <div className='display__currentExpression'>
        {displayValue}
      </div>
    </div>
  )
}

function Keypad({handleClearClick,handleEqualClick,handleNumberClick,handleOperatorClick}) {
  return (
    <div className="keypad" style={{display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', padding: '10px', backgroundColor: '#333', boxSizing: 'border-box'}}>
      <KeypadNumbers number={7} handleNumberClick={handleNumberClick}/>
      <KeypadNumbers number={8} handleNumberClick={handleNumberClick}/>
      <KeypadNumbers number={9} handleNumberClick={handleNumberClick}/>
      <KeypadOperator operator={'÷'} handleOperatorClick={handleOperatorClick}/>
      <KeypadNumbers number={4} handleNumberClick={handleNumberClick}/>
      <KeypadNumbers number={5} handleNumberClick={handleNumberClick}/>
      <KeypadNumbers number={6} handleNumberClick={handleNumberClick}/>
      <KeypadOperator operator={'x'} handleOperatorClick={handleOperatorClick}/>
      <KeypadNumbers number={1} handleNumberClick={handleNumberClick}/>
      <KeypadNumbers number={2} handleNumberClick={handleNumberClick}/>
      <KeypadNumbers number={3} handleNumberClick={handleNumberClick}/>
      <KeypadOperator operator={'-'} handleOperatorClick={handleOperatorClick}/>
      <KeypadNumbers number={0} handleNumberClick={handleNumberClick}/>
      <KeypadNumbers number={"."} handleNumberClick={handleNumberClick}/>
      <button className="keypad__button" onClick={handleClearClick} style={{padding: '20px', fontSize: '18px', backgroundColor: '#444', color: '#fff', border: 'none', borderRadius: '5px'}}>C</button>
      <button className="keypad__button" onClick={handleEqualClick} style={{padding: '20px', fontSize: '18px', backgroundColor: '#ff9500', color: '#fff', border: 'none', borderRadius: '5px'}}>=</button>
    </div>
  )
}
const KeypadNumbers = ({number,handleNumberClick})=>{
  return(
    <button className="keypad__button-numbers" onClick={e=>handleNumberClick(e)} style={{padding: '20px', fontSize: '18px', backgroundColor: '#444', color: '#fff', border: 'none', borderRadius: '5px'}}>{number}</button>
  )
} 
const KeypadOperator = ({operator,handleOperatorClick})=>{
  return(
    <button className="keypad__button" style={{padding: '20px', fontSize: '18px', backgroundColor: '#ff9500', color: '#fff', border: 'none', borderRadius: '5px'}} onClick={e=>handleOperatorClick(e)} >{operator}</button>
  )
} 
 