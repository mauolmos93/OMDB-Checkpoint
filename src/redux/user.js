import { createAction, createReducer } from "@reduxjs/toolkit";

//---------------------------------------------------------------------------//

// Action
const setUser = createAction("SET_USER")

// Reducer
const initialState = {
  isLoggedIn: !!localStorage.getItem('userToken'),
  id: null,
  name: null,
  email: null,
  token: localStorage.getItem('userToken'),
}

const userReducer = createReducer(initialState, {
  [setUser] : (state, action) => action.payload
})

//---------------------------------------------------------------------------//


export { setUser, userReducer }

