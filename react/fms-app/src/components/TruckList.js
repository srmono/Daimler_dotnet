import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { deleteTruck } from '../redux/truckSlice'
import {Link} from 'react-router-dom'

function TruckList() {
  const trucks = useSelector((state) => state.trucks.list )
  const dispatch = useDispatch();

  return (
    <div className='mt-4'>
      <h2> Truck List</h2>
      

      { trucks ? (
       <table className='table table-border'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Model</th>
              <th>Status</th>
              <th>Details</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              trucks.map( (truck) => (
                <tr key={truck.id}>
                  <td>{truck.id}</td>
                  <td>{truck.model}</td>
                  <td>{truck.status}</td>
                  <td>{truck.details}</td>
                  <td>
                    <Link to={`/edit/${truck.id}`} className='btn btn-warning btn-sm'> Edit </Link>
                    <Link to={`/view/${truck.id}`} className='btn btn-info btn-sm'> View </Link>
                    <button 
                      className='btn btn-danger btn-sm mx-2' 
                      onClick={() => dispatch(deleteTruck(truck.id))}
                      > Delete </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      ) : (<div>Trucks are not availeble</div>)}
    </div>
  )
}

export default TruckList