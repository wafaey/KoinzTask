import React, {useState} from 'react';
import './Task.css';
import index from "../../action/index";
import {useDispatch, useSelector} from 'react-redux';



export default function Task({item,id}) { 
  console.log(item);
    const [editText,setEditText] = useState('edit text');
    const dispatch = useDispatch();
    const {x,y,z} = useSelector( state => ({x:state.todoList,y:state.progressList,z:state.doneList }) ); 
    const todoList = [...x];
    const progressList = [...y];
    const doneList = [...z];
    const onEdit = () =>{
      var modal = document.getElementById(id+'modal');
      modal.style.display = "block";
    }
    const onView = () =>{
      var modal = document.getElementById(id+'view');
      modal.style.display = "block";
    }
    const onDelete = () =>{
      const data = id.split('-');
      if(data[1]==='one'){
        todoList.splice(data[0], 1);
        dispatch(index.setTodo([...todoList]));
      }else if(data[1]==='two'){
        progressList.splice(data[0], 1);
        dispatch(index.setProgress([...progressList]));
      }else if(data[1]==='three'){
        doneList.splice(data[0], 1);
        dispatch(index.setDone([...doneList]));
      }
      var tassk = document.getElementById(id+'task');
      tassk.style.display = "none";
    }
    const onConfirm = () =>{
      const data = id.split('-');
      if(data[1]==='one'){
        todoList.splice(data[0], 1);
        let editTodo = {
          'text' : editText,
          'moves' : [...x[data[0]].moves],
          'edits' : [...x[data[0]].edits, x[data[0]].text],
          'creation' : 'In Todo'
        }
        todoList.push(editTodo);
        dispatch(index.setTodo(todoList));
      }else if(data[1]==='two'){
        progressList.splice(data[0], 1);
        let editProgress = {
          'text' : editText,
          'moves' : [...y[data[0]].moves],
          'edits' : [...y[data[0]].edits, y[data[0]].text],
          'creation' : 'In Todo'
        }
        progressList.push(editProgress);
        dispatch(index.setProgress(progressList));
      }else if(data[1]==='three'){
        doneList.splice(data[0], 1);
        let editDone = {
          'text' : editText,
          'moves' : [...z[data[0]].moves],
          'edits' : [...z[data[0]].edits, z[data[0]].text],
          'creation' : 'In Todo'
        }
        doneList.push(editDone);
        dispatch(index.setDone(doneList));
      }
      var modal = document.getElementById(id+'modal');
      modal.style.display = "none";
      setEditText('add text');
    }  
    const onClose = () =>{
      var modal = document.getElementById(id+'modal');
      modal.style.display = "none";
      setEditText('add text');
    }
    const closeView = () =>{
      var modal = document.getElementById(id+'view');
      modal.style.display = "none";
    }
    window.onclick = function(event) {
      var modal = document.getElementById(id+'modal');
      if (event.target === modal) {
        modal.style.display = "none";
      }
      setEditText('add text');
    }
  return (
    <div className="Task" id ={id+'task'} draggable="true">
      <div className='content'>
        <p className='mark' id ={id}>{item? item.text : 'no text'}</p>
      </div>
      <div className='options'>
      <button className='view' data-testid  onClick={onView}> view</button>
      <button className='edit' data-testid onClick={onEdit}> Edit</button>
      <button className='delete' data-testid  onClick={onDelete}> Delete</button>
      </div>
      <div id={id+'modal'} className="modal-edit"> 
          <div className="modal-content-edit">
          <label className="modal-element" htmlFor="usr">Edit Task</label>
          <input type="text" className="modal-element" value={editText} onChange={(e)=>setEditText(e.target.value)}></input>
          <div className='modal-element'>
          <button className='confirm' onClick={onConfirm}>Confirm</button>
          <button className='close' onClick={onClose}>Close</button>
          </div>
       </div>
    </div>
    <div id={id+'view'} className="modal-view"> 
          <div className="modal-content-view">
          <label className="modal-element" htmlFor="usr">Task History</label>
            <h4>Movements : {item ? item.moves.map(move => <p>{move}</p>):'no moves'}</h4>
            <h5>Edits : {item? item.edits.map(edit => <p>{edit}</p>):'no edits'}</h5>
            <h5>Creation : {item ? item.creation:'no creation'}</h5>
          <div className='modal-element'>
          <button className='close' onClick={closeView}>Close</button>
          </div>
       </div>
    </div>
    </div>
  );
}

