import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import rootUrl from '../../utils/axios';
import { addUserToLocalStorage, getUserFromLocalStorage, removeUserFromLocalStorage } from '../../utils/localStorage';

const initialState = {
  isLoading: false,
  user: getUserFromLocalStorage(),
  isSidebarOpen:false,
};
export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (user, thunkAPI) => {
      try {
        const resp = await rootUrl.post('/auth/login', user);
        return resp.data;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
      }
    })

export const updateUser=createAsyncThunk(
  'user/updateUser',
  async (user, thunkAPI) => {
    try {
      console.log("inside try");
      const resp = await rootUrl.patch('/auth/updateUser', user, {
        headers: {
          authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
      });
      return resp.data;
    } catch (error) {
      console.log(error.response);
      return thunkAPI.rejectWithValue(error.response.data.msg);
    }
  }
);
  
export const registerUser=createAsyncThunk(
    'user/registerUser',
    async(user,thunkAPI)=>{
        try {
            const response=await rootUrl.post('/auth/register',user)
            return response.data
            
            // console.log(response);
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.msg)
            // console.log(error.response);
        }
        // console.log(`register: ${JSON.stringify(user)}`)
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
      toggleSidebar:(state)=>{
        state.isSidebarOpen=!state.isSidebarOpen
      },
      logoutUser: (state,{payload}) => {
        state.user = null;
        state.isSidebarOpen = false;
        removeUserFromLocalStorage();
        toast.success(payload)
      },
    },
    extraReducers:{
        [registerUser.pending]:(state)=>{
            state.isLoading=true;
        },
      
        [registerUser.fulfilled]:(state,{payload})=>{
            const {user}=payload
          state.isLoading=false;
          state.user=user;
          addUserToLocalStorage(user)
          toast.success(`hello ${user.name}`)
      },
  
      [registerUser.rejected]:(state,action)=>{
          state.isLoading=false;
          toast.error(action.payload)
      },
      //For login
      [loginUser.pending]: (state) => {
        state.isLoading = true;
      },
      [loginUser.fulfilled]: (state, { payload }) => {
        const { user } = payload;
        state.isLoading = false;
        state.user = user;
        addUserToLocalStorage(user)
        toast.success(`Welcome Back ${user.name}`);
      },
      [loginUser.rejected]: (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      },
      //UpdateUser
      [updateUser.pending]:(state)=>{
        state.isLoading=true;
      }
      ,
      [updateUser.fulfilled]: (state, { payload }) => {
        const { user } = payload;
        state.isLoading = false;
        state.user = user;
        addUserToLocalStorage(user)
        toast.success(`User Updated`);
      },
      [updateUser.rejected]: (state, { payload }) => {
        state.isLoading = false;
        toast.error(payload);
      },
  }
  });
  

export const {toggleSidebar,logoutUser} =userSlice.actions;
export default userSlice.reducer;