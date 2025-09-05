export default function TextInputs({title,state,setstate})
{
    return(
        <>
        <div className="input">
        <h4> {title}</h4>
        <input 
          type="number" 
          className="input__field"
          value={state}
          onChange={(e)=>setstate(e.target.value)}>
        </input>
      </div>
        </>
    )
}