import React, {useEffect, useState} from 'react'

function LifeCycle() {

    const [data, setData] = useState(null)

    useEffect(() => {
        console.log("component mounted")

        const fetchData = async () => {
            console.log("component updated")
            const response = await fetch("https://jsonplaceholder.typicode.com/posts")
            const result = await response.json();

            setData(result[0])
        }

        fetchData()

        return () => {
            //removing 
        }
    }, [])


  return (
    <div>
        {data && <h2>{data.title}</h2>}

    </div>
  )
}

export default LifeCycle