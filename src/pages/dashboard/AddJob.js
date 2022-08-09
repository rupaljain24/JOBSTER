import React,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Wrapper from '../../assets/wrappers/DashboardFormPage'
import { FormRow } from '../../components'
import FormRowSelect from '../../components/FormRowSelect'
import { clearValues,createJob,editJob,handleChanger } from '../../features/job/jobSlice'

const AddJob = () => {
  const{isLoading,position,company,jobLocation,jobType,jobTypeOptions,
    status,
    statusOptions,
    isEditing,
    editJobId,}=useSelector((store)=>store.job)

    const {user}=useSelector((store)=>store.user)

    const dispatch=useDispatch();

    const handleChange=(e)=>{
      const name = e.target.name;
      const value = e.target.value;
      dispatch(handleChanger({ name, value }));
        // console.log(e.target.name,e.target.value);
    }
    const handleSubmit=(e)=>{
      e.preventDefault()
      if(!position||!company||!jobLocation){
        toast.error("Please Fill out the empty fields");
      }
      if(isEditing){
        dispatch(editJob({ jobId: editJobId,
          job: {
            position,
            company,
            jobLocation,
            jobType,
            status,
          },}))
      }
      else{
        dispatch(createJob({ position, company, jobLocation, jobType, status }));
      }
      
    }
    useEffect(() => {
      // eventually will check for isEditing
      if (!isEditing) {
        dispatch(handleChanger({ name: 'jobLocation', value: user.location }));
      }
    }, []);


  return (
 <Wrapper>
 <form action="" className="form" >
 <h3>{isEditing?'Edit Job':'Add Job'}</h3>
 <div className="form-center">
 <FormRow type="text" name='position' labelTxt='Position' value={position} handleChange={handleChange}/>
 <FormRow type="text" name='company' labelTxt='company' value={company} handleChange={handleChange}
 />
 <FormRow type="text" name='jobLocation' labelTxt='Job Location' value={jobLocation} handleChange={handleChange}/>
 <FormRowSelect labelText='Status' name='status' value={status} handleChange={handleChange} list={statusOptions} />
 <FormRowSelect labelText='Job Type' name='jobType' value={jobType} handleChange={handleChange} list={jobTypeOptions}/>
 <div className="btn-container">
   <button className="btn btn-block clear-btn" onClick={()=>dispatch(clearValues)}>Clear</button>
   <button className="btn btn-block submit-btn" onClick={handleSubmit}
   disabled={isLoading}
   >Submit</button>
 </div>

 </div>
 </form>
 </Wrapper>
  )
}

export default AddJob