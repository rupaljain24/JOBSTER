import React from 'react'
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi';
import Wrapper from '../assets/wrappers/PageBtnContainer';
import { useSelector, useDispatch } from 'react-redux';
import { changePage } from '../features/allJobs/allJobSlice';

const PageContainer = () => {
    const{numOfPages,page}=useSelector((store)=>store.allJobs)
    const dispatch=useDispatch();

    const pages=Array.from({length:numOfPages},(_,index)=>{
        return index+1
    })
    console.log(pages)
    const prevPage=()=>{
        let newPage = page - 1;
        if(newPage<1){
            newPage=numOfPages
        }
        dispatch(changePage(newPage))
    }
    const nextPage=()=>{
        let newPage = page + 1;
        if(newPage>numOfPages){
            newPage=1;
        }
        dispatch(changePage(newPage))
    }
  return (
    <Wrapper>
    <button className='prev-btn' onClick={prevPage}>
      <HiChevronDoubleLeft />
      prev
    </button>
    <div className='btn-container'>
    {
        pages.map((item)=>{
            return <button type='button' key={item} className={item === page ? 'pageBtn active' : 'pageBtn'}
            onClick={()=>dispatch(changePage(item))}
            >{item}</button>
        })
    }
    </div>
    <button className='next-btn' onClick={nextPage}>
      next
      <HiChevronDoubleRight />
    </button>
  </Wrapper>
  )
}

export default PageContainer