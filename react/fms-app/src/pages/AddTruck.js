import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import { addTruck } from '../redux/truckSlice'
import { useNavigate } from 'react-router-dom'

function AddTruck() {

  const [truck, settruck] = useState({model: "", status: "Available", details: "" })
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleChange = (e) => {
    settruck({...truck, [e.target.name]:e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addTruck(truck))
    navigate("/")
  }

  return (
    <div className='container mt-4'>
      <h2> Add Truck</h2>
      <div>Model: {truck.model} -  Status: {truck.status} - Details: {truck.details} </div>
      <form onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label className='form-label'>Model</label>
          <input 
            type='text'
            name='model'
            className='form-control'
            value={truck.model}
            onChange={handleChange}
          />
        </div>
        <div className='mb-3'>
          <label className='form-label'>Status</label>
          <select name='status' className='form-control' value={truck.status} onChange={handleChange}>
            <option value="available">AVailable</option>
            <option value="IN Use">In Use</option>
            <option value="maintenance">maintenance</option>
          </select>
        </div>
        <div className='mb-3'>
          <label className='form-label'>Details</label>
          <input 
            type='text'
            name='details'
            className='form-control'
            value={truck.details}
            onChange={handleChange}
          />
        </div>
        <button type='submit' className='btn btn-primary'> Add Truck</button>
      </form>
    </div>
  )
}

export default AddTruck