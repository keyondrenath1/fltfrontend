import { configureStore } from '@reduxjs/toolkit'
import bootstrapReducer from './slices/bootstrap'

export default configureStore({
  reducer: {
      bootstrap: bootstrapReducer,
  }
})