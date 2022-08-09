import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import rootUrl from "../../utils/axios";
import {toast} from 'react-toastify'

const filterInitialState = {
    search: '',
    searchStatus: 'all',
    type: 'all',
    sort: 'latest',
    sortOptions: ['latest', 'oldest', 'a-z', 'z-a'],

}

const initialState = {
    isLoading: false,
    jobs: [],
    page: 1,
    numOfPages: 1,
    totalJobs: 0,
    monthlyApplications: [],
    defaultStats: {},
    ...filterInitialState
}

// export const showStats = createAsyncThunk(
//     'allJobs/showStats',
//     async (_, thunkAPI) => {
//       try {
//         const resp = await rootUrl.get('/jobs/stats');
//         console.log(resp);
//         return resp.data;
//       } catch (error) {
//         return thunkAPI.rejectWithValue(error.response.data.msg);
//       }
//     }
//   );


export const showStats=createAsyncThunk('allJobs/showStats',
async(_,thunkAPI)=>{
    try {
        console.log('inside try')
        const response=await rootUrl('/jobs/stats', {
            headers: {
                authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
            }},)
        console.log(response);
        console.log(response.data);
        return response.data;
        
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg)
    }
})

export const getAllJobs = createAsyncThunk(
    'allJobs/getJobs',
    async (_, thunkAPI) => {
        try {
            const response = await rootUrl('/jobs', {
                headers: {
                    authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
                },
            })
            console.log(response.data);
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data.msg)
        }
    })

const allJobSlice = createSlice({
    name: 'allJobs',
    initialState,
    reducers: {
        showLoading: (state) => {
            state.isLoading = true;
          },
          hideLoading: (state) => {
            state.isLoading = false;
          },
          clearFilter:(state)=>{
           return{...state,...filterInitialState}
          },
          handleChange:(state,{payload})=>{
              state[payload.name]=payload.value;
            //   console.log("Handle" ,payload);
          },
          changePage:(state,{payload})=>{
              state.page=payload;
          }
    },
    extraReducers: {
        [getAllJobs.pending]: (state) => {
            state.isLoading = true;
        },
        [getAllJobs.fulfilled]: (state,{payload}) => {
            state.isLoading = false;
            state.jobs=payload.jobs;
            state.numOfPages=payload.numOfPages;
            state.totalJobs=payload.totalJobs;
        },

        [getAllJobs.rejected]: (state,{payload}) => {
            state.isLoading = false;
            toast.error(payload)
            
        },
        [showStats.pending]: (state) => {
            state.isLoading = true;
        },
        [showStats.fulfilled]: (state,{payload}) => {
            state.isLoading = false;
            state.defaultStats=payload.defaultStats;
            state.monthlyApplications=payload.monthlyApplications;
        },

        [showStats.rejected]: (state,{payload}) => {
            state.isLoading = false;
            toast.error(payload)
            
        }

    },
}
)
 export const{showLoading,hideLoading,clearFilter,handleChange,changePage}=allJobSlice.actions;
export default allJobSlice.reducer