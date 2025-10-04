import { useEffect, useState } from 'react'
import '../App.css'
import uploadDocument from '../utils/useUpload';
import Settings from '../pages/settings';
import createSign from '../utils/createSign';
import Signatures from '..Signatures';

const Upload = ({documentId,setDocumentId,signatureDetails,setSignatureDetails,setErrors}) =>{
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
    <form onSubmit={onSubmit}>
      <input type="file" name='file'/>
      <button type='submit'>Upload</button>
    </form>
    </>
  )
}
export default Upload