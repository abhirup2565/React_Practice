const Signatures = ({signatureDetails})=>{
    return(
        <div>
        {signatureDetails&&(<div>
            <p>Signature ID: {signatureDetails.signatureId}</p>
            {signatureDetails.signers.map((element,index)=>{
                return(<div key={index}>
                <a href={element.signatureUrl} target="_blank">Click to sign</a>
                <p>{element.status}</p>
                </div>)
            })}
        </div>)}
        </div>
    )
}
export default Signatures
