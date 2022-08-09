import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Wrapper from '../assets/wrappers/JobsContainer'
import { getAllJobs } from '../features/allJobs/allJobSlice'
import Jobs from './Jobs'
import PageContainer from './PageContainer'

const JobContainer = () => {
    const dispatch =useDispatch()
    const {isLoading,jobs,numOfPages,totalJobs,page}=useSelector((store)=>store.allJobs)

    useEffect(()=>{
        dispatch(getAllJobs())
    },[])

    if(isLoading){
        return <Wrapper>Loading..</Wrapper>
    }
    if(jobs.length === 0){
        return <Wrapper>NO JOBS TO DISPLAY..</Wrapper>
    }
  return (
    <Wrapper>
    <h5>{totalJobs} Jobs found..</h5>
       <div className="jobs">
           {
               jobs.map((item)=>{
                   return <Jobs key={item._id} {...item}/>
               })
           }
       </div>
       {
        numOfPages >1 && <PageContainer/>
       }
    </Wrapper>
  )
}

export default JobContainer