import { createSlice } from '@reduxjs/toolkit'

const MapSlicer = createSlice({
  name: 'Map',
  initialState: {
    data: [],
    isPending: false,
    isError: ''
  },
  reducers: {
    getMapPending (state) {
      state.isPending = true
      state.isError = ''
    },
    getMapSuccess (state, { payload }) {
      state.data = payload
      state.isPending = false
    },
    getMapError (state, { payload }) {
      state.isPending = false
      state.isError = payload
    }
  }
})

export const { getMapError, getMapPending, getMapSuccess } = MapSlicer.actions
export default MapSlicer.reducer
