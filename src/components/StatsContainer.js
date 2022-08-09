import React from 'react'
import Wrapper from '../assets/wrappers/StatsContainer'
import { FaSuitcaseRolling, FaCalendarCheck, FaBug } from 'react-icons/fa';
import StatsItem from './StatsItem';
import { useSelector } from 'react-redux';


const StatsContainer = () => {
   const { defaultStats } = useSelector((store) => store.allJobs);
    // console.log(stats);
    const data=[
        {
            title: 'pending applications',
            count: defaultStats?.pending || 0,
            icon: <FaSuitcaseRolling />,
            color: '#e9b949',
            bcg: '#fcefc7',
          },
          {
            title: 'interviews scheduled',
            count: defaultStats?.interview || 0,
            icon: <FaCalendarCheck />,
            color: '#647acb',
            bcg: '#e0e8f9',
          },
          {
            title: 'jobs declined',
            count: defaultStats?.declined || 0,
            icon: <FaBug />,
            color: '#d66a6a',
            bcg: '#ffeeee',
          },

    ]
  return (
      <Wrapper>
    {data.map(item=>{return <StatsItem key={item.title} {...item}/>})}
      </Wrapper>
  )
}

export default StatsContainer