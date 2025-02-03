import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { getTruckById, updateTruck } from '../redux/truckSlice';

function EditTruck() {
  const {id} = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {selectedTruck: truck, status} = useSelector(state => state.trucks)
  const [formData, setFormData] = useState({model: "", status: "", details: "" });
  useEffect( () => {
    dispatch(getTruckById(id))
  }, [dispatch, id])

  useEffect( () => {
    if(truck){
      setFormData(truck)
    }
  }, [truck])

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateTruck(formData))
    navigate("/")
  }
  
  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  return (
    <div className='container mt-4'>
      <h2> Edit Truck</h2>

      {status === "loading" ? (
        <p> Loading...</p>
      ) : truck ? (<form onSubmit={handleSubmit}>
        <div className='mb-3'>
          <label className='form-label'>Model</label>
          <input 
            type='text'
            name='model'
            className='form-control'
            value={formData.model}
            onChange={handleChange}
          />
        </div>
        <div className='mb-3'>
          <label className='form-label'>Status</label>
          <select name='status' className='form-control' value={formData.status} onChange={handleChange}>
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
            value={formData.details}
            onChange={handleChange}
          />
        </div>
        <button type='submit' className='btn btn-success'> Update Truck</button>
      </form>) : (<div> Truck Not Found by id `${id}` </div>)}

      
    </div>
  )
}

export default EditTruck