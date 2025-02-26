import { createSlice } from '@reduxjs/toolkit'

const TeamSlicer = createSlice({
  name: 'Team',
  initialState: {
    data: [],
    isAuth: false,
    isPending: false,
    isError: ''
  },
  reducers: {
    getTeamPending (state) {
      state.isPending = true
      state.isError = ''
    },
    getTeamSuccess (state, { payload }) {
      state.isAuth = true
      state.data = payload
      state.isPending = false
    },
    getTeamError (state, { payload }) {
      state.isPending = false
      state.isError = payload
    }
  }
})

export const { getTeamError, getTeamPending, getTeamSuccess } =
  TeamSlicer.actions
export default TeamSlicer.reducer
