import rootUrl from "../../utils/axios";
import { clearValues } from "./jobSlice";
import { hideLoading, showLoading,getAllJobs } from "../allJobs/allJobSlice";

export const createJobThunk= async (job, thunkAPI) => {
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
export const deleteJobThunk=async(jobId,thunkAPI)=>{
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
export const editJobThunk=async({job,jobId},thunkAPI)=>{
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
