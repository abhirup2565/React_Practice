import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [like, setLike] = useState(false)
  const [isFetching,setIsFetching] = useState(false);
  const [errors,setErrors] = useState(null);

  const handleLikeUnlike = async () =>{
    setIsFetching(true);
    setErrors(null);

    try{
      const response = await fetch("https://www.greatfrontend.com/api/questions/like-button",{
      method:"POST",
      header:{"Content-Type":"application/json"},
      body:JSON.stringify(
        {
          action:like?"like":"unlike"
        }
      )});
      console.log(await response.json());
    }
    finally
    {
      setIsFetching(false);
    }

    setLike(!like);
  }

  return (
    <>
      <button className={`LikeBtn ${like?"liked":""}`} onClick={handleLikeUnlike}>{like?"❤ liked":"🖤 like"}</button>
    </>
  )
}

export default App
