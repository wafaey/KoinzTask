
const initialState = {
    todoList: [],
    progressList: [],
    doneList: [],
  };
const rootReducer= (state = initialState, action)=>{
    // eslint-disable-next-line default-case
    switch(action.type){
        case 'SET_TODO' :
        return Object.assign({}, state,{todoList: action.value});
        //return { ...state,todoList: action.value }
        case 'SET_PROGRESS' :
        return Object.assign({}, state,{progressList: action.value});
        case 'SET_DONE' :
        return Object.assign({}, state,{doneList: action.value});
        default:
        return state;
    }
} 
export default rootReducer; 
