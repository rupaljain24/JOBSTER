import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import rootUrl from "../../utils/axios";
import { toast } from "react-toastify";
import { logoutUser } from "../user/userSlice";
import { getUserFromLocalStorage } from "../../utils/localStorage";
import { hideLoading, showLoading,getAllJobs } from "../allJobs/allJobSlice";


const initialState = {
    isLoading: false,
    position: '',
    company: '',
    jobLocation: '',
    jobType: 'full-time',
    jobTypeOptions: ['full-time', 'part-time', 'remote', 'internship'],
    status: 'pending',
    statusOptions: ['interview', 'declined', 'pending'],
    isEditing: false,
    editJobId: '',
}

export const editJob=createAsyncThunk('job/editJob',
async({job,jobId},thunkAPI)=>{
    try {
    const resp=await rootUrl.patch(`/jobs/${jobId}`,job,{
        headers: {
            authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
    })
    thunkAPI.dispatch(clearValues());
    return resp.data;
        
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);   
    }
}
)



export const deleteJob=createAsyncThunk('job/deleteJob',
async(jobId,thunkAPI)=>{
    try {
        thunkAPI.dispatch(showLoading())
    const resp=await rootUrl.delete(`/jobs/${jobId}`,{
        headers: {
            authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
        },
    })
    thunkAPI.dispatch(getAllJobs())
    return resp.data;
        
    } catch (error) {
        thunkAPI.dispatch(hideLoading());
        return thunkAPI.rejectWithValue(error.response.data.msg);   
    }
    
}
)

export const createJob = createAsyncThunk('job/createJob',
    async (job, thunkAPI) => {
        try {
            const resp = await rootUrl.post('/jobs', job, {
                headers: {
                    authorization: `Bearer ${thunkAPI.getState().user.user.token}`,
                },
            });
            thunkAPI.dispatch(clearValues());
            return resp.data;
        } catch (error) {
            // basic setup
            // if (error.response.status === 401) {
            //     thunkAPI.dispatch(logoutUser())
            //     return thunkAPI.rejectWithValue('Unauthorized !')
            // }
            return thunkAPI.rejectWithValue(error.response.data.msg);
        }
    }
)

const jobSlice = createSlice({
    name: 'job',
    initialState,
    reducers: {
        handleChanger: (state, { payload: { name, value } }) => {
            state[name] = value;
        },
        clearValues: () => {
            return {...initialState,
            jobLocation:getUserFromLocalStorage()?.location || ''
            }
        },
        setEditJob: (state, { payload }) => {
            return { ...state, isEditing: true, ...payload };
            },
    },
    extraReducers: {
        [createJob.pending]: (state) => {
            state.isLoading = true;
        },
        [createJob.fulfilled]: (state, action) => {
            state.isLoading = false;
            toast.success('Job Created');
        },
        [createJob.rejected]: (state, { payload }) => {
            state.isLoading = false;
            toast.error(payload);
        },
        [deleteJob.fulfilled]: (state, action) => {
            state.isLoading = false;
            toast.success('Job deleted');
        },
        [createJob.rejected]: (state, { payload }) => {
            state.isLoading = false;
            toast.error(payload);
        },
        [editJob.pending]: (state) => {
            state.isLoading = true;
        },
        [editJob.fulfilled]: (state) => {
            state.isLoading = false;
            toast.success("Job Updated..");
        },
        [editJob.rejected]: (state,{payload}) => {
            state.isLoading = false;
            toast.error(payload);
        },
       
       
    }
})
export const { handleChanger, clearValues,setEditJob } = jobSlice.actions
export default jobSlice.reducer;