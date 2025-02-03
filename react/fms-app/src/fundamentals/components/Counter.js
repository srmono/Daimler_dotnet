import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement, incrementByAmount } from '../features/counter/counterSlice'


function Counter() {

    const dispatch = useDispatch();
    const count = useSelector((state) => state.counter.value  )

  return (
    <div>
        <h1> {count}</h1>
        <button onClick={() => {dispatch(increment())}}>Increment</button>
        <button onClick={() => {dispatch(decrement())}}>decrement</button>
        <button onClick={() => {dispatch(incrementByAmount(5))}}>increment by 5</button>
    </div>
  )
}

export default Counter