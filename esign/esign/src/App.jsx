import { useEffect, useState } from 'react'
import './App.css'
import uploadDocument from './utils/useUpload';
import Settings from './pages/settings';
import createSign from './utils/createSign';
import Signatures from './components/Signatures';
import Upload from './pages/upload';
import Status from './pages/status';


function App() {
  const[documentId,setDocumentId]=useState();
  const[signatureDetails,setSignatureDetails] = useState({"signatureId":"", "signers":[]});
  const[errors,setErrors] = useState([]);
  return (<>
    <Settings></Settings>
    <Upload documentId = {documentId} setDocumentId={setDocumentId} signatureDetails={signatureDetails} setSignatureDetails={setSignatureDetails} setErrors={setErrors}></Upload>
    <Signatures signatureDetails={signatureDetails}/>
    {
      signatureDetails.signatureId&&(
      <Status signatureId={signatureDetails.signatureId} setErrors={setErrors}/>
    )
  }
    </>
  )
}

export default App
