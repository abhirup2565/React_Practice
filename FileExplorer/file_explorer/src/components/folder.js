import { useState } from "react";

function Folder({handleInsertNode, explorer})
{
    const [expand,setExpand] = useState(false);
    const[showInput, setShowInput] = useState({
        visible:false,
        isFolder:null
    });


    const handleNewFolder = (e,isFolder)=>{
        e.stopPropagation();
        setShowInput({visible:true,isFolder:isFolder})
    }

    const onAddFolder = (e)=>{
        if(e.keyCode === 13 && e.target.value)
        {
            handleInsertNode(explorer.id,e.target.value,showInput.isFolder)
            setShowInput({...showInput,visible:false});
        }
    }

    if(explorer.isFolder)
    {
        return(<div style={{ marginTop: 5 }}>
        <div className="Folder" onClick={()=>{setExpand(!expand)}}>
            <span>📁{explorer.name}</span>
            <div>
                <button onClick={(e)=>{handleNewFolder(e,true)}}>Folder +</button>
                <button onClick={(e)=>{handleNewFolder(e,false)}}>File +</button>
            </div>
        </div>
        <div style={{display: expand?"block":"none", paddingLeft:25}}>

            {showInput.visible && (
                <div className="InputContainer">
                    <span>{showInput.isFolder?"📁":"📄"}</span>
                    <input 
                    type="text"
                    onKeyDown={onAddFolder}
                    onBlur={()=>setShowInput({...showInput,visible:false})}
                    className="inputContainer__input"
                    autoFocus
                    />
                </div>
            )}

            {explorer.items.map((exp)=>{
                return(
                    <Folder handleInsertNode={handleInsertNode} explorer={exp} key={exp.id}/>
            );
                })}
        </div>
        </div>);
    }
    else
    {
        return(<div style={{ marginTop: 5 }}>
        <div className="File">
            <span>📄{explorer.name}</span>
            </div>
            </div>);
    }
    
}

export default Folder   