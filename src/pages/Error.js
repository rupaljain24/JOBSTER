import React from 'react'
import { Link } from 'react-router-dom'
import error from '../assets/images/not-found.svg'
import Wrapper from '../assets/wrappers/ErrorPage'

const Error = () => {
  return (
    <Wrapper>
    <div>
      <img src={error} alt="Page Not Found" />
      <h3>Ohh! Page Not Found</h3>
      <p>We can't seem to find the page you're looking for</p>
      <Link to='/landing'>Back to home</Link>
    </div>
    </Wrapper>
  )
}

export default Error