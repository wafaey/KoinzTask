import React from 'react'
import { render } from '@testing-library/react'
import Task from './Task'

import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
  const initialState = {
    todoList: [],
    progressList: [],
    doneList: [],
  };
      const mockStore = configureStore()
      let store,wrapper
       it('render without crashing', () => {
      store = mockStore(initialState)
      const { getByTestId } = render(<Provider store={store}><Task /></Provider>)
        });



//       it('should match the snapshot', () => {
//         store = mockStore(initialState)
//         const { getByTestId } = render(<Provider store={store}><Task /></Provider>)
//         expect(getByText('Drag and Drop')).not.toBeNull()
//         expect(wrapper.html()).toMatchSnapshot();
//       });
//       it('should have an Edit button', () => {
//         expect(wrapper.find('edit')).toEqual(1);
//       });
//       it('should have an Delete button', () => {
//         expect(wrapper.find('delete')).toEqual(1);
//       });
//       it('should have an text area', () => {
//         expect(wrapper.find('mark')).toEqual(1);
//       });
//   it('Shows "Drag and Drop"', () => {
//     store = mockStore(initialState)
//     const { getByText } = render(<Provider store={store}><Task /></Provider>)

//     expect(getByText('Drag and Drop')).not.toBeNull()
//   })
// })