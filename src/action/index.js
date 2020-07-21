const setTodo = todoList => ({ 
        type: 'SET_TODO',
        value :todoList
})
const setProgress = progressList => ({ 
        type: 'SET_PROGRESS',
        value :progressList
})
const setDone = doneList => ({ 
        type: 'SET_DONE',
        value :doneList
});

export default{
        setTodo,
        setProgress,
        setDone,
    }