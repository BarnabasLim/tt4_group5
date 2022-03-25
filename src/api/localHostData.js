import { FaJoget } from "react-icons/fa";

/**
 * 
 * @param {} query 
 * @param {Function} onSuccess 
 * @param {Function} onError 
 * @returns 
 */
 export const db_local_task_async_fetch=async(onSuccess,onError)=>{
    try {
        const response = await fetch(`http://localhost:5000/task`)
        const result = await response.json()
        console.log(result)
        return onSuccess(result)
      } catch (err) {
        //console.error("ERR",err)
        return onError(err)
      }
};


export const db_local_task_promise_fetch=(onSuccess,onError,abortCont)=>{
    fetch(`http://localhost:5000/task`,{signal:abortCont.signal})
    .then((response)=>{return response.json()})
    .then((result)=>onSuccess(result))
    .catch((err)=>{
        console.error("ERR",err)
        onError(err)
    })
};

export const db_local_task_async_delete=async(id)=>{
    try {
        const response = await fetch(`http://localhost:5000/task/${id}`,{method:'DELETE',})
        console.log(response)
      } catch (err) {
        console.error("ERR",err)

      }
};

export const db_local_task_async_add=async(task)=>{
    try {
        const response = await fetch(`http://localhost:5000/task`,{
            method:'POST',
            headers:{'Content-type':'application/json'},
            body:JSON.stringify(task)
        })
        const result=response.json()
        console.log(response)
      } catch (err) {
        console.error("ERR",err)
      }
};


export const db_local_task_async_Single_fetch=async(id)=>{
  try {
      const response = await fetch(`http://localhost:5000/task/${id}`)
      const result = await response.json()
      console.log("result Single",result)
      return result
    } catch (err) {
      console.error("ERR",err)

    }
};

export const db_local_task_async_toggle_reminder=async(id,onSuccess,onError)=>{
  try {
      const taskToToggle=await db_local_task_async_Single_fetch(id)
      const updTask={...taskToToggle, reminder: !taskToToggle.reminder}
      console.log("updTask",updTask)
      const response = await fetch(`http://localhost:5000/task/${id}`,{
        method:'PUT',
        headers:{
          'Content-type':'application/json'
        },
        body: JSON.stringify(updTask),
      })
      const result = await response.json()
      console.log(result)
      //Note results is a single Task
      return onSuccess(result)
    } catch (err) {
      //console.error("ERR",err)
      return onError(err)
    }
};