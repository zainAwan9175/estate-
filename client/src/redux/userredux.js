import { createSlice } from '@reduxjs/toolkit'



const initialState={
    currentuser:null,
    active:"home"
}


export const userslice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updatecurrentuser:(state,actions)=>{
        state.currentuser=actions.payload;
    },
    updateactive:(state,actions)=>{
     state.active=actions.payload;
    }

 
    
    },
})


export const {updatecurrentuser,updateactive} = userslice.actions

export default userslice.reducer