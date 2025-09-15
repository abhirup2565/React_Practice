const uploadDocument = async(file,setDocumentId,setErrors)=>{
    const myHeaders = new Headers();
    myHeaders.append("x-client-id", localStorage.getItem("x-client-id"));
    myHeaders.append("x-client-secret", localStorage.getItem("x-client-secret"));
    myHeaders.append("x-product-instance-id", localStorage.getItem("x-product-instance-id"));

    const formdata = new FormData();
    formdata.append("name", "contract");
    formdata.append("document", file, file.name);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow"
    };
    try {
      const resp = await fetch("/api/documents", requestOptions);
      if (!resp.ok) {
        throw new Error(`HTTP error! status: ${resp.status}`);
      }
      const data = await resp.json();
      console.log(`updated document ID:${data.id}`);
      setErrors([]);
      setDocumentId(data.id)
    } catch (error) {
      console.error("An error occurred:", error);
      setErrors(prevErrors=>[...prevErrors, `An error occurred: ${error.message}`]);
    }
  }
export default uploadDocument