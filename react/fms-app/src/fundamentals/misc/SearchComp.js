import React, { useEffect, useState } from 'react'

function SearchComp() {
    const technologies = [
        "Artificial Intelligence",
        "Machine Learning",
        "Blockchain",
        "Quantum Computing",
        "5G",
        "Internet of Things (IoT)",
        "Augmented Reality (AR)",
        "Virtual Reality (VR)",
        "Cloud Computing",
        "Cybersecurity",
        "Robotic Process Automation (RPA)",
        "Edge Computing",
        "Big Data",
        "Autonomous Vehicles",
        "Biotechnology",
        "Drones",
        "3D Printing",
        "Natural Language Processing (NLP)",
        "Wearables",
        "Smart Cities",
        "Nanotechnology",
        "Voice Assistants",
        "Digital Twins",
        "Blockchain for Supply Chain",
        "Smart Home Devices",
        "Neural Networks",
        "Augmented Reality in Retail"
      ];
    const [searchQuery, setSearchQuery] = useState("");
    const [debounceSearchQuery, setDEbounceSearchQuery] = useState(searchQuery)

    const handleChange = (e) => {
        setSearchQuery(e.target.value)
    }

    useEffect( () => {
        const timer = setTimeout( () => {
            setDEbounceSearchQuery(searchQuery)
        }, 500)

        return () => clearTimeout(timer); //clean up the times

    }, [searchQuery])

    const filterredTech = technologies.filter( 
        (item) =>  item.toLowerCase().includes( debounceSearchQuery.toLowerCase() )
    );

  return (
    <div>
        <input 
            type='text'
            placeholder='search..'
            value={searchQuery}
            onChange={handleChange}
        />

        {filterredTech.length > 0 ? 
            (
                filterredTech.map(
                    (item, index) => <li key={index}> {item} </li>
                )
            ) : 
            (<li> no results found</li>)
        }
    </div>
  )
}

export default SearchComp