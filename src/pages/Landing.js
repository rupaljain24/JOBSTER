import React from 'react'
import main from '../assets/images/main.svg'
import styled from 'styled-components'
import {Logo} from '../components' 
import { Link } from 'react-router-dom'

const Landing = () => {
  return (
    <Wrapper>
        <nav>
           <Logo/>
        </nav>
        <div className="container page">
        <div className="info">
            <h1>JOB <span>Tracking</span> App</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quasi quaerat itaque eveniet cum molestias debitis repellendus dolores aliquid cumque sit.</p>
            <Link to='/register'><button className='btn btn-hero' >Login/Register</button></Link>
        </div>
        <img src={main} className='img main-img' alt="people"/>
        </div>
    </Wrapper>
  )
}

const Wrapper=styled.main`
nav{
    width:var(--fluid-width);
    margin:0 10rem;
    max-width:var(--max-width);
    height:var(--nav-height);
    display:flex;
    align-items:center; 
}
.info{
    margin-left:-3rem;
}
.page{
    display:grid;
    min-height: calc(100vh - var(--nav-height));
    align-items: center;
    margin-top: -3rem;
}
h1{
    font-weight: 700;
    span{
        color: var(--primary-500);
    }
}
.main-img{
    display: none;
}
@media(min-width: 992px){
    .main-img{
        display: block;
    }
    .page{
        grid-template-columns: 1fr 1fr;
        column-gap: 3rem;
    }
}

`

export default Landing