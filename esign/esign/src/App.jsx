import { useEffect, useState } from 'react'
import './App.css'
import uploadDocument from './utils/useUpload';
import Settings from './pages/settings';
import createSign from './utils/createSign';
import Signatures from './components/Signatures';


function App() {
  const[documentId,setDocumentId]=useState();
  const[signatureDetails,setSignatureDetails] = useState({"signatureId":"", "signers":[]});
  const[errors,setErrors] = useState([]);

  const onSubmit =async (e)=>
  {
    e.preventDefault();
    const name = "contract";
    const formData = new FormData(e.target);
    const file = formData.get("file");
     if (file) {
      await uploadDocument(file,setDocumentId,setErrors);
    } else {
      setErrors(prevErrors=>[...prevErrors, "Please select a file."]);
    }
  }
  useEffect(()=>{
      if (documentId) {
      createSign(documentId, setSignatureDetails, setErrors);
      }
    },[documentId])
  
  return (<>
    <Settings></Settings>
    <form onSubmit={onSubmit}>
      <input type="file" name='file'/>
      <button type='submit'>Upload</button>
    </form>
    <Signatures signatureDetails={signatureDetails}/>
    </>
  )
}

export default App
