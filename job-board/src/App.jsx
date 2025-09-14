import { useState } from 'react'
import './App.css'
import JobPosting from './component/JobPosting';
import { useEffect } from 'react';


const ITEMS_PER_PAGE = 6;
const API_ENDPOINT = "https://hacker-news.firebaseio.com/v0";

function App() {
  const [items, setItems] = useState([])
  const [itemIds, setItemIds] = useState(null)
  const [fetchDetails,setFetchDetails] = useState(false)
  const [currentPage,setCurrentPage]=useState(0)

  const fetchItems = async (currentPage)=>{
    setCurrentPage(currentPage)
    setFetchDetails(true)
    let itemsList = itemIds;
    if(itemsList===null)
    {
      const response = await fetch(`${API_ENDPOINT}/jobstories.json`)
      itemsList = await response.json();
    }

    const itemIdsForPage = itemsList
    const itemsForPage = await Promise.all(
      itemIdsForPage.map((itemId)=>{
        return fetch(`${API_ENDPOINT}/item/${itemId}`).then(res=>res.json())
      })
    )
    setItems([...items,...itemsForPage])
    setFetchDetails(false)

  }
  useEffect(()=>{
    if(currentPage===0)
    {
      fetchItems(currentPage)
    }
  },[])

  return (
    <div className='app'>
      <h1 className='title'>Hacker News job board</h1>
      {
        items.length<1?(
          <p className='loading'>Loading...</p>
        ):(
          <div>
            <div className='items' role='list'>
              {
                items.map((item)=>{
                  return <JobPosting key={item.id} {...item}/>
                })
              }
              
            </div>
            <button className='load-more-button'>Load more</button>
          </div>
        )
      }
    </div>
  )
}

export default App
