import React from 'react'
import links from '../utils/links'
import { NavLink } from 'react-router-dom';


const NavLinks = ({toggleSidebar}) => {
  return (
    <div className='nav-links'>
    {
      links.map((item)=>{
        return <NavLink to={item.path} key={item.id} 
        onClick={toggleSidebar}
        className={({isActive})=>isActive ? 'nav-link active' : 'nav-link'  }
         >
        <span className='icon'>{item.icon}</span>
        {item.text}
        </NavLink> 
        })
    }
   </div>
  )
}

export default NavLinks