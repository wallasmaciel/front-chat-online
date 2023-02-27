import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface User {
  id: string, 
  name: string,
  email: string,
  url_picture?: string | null,
}
export const userSlice = createSlice({
  name: 'user',
  initialState: {
    value: undefined as User | undefined
  },
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.value = action.payload
    }
  }
})

export const { login } = userSlice.actions
export default userSlice.reducer