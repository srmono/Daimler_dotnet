import React, {useState} from 'react'

function FormComp() {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        age: ''
    });
    const handleChage = (e) => {
     const {name, value}  = e.target;
     setFormData( {
        ...formData,
        [name]: value
     })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(`Form Submitted`, formData)
    }

  return (
    <div>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label for="name">Name: </label>
                <input 
                    type="text" 
                    className="form-control" 
                    id="name" 
                    name='name'
                    value={formData.name}
                    placeholder="enter name" 
                    onChange={handleChage}
                />
            </div>
            <div className="form-group">
                <label for="email">Email address</label>
                <input 
                    type="email" 
                    className="form-control" 
                    id="email" 
                    name='email'
                    value={formData.email}
                    aria-describedby="emailHelp" 
                    placeholder="Enter email" 
                    onChange={handleChage}
                />
            </div>
            
            <div className="form-check">
                <input 
                    type="number" 
                    className="form-check-input" 
                    id="age" 
                    name='age'
                    value={formData.age}
                    onChange={handleChage}
                    />
                <label className="form-check-label"  for="exampleCheck1">Age</label>
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
  )
}

export default FormComp