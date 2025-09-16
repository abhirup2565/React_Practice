import { useEffect, useState } from 'react';

const StatusDisplay = ({ signatureId, setErrors }) => {
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const fetchStatus = async () => {
      const myHeaders = new Headers();
      myHeaders.append("x-client-id", "6faa7c17-2977-437a-8c73-30bf40c2edff");
      myHeaders.append("x-client-secret", "GqNvWr5md8LYTrIQTnAzygNQrtvIXpMR");
      myHeaders.append("x-product-instance-id", "07451d5a-6091-4e58-8f25-30771aaccb96");

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      };

      try {
        const resp = await fetch(`/api/signature/${signatureId}`, requestOptions);
        if (!resp.ok) {
          throw new Error(`HTTP error! status: ${resp.status}`);
        }
        const data = await resp.json();
        console.log(`Signature Status: ${data.status}`);
        setStatus(data.status);
        setErrors([]);
      } catch (error) {
        console.error("An error occurred:", error);
        setErrors(prevErrors => [...prevErrors, `An error occurred: ${error.message}`]);
      }
    };

    if (signatureId) {
      fetchStatus();
    }
  }, [signatureId]);

  return (
    <div>
      {status ? <h1>Status: {status}</h1> : <p>Loading status...</p>}
    </div>
  );
};

export default StatusDisplay;