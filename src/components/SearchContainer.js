import React from 'react'
import {FormRow,FormRowSelect} from './index'
import Wrapper from '../assets/wrappers/SearchContainer';
import { useSelector, useDispatch } from 'react-redux';
import { clearFilter, handleChange } from '../features/allJobs/allJobSlice';

const SearchContainer = () => {
  const{isLoading,search,searchStatus,type,sort,sortOptions}=useSelector((store)=>store.allJobs)
  const {jobTypeOptions,statusOptions}=useSelector((store)=>store.job)
  const dispatch=useDispatch();
  const handleSearch=(e)=>{
    dispatch(handleChange({name:e.target.name,value:e.target.value}))
  }
  const handleSubmit=(e)=>{
    dispatch(clearFilter());
    e.preventDefault();
  }
  return (
    <Wrapper>
    <form className="form">
    <h4>Search Jobs</h4>
    <div className="form-center">
      <FormRow name="search" type="text" value={search} labelTxt="Search" handleChange={handleSearch}/>
      <FormRowSelect name="searchStatus" value={searchStatus} labelText="Status" handleChange={handleSearch} list={['all',...statusOptions]}/>
      <FormRowSelect name="type" value={type} labelText="Type" handleChange={handleSearch} list={["all",...jobTypeOptions]}/>
      <FormRowSelect name="sort" value={sort} labelText="Sort" handleChange={handleSearch} list={sortOptions}/>
      <button
            className='btn btn-block btn-danger'
            disabled={isLoading}
            onClick={handleSubmit}
          >
            clear filters
          </button>
    </div>
    </form>
    </Wrapper>
  )
}

export default SearchContainer