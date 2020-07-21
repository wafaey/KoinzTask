import React from 'react'
import { render, cleanup } from '@testing-library/react'
import Task from './Task'

import { Provider } from 'react-redux'
import configureStore from 'redux-mock-store'
import '@testing-library/jest-dom'
afterEach(cleanup);
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
      it('should have a view button', () => {
      const { getByTestId } = render(<button className='view'>View</button>)
      expect(getByTestId("button-view")).toHaveTextContent('View');
       // expect(wrapper.find('edit')).toEqual(1);
      });
      it('should have an edit button', () => {
        const { getByTestId } = render(<button>Edit</button>)
        expect(getByTestId("button-edit")).toHaveTextContent('Edit');
        // expect(wrapper.find('edit')).toEqual(1);
      });
      it('should have a delete button', () => {
        const { getByTestId } = render(<button>Delete</button>)
        expect(getByTestId("button-delete")).toHaveTextContent('Delete');

        //expect(wrapper.find('edit')).toEqual(1);
      });
