import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import cookieUtils from '../../utils/cookie..util'
import { addHours } from '../../utils/date.util';

const cookieNameSession = 'user-session';
export interface User {
  id: string, 
  name: string,
  email: string,
  url_picture?: string | null,
}
export const userSlice = createSlice({
  name: 'user',
  initialState: {
    value: cookieUtils.get<User>(cookieNameSession)
  },
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      try {
        cookieUtils.set(cookieNameSession, action.payload, {
          path: '/',
          expires: addHours(new Date(), 1),
        })
        state.value = action.payload
      } catch (err) {
        console.error('login error:', err)
      }
    }
  }
})

export const { login } = userSlice.actions
export default userSlice.reducer