import React,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {ChartContainer,StatsContainer} from '../../components';
import { showStats } from '../../features/allJobs/allJobSlice';

const Stats = () => {
  const {isLoading}=useSelector((store)=>store.allJobs)
  // console.log(stats);
  const dispatch=useDispatch();
  
  
  useEffect(() => {
    dispatch(showStats());
    
  }, [])
  if(isLoading){
    return<h2>Loading..</h2>
  }
  return (
    <>
      <StatsContainer />
     <ChartContainer />
    </>
  );
}

export default Stats