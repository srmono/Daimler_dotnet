import { useState } from "react";

function HeaderComp({name, sendDataToParent}){

    const [childData, setChildData] = useState("");
    
    //var childData = "some data";
    const handleChange = (event) => {
        setChildData(event.target.value)
    }

    const handleSubmit = () => {
        sendDataToParent(childData)
    }

    return (
        <>
            <input 
                type="text"
                value={childData}
                onChange={handleChange}
                placeholder="Enter message"
            />
            <button onClick={handleSubmit}> send messaae to parent</button>
            <h1> Welcome to {name}</h1>
            {/* <h2>{childData}</h2> */}
        </>
    )
}

export default HeaderComp;