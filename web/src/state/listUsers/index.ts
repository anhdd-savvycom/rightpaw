/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../../app/store';
import fetchUsers from './fetchUsers';
interface UsersState {
  users: User[],
  isLoading: boolean,
  totalPages: number
};

enum EState {
  VIC = "VIC",
  NSW = "NSW",
  ACT = "ACT",
  QLD = "QLD",
}
export interface User {
  uuid: number,
  firstName: string,
  lastName: string,
  email: string,
  state: EState,
  petExp: string,
};

const initialState: UsersState = {
  users: [],
  isLoading: false,
  totalPages: 0
}

export const usersSlice = createSlice({
  name: 'Users',
  initialState,
  reducers: {
    setUsersData: (state, action) => {
      const { arrayOfUserDataObjects } = action.payload;
      state.users = arrayOfUserDataObjects;
    },
    setTotalPages: (state, action) => {
      const { totalPages } = action.payload;
      state.totalPages = totalPages;
    },
  },
})

// Actions
export const { setUsersData,setTotalPages } = usersSlice.actions
// selectors
export const users = (state: RootState) => state.users.users;
export const totalPages=(state:RootState)=>state.users.totalPages

// Thunks
export const fetchUsersDataAsync = (state: string, exp: string, name: string, email: string, limit: number, offset: number) => async (dispatch: any) => {

  const res = await fetchUsers(state, exp, name, email, limit, offset)
  const arrayOfUserDataObjects = res.items
  const totalPages=res.pagination.totalPage
  dispatch(setUsersData({ arrayOfUserDataObjects }))
  dispatch(setTotalPages({ totalPages}))
}

export default usersSlice.reducer
