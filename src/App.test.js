import React from 'react'
import { render } from '@testing-library/react'

import App from './App'

import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'



describe('With React Testing Library', () => {
  const initialState = {
    todoList: [],
    progressList: [],
    doneList: [],
  };
  const mockStore = configureStore()
  let store,wrapper

  it('Shows "Drag and Drop"', () => {
    store = mockStore(initialState)
    const { getByText } = render(<Provider store={store}><App /></Provider>)

    expect(getByText('Drag and Drop')).not.toBeNull()
  })
})