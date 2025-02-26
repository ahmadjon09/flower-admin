import { createSlice } from '@reduxjs/toolkit'

const CarouselSlicer = createSlice({
  name: 'Carousel',
  initialState: {
    data: [],
    isAuth: false,
    isPending: false,
    isError: ''
  },
  reducers: {
    getCarouselPending (state) {
      state.isPending = true
      state.isError = ''
    },
    getCarouselSuccess (state, { payload }) {
      state.isAuth = true
      state.data = payload
      state.isPending = false
    },
    getCarouselError (state, { payload }) {
      state.isPending = false
      state.isError = payload
    }
  }
})

export const { getCarouselError, getCarouselPending, getCarouselSuccess } =
  CarouselSlicer.actions
export default CarouselSlicer.reducer
