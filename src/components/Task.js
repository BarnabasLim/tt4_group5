import React from 'react'
import { FaTimes } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Task = (props) => {
  let task=props.task
  let moreTask=props.moreTask
  let deleteTask=props.deleteTask
  let toggleReminder=props.toggleReminder
  return (
    <div className={`task ${task.reminder?'reminder':''}`} key={task.id} onDoubleClick={toggleReminder} >
        <div className='taskflex' style={{/*backgroundColor:'pink',*/ flexDirection:'row', justifyContent:'space-between'}}>
          <h3 className='taskitem' style={{/*backgroundColor:'red',*/ width:"80%"}} onClick={moreTask}>
            {task.text},Hello, {String(task.reminder)}
          </h3>
          <FaTimes style={{color:'red'}}onClick={deleteTask}/>
        </div>
        <p>{task.day}</p>
        <Link to ={`/task/${task.id}`}>View Details</Link>
    </div>
  )
}
//display='inline'
export default Task