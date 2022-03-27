import React, { useEffect, useState } from 'react';
import {randomColor} from 'randomcolor'
import { v4 } from 'uuid';
import './App.css';


function App() {
  // const [tasks, setTasks] = useState('')
  const [tasks, setTasks] = useState('')
  const [items, setItems] = useState(

    JSON.parse(localStorage.getItem('items')) || []
    
  )

useEffect(()=> {

  localStorage.setItem('items', JSON.stringify(items))
},[items])

const addTaskLocal = () =>{
  if(tasks.trim() !== ''){
    const newTask = {
      id: v4(),
      title: tasks,
      active: true,
      color: randomColor({
        hue: 'purple'
      }),
      
  }  
  setItems([...items, newTask])
  setTasks('')
}else{
  alert('Please write a task')
}
}
const taskDelete = (id) => {
  
  setItems(items.filter(elem => elem.id !== id))
  
}
const addStyle =(element)=> {

  let arrActiveItem = items.map(i => {
    if(i === element){
      i.active = !i.active
      return i
    }else {
      return i
    }
  })
  setItems(arrActiveItem)
}
  return (
    <div className="App">
      <div className="todo__wrapper">
        <div>
        <p className='todo__title'>My tasks</p>
        <input 
        value={tasks}
        onChange={(e)=> setTasks(e.target.value)}
        type="text"
        placeholder='Please enter a task...'
        />
        <button onClick={addTaskLocal} className='add'>Add</button>
        </div>
        <div className="tasks__list">
          {
            items.map((item, index)=>{
              return (
              <div className={!item.active ? "tasks__item active" : "tasks__item"}
                            
              
              key={item.id} 
              style={{background: item.color}}
            
              >
                <span onClick={()=> addStyle(item)}>{index + 1}. {item.title}</span>
                <button 
                className='delete'
                onClick={()=> taskDelete(item.id)}
                >X</button>
              </div>
              )
            })
          }
        </div>
      </div>
    </div>
  );
}

export default App;
