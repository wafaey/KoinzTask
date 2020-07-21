import React, {useEffect, useState} from 'react';
import './DragDrop.css';
import Task from '../Task/Task'
import index from "../../action/index";
import {useDispatch,useSelector} from 'react-redux';



export default function DragDrop() {
  const [createdText,setCreatedText] = useState('add text');
  const {x,y,z} = useSelector( state => ({x:state.todoList,y:state.progressList,z:state.doneList }) );
  const dispatch = useDispatch(); 
  var todoList = [...x];
  var progressList = [...y];
  var doneList = [...z]; 
  useEffect(()=>{
    onRefresh();
    },[])
  useEffect(()=>{
    onOpen();
  },[x,y,z]);
  window.onbeforeunload = function(event)
  {

    localStorage.setItem("todo", JSON.stringify(x));
    localStorage.setItem("progress", JSON.stringify(y));
    localStorage.setItem("done", JSON.stringify(z));
  };
  const onRefresh = ()=>{
   const temp1 = JSON.parse(localStorage.getItem("todo"));
   const temp2 = JSON.parse(localStorage.getItem("progress"));
   const temp3 = JSON.parse(localStorage.getItem("done"));
    dispatch(index.setTodo([...temp1]));
    dispatch(index.setProgress([...temp2]));
    dispatch(index.setDone([...temp3]));
    localStorage.setItem("todo", []);
    localStorage.setItem("progress", []);
    localStorage.setItem("done", []);
   }

  const onOpen = async () =>{
    const listOfTasks = document.getElementsByClassName('Task');
    const lists = document.getElementsByClassName('list');
    let draggedTask = null;
    let text = null;
    let data = null;
    for(let i = 0 ; i < listOfTasks.length ;i++){
      const task = listOfTasks[i];
      let count =0;
      task.addEventListener('dragstart' , function(){
        draggedTask = task;
        count=count+1;
        text = task.getElementsByClassName('mark')[0].innerText;
        data = task.getElementsByClassName('mark')[0].id.split("-");
        setTimeout(function (){
          if(data){
          if(data[1]==='one'){
            todoList.splice(data[0], 1);
            dispatch(index.setTodo([...todoList]));
          }else if(data[1]==='two'){
            progressList.splice(data[0], 1);
            dispatch(index.setProgress([...progressList]));
          }
        }
        },0)
      })
      task.addEventListener('dragend' , function(){
        setTimeout(function (){
          task.style.display = 'flex';
          draggedTask = null;
          text = null;
          data = null;
        },0)
      })
      for(let j = 0 ; j < lists.length ; j++){
        const list = lists[j];     
        list.addEventListener('dragover', function(e){
          e.preventDefault();
        })
        list.addEventListener('dragenter', function(e){
          e.preventDefault();
          this.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
        })
        list.addEventListener('dragleave', function(e){
          e.preventDefault();
          this.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
        })
        list.addEventListener('drop', function(e){
           e.preventDefault();
          if(data && count===1){
          if(j===1 && data[1]==='one'){
            let newProgress = {
              'text' : text,
              'moves' : [...x[data[0]].moves, 'Progress'],
              'edits' : [...x[data[0]].edits],
              'creation' : 'In Todo'
            }
            console.log('sadadssd');
            progressList.push(newProgress);
            dispatch(index.setProgress(progressList));
          }else if(j===0 && data[1]==='two'){
            let newTodoList = {
              'text' : text,
              'moves' : [...y[data[0]].moves, 'Todo'],
              'edits' : [...y[data[0]].edits],
              'creation' : 'In Todo'
            }
            todoList.push(newTodoList);
            dispatch(index.setTodo(todoList));
          }else if(j===2 && data[1]==='two'){
            let newDone = {
              'text' : text,
              'moves' : [...y[data[0]].moves, 'Done'],
              'edits' : [...y[data[0]].edits],
              'creation' : 'In Todo'
            }
            doneList.push(newDone);
            dispatch(index.setDone(doneList));
          }else{
            if(data[1]==='one'){
              let newTodoList = {
                'text' : text,
                'moves' : [...x[data[0]].moves],
                'edits' : [...x[data[0]].edits],
                'creation' : 'In Todo'
              }
              todoList.push(newTodoList);
              dispatch(index.setTodo(todoList));
            }else if(data[1]==='two'){
              let newProgress = {
                'text' : text,
                'moves' : [...y[data[0]].moves],
                'edits' : [...y[data[0]].edits],
                'creation' : 'In Todo'
              }
              progressList.push(newProgress);
              dispatch(index.setProgress(progressList));
            }
          }
          this.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
        }
        })
      }
    }
  }
  const onCreate = () =>{
    var modal = document.getElementById("myModal");
    modal.style.display = "block";
  }
  const onConfirm = () =>{
    let newTodoList = {
      text : createdText,
      moves : ['Todo',],
      edits : [],
      creation : 'In Todo'
    }
    todoList.push(newTodoList);
    dispatch(index.setTodo(todoList));
    //dispatch(index.setTodo([...todoList, ...newTodoList]));
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
    setCreatedText('add text');
  }
  const onClose = () =>{
    var modal = document.getElementById("myModal");
    modal.style.display = "none";
    setCreatedText('add text');
  }
  window.onclick = function(event) {
    var modal = document.getElementById("myModal");
    if (event.target === modal) {
      modal.style.display = "none";
      setCreatedText('add text');
    }
  }
  return (
    <div className="DragDrop" >
      <header className="DragDrop-header">
       <h1>Drag and Drop</h1>
      </header>
      <div className='Main'>
          <div className='todo list' id='first-list'>
              <div className='todo-header'>
                  <h3>Todo</h3>
                  <div className='add'>
                  <button className='style' id="myBtn" onClick={onCreate}> Add Task</button>
                  </div>
              </div>
              <div className='todo-body'>
                {todoList.map((item,id) => <Task item={item} id={id+'-one'} />)}
              </div>
          </div>
          <div className='progress list' id='middle-list'>
              <div className='progress-header'>
              <h3>In Progess</h3>
              </div>
              <div className='progress-body'>
              {progressList.map((item,id) => <Task item={item} id={id+'-two'} />)}
              </div>
          </div>
          <div className='done list' id='last-list'>
              <div className='done-header'>
              <h3>Done</h3>
              </div>
              <div className='done-body'>
              {doneList.map((item,id) => <Task item={item} id={id+'-three'} />)}
              </div>
          </div>
      </div>
      <div id="myModal" className="modal"> 
          <div className="modal-content">
          <label className="modal-element" htmlFor="usr" >Create Task</label>
          <input type="text" className="modal-element" value={createdText} onChange={(e)=>setCreatedText(e.target.value)}></input>
          <div className='modal-element'>
          <button className='confirm' onClick={onConfirm}>Confirm</button>
          <button className='close' onClick={onClose}>Close</button>
          </div>
          </div>
    </div>
    </div>
  );
}

