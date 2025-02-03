import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { getTruckById } from '../redux/truckSlice'



function ViewTruck() {
  const {id} = useParams()
  const dispatch = useDispatch()
  const {selectedTruck: truck, status, error} = useSelector( state => state.trucks)

  useEffect(() => {
    dispatch(getTruckById(id))
  }, [dispatch, id])

  return (
    <div>
      <div className="card" >
        <div className="card-body">
          <h5 className="card-title">Truck Details</h5>
          { status === "loading" ? (
            <p> Loading</p>
            ) : error ? (
              <p className='text-danger'> {error}</p>
            ) : truck ? (
              <p className="card-text">
                  <p><strong>ID:</strong> {truck.id}</p>
                  <p><strong>Model:</strong> {truck.model}</p>
                  <p><strong>Status:</strong> {truck.status}</p>
                  <p><strong>Details:</strong> {truck.details}</p>
              </p>
            ) : (
              <div>Truck Not Found</div>
            )
         }
          
        </div>
      </div>
      <Link to="/" className="btn btn-secondary">Back to home</Link>
    </div>
  )
}

export default ViewTruck