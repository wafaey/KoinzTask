import React from 'react'
import { render } from '@testing-library/react'
import DragDrop from './DragDrop'

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
      const { getByTestId } = render(<Provider store={store}><DragDrop /></Provider>)
        });
