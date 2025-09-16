import StatusDisplay from "../components/StatusDisplay"

const Status = ({signatureId,setErrors})=>{

    return(<StatusDisplay signatureId={signatureId} setErrors={setErrors}/>)
}
export default Status