import { useEffect, useState } from 'react'
import './App.css'
import { tenureData } from './utils/constant'
import TextInputs from './components/input'

function App() {
  const [assetCost, setAssetCost] = useState(0)
  const [interestRate, setInterestRate] = useState(0)
  const [processingFees, setProcessingFees] = useState(0)
  const [downpayment, setDownpayment] = useState(0)
  const [loanPerMonth, setLoanPerMonth] = useState(0)
  const [tenure, setTenure] = useState(0)

  const updateEMI = (e)=>
  {
    if(!assetCost)return;
    const dp = Number(e.target.value)
    setDownpayment(dp.toFixed(0));
    const emi = calculateEMI(dp);
    setLoanPerMonth(emi);
  }

  const updateDownPayment = (e) =>
  {
    if(!assetCost)return;
    const emi = Number(e.target.value);
    setLoanPerMonth(emi.toFixed(0));

    const dp = calculateDownPayment(emi);
    setDownpayment(dp);
  }

  const calculateEMI = (downP)=>
  {
    if(!assetCost)return;
    const loanAmount = assetCost-downP;
    const RateOfInterest = interestRate/100;
    const numberOfYears = tenure/12;
    const emi = (loanAmount*RateOfInterest*(1+RateOfInterest)**numberOfYears)/((1+RateOfInterest)**numberOfYears-1)
    return Number(emi/12).toFixed(0);
  }

  const calculateDownPayment = (emi)=>
  {
    if(!assetCost)return;
    const downpaymentPercent = 100 - (emi/calculateEMI(0))*100;
    return Number((downpaymentPercent/100)*assetCost).toFixed(0);
  }

  useEffect(()=>{
    if(!(assetCost>0))
    {
      setDownpayment(0)
      setLoanPerMonth(0)
    }

    const emi = calculateEMI(downpayment)
    setLoanPerMonth(loanPerMonth)
  },[tenure])

  return (
    <div className="main-form">
      <h1>EMI CALCULATOR</h1>

    <TextInputs 
      title="Asset Cost"
      state = {assetCost}
      setstate={setAssetCost}
    />
  
    <TextInputs 
      title="Interest Rate (in %)"
      state = {interestRate}
      setstate={setInterestRate}
    />

    <TextInputs 
      title="Processing Fees (in%)"
      state = {processingFees}
      setstate={setProcessingFees}
    />

      <div className="input">
        <h4>Down Payment </h4>
        <h4><u> Down Payment - {(Number(downpayment)+(assetCost-downpayment)*(processingFees/100)).toFixed(0)}</u></h4>
        <div className='labels'>
        <label>0%</label>
        <b>{downpayment}</b>
        <label>100%</label>
        </div>
        <input 
          type="range" 
          min = "0" 
          max = {assetCost}  
          className="slider input__field" 
          value={downpayment}
          onChange={(e)=>{updateEMI(e)}}>
          </input>


      </div>
      <div className="input">
        <h4>Loan Per Month</h4>
        <h4 ><u>Total Loan Amount - {(loanPerMonth*tenure).toFixed(0)}</u></h4>
        <div className='labels'>
        <label>{calculateEMI(assetCost)} </label>
        <b>{loanPerMonth}</b>
        <label>{calculateEMI(0)} </label>
        </div>
        <input 
          type="range" 
          min={calculateEMI(assetCost)} 
          max={calculateEMI(0)}  
          className="slider input__field" 
          value={loanPerMonth}
          onChange={(e)=>{updateDownPayment(e)}}>
        </input>
      </div>

      
      <h4>Tenure</h4>
      <div className="tenure">
      {tenureData.map((t)=>{
        return <button className={`tenure__btn ${t===tenure?"selected":""}`} onClick={()=>{setTenure(t)} }>{t}</button>
      })}
      </div>
    </div>
  );
}

export default App
