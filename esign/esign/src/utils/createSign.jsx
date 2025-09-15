const createSign= async (documentId,setSignatureDetails,setErrors) =>{
    const myHeaders = new Headers();
    myHeaders.append("x-client-id", localStorage.getItem("x-client-id"));
    myHeaders.append("x-client-secret", localStorage.getItem("x-client-secret"));
    myHeaders.append("x-product-instance-id", localStorage.getItem("x-product-instance-id"));
    myHeaders.append("Content-Type", "application/json");

const raw = JSON.stringify({
  "documentId": documentId,
  "redirectUrl": "http://setu.co",
  "signers": [
    {
      "identifier": "9876543210",
      "displayName": "Ian Fernandes",
      "birthYear": "1991",
      "signature": {
        "height": 60,
        "onPages": [
          "1"
        ],
        "position": "bottom-left",
        "width": 180
      }
    }
  ]
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};
try {
      const resp = await fetch("/api/signature", requestOptions);
      if (!resp.ok) {
        throw new Error(`HTTP error! status: ${resp.status}`);
      }
      const data = await resp.json();
      console.log(data);
      setErrors([]);
      const signersDetails = data.signers.map(signer => ({
        signatureUrl: signer.url,
        status: signer.status}));
      setSignatureDetails({"signatureId":data.id,"signers": signersDetails})
      console.log("Update signers details:", { signId: data.id, signers: signersDetails })
    } catch (error) {
      console.error("An error occurred:", error);
      setErrors(prevErrors=>[...prevErrors, `An error occurred: ${error.message}`]);
    }
}
export default createSign