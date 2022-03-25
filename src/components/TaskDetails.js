import React, { useEffect, useState } from 'react'
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import * as localData from '../api/localHostData';

const TaskDetails = () => {
  const [loading, setLoading]=useState(true)
  const [task, setTask]=useState({})
  const [error, setError]=useState(null)
  const params= useParams()
  let navigate=useNavigate();
  let location=useLocation();

  useEffect(()=>{
      const fetchTask=async()=>{
        console.log("Hello")
        const result=await localData.db_local_task_async_Single_fetch(params.id)
        setTask(result)
        setLoading(false)
      }
      fetchTask();
  },[])
  
  return (
    loading?(
       <h3>Loading....</h3> 
    ):
    (
        <div>
            <p>{location.pathname}</p>
            <h3>Details : {task.text}</h3>
            <h3>Date    : {task.day}</h3>
            <button onClick={()=>{
              console.log("go home")  
              navigate('/')          
              }}>Go to Home</button>
        </div>
    )
    
  )
}

export default TaskDetails