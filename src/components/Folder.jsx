import { useState } from "react";

function Folder({ explorer }) {
    const [expand, setExpand] = useState(false)
    const [showInput, setShowInput] = useState({
        visibility: false,
        isFolder: null
    })

    const handleNewFolder = (e, isFolder) => {
        e.stopPropagation();
        setExpand(true)
        setShowInput({
            visibility: true,
            isFolder
        })
    }

    const onAddFolder = (e) =>{
        if(e.keyCode === 13 && e.target.value){
            setShowInput({...showInput,visibility:false})
        }
    }

    if (explorer.isFolder) {
        return (
            <div style={{ marginTop: 6 }}>
                <div className="folder" onClick={() => setExpand(!expand)}>
                    <span>📁 {explorer.name}</span>
                    <div>
                        <button onClick={(e) => handleNewFolder(e, true)}>Folder +</button>
                        <button onClick={(e) => handleNewFolder(e, false)}>File +</button>
                    </div>
                </div>
                <div style={{ display: expand ? "block" : "none", paddingLeft: 25 }}>
                    {showInput.visibility && (
                        <div className="inputContainer">
                            <span>{showInput.isFolder ? "📁" : "📄"}</span>
                            <input 
                            className="inputContainer__input"
                            type="text"
                            onKeyDown={onAddFolder}
                            onBlur={()=>setShowInput({...showInput,visibility:false})}
                            autoFocus
                            />
                        </div>
                    )}
                    {explorer.items.map((exp) => {
                        return <Folder explorer={exp} key={exp.id} />
                    })}
                </div>

            </div>
        )
    } else {
        return (
            <div style={{ marginTop: 6 }}>
                <span style={{ paddingLeft: 15 }} >📄 {explorer.name}</span>
            </div>
        )
    }
}

export default Folder;