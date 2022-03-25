import { useEffect, useState } from "react"
import Task from "./Task"
import * as localData from '../api/localHostData';

const Tasks = (props) => {
    let tasks=props.tasks
    let setTasks=props.setTasks

    const moreTask=(id)=>{
        let tempTasks=tasks.sort((b,a)=>b.id-a.id)
        let newTask={...tasks.find((item)=>item.id==id),id:tempTasks[tempTasks.length-1].id+1}
        console.log("add",id)
        localData.db_local_task_async_add(newTask);
        //To add using new selection
        setTasks((prev)=> [...prev,newTask])
        
    }
    const deleteTask=(id)=>{
      console.log("detete",id)
      //Delete from local Storage based on id
      localData.db_local_task_async_delete(id);
      //To delete based on id
      setTasks((prev)=>prev.filter(item=>item.id!=id))
      
    } 


  //Toggle Reminder
  const toggleReminder=(id)=>{
      localData.db_local_task_async_toggle_reminder(id,
        (task)=>{} ,
        (e)=>console.log(e))
      setTasks((prev)=>
        prev.map((item)=>
          item.id==id?
            {...item, reminder:!item.reminder}
          :
            item
        )
      )
  }

  return (
    <div>
        {tasks.length>0?
          tasks.map((task)=>(
            <Task task={task} key={task.id} 
              moreTask={()=>moreTask(task.id)} 
              deleteTask={()=>deleteTask(task.id)}
              toggleReminder={()=>toggleReminder(task.id)}/>
          )):
          ('No Task')
          
        }
        
    </div>
  )
}
// {tasks.map((task)=> (<h3 key={task.id} onClick={()=>{moreTask(task.id)}}>{task.text} id {task.id}</h3>))}

export default Tasks

