import { useState } from "react";
import useLRUCache from "../hooks/useLRUCache";

const DynamicContentLoader = ()=>{

    const[content,setContent] = useState([]);
    const {get,put} = useLRUCache(3)
    const loadContent = async(id)=>{
        await new Promise((resolve)=>setTimeout(resolve,1000))

        const loadedContent = {
            id,
            text:`Tab ${id} data`
        }
        put(id,loadedContent)
        setContent(prev=>[...prev,loadedContent])
    }

    const handleButtonClicked=(id)=>{
        const cacheContent = get(id);
        if(cacheContent)
            {
               console.log(`Content ${id} loaded from cache`);
               setContent(prev=>[...prev,cacheContent]);
            }
        else
        {
            console.log(`Loading Content ${id}`);
            loadContent(id)
        }
        
    }

    return(
        <div>
        <h2>Dynamic Content Loader with LRU cache </h2>
        <button onClick={()=>handleButtonClicked(1)}>Tab 1</button>
        <button onClick={()=>handleButtonClicked(2)}>Tab 2</button>
        <button onClick={()=>handleButtonClicked(3)}>Tab 3</button>
        <button onClick={()=>handleButtonClicked(4)}>Tab 4</button>
        <button onClick={()=>handleButtonClicked(5)}>Tab 5</button>

        <div>
            <h3>Loaded content</h3>
            <ul>
                {
                content.map((item,i)=>{
                return (<li key={`${item.id}${i}`}>{item.text}</li>)
            })
                }
            </ul>
        </div>
        </div>
    )
}
export default DynamicContentLoader