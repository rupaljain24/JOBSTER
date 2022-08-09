import { useState } from 'react';
import { FormRow } from '../../components';
import Wrapper from '../../assets/wrappers/DashboardFormPage';
import { updateUser } from '../../features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const Profile = () => {
  const {isLoading,user}=useSelector((store)=>store.user)
  const dispatch=useDispatch()
  const[userData,setUserData]=useState({
    name:user.name || '',
    email:user.email || '',
    lastName:user.lastName || '',
    location:user.location || '',
  })

  const handleSubmit=(e)=>{
    // const { name, email, lastName, location } = userData;
    e.preventDefault()
    if(!userData.name || !userData.email || !userData.lastName || !userData.location){
      toast.error("Please Fill out the empty fields")
    }
    dispatch(updateUser(userData))
  }

  const handleChange=(e)=>{
    setUserData({...userData,[e.target.name]:e.target.value})
    // console.log(e.target.value);
}
  return (
    <Wrapper>
    <h3>Profile</h3>
    <form className='form' onSubmit={handleSubmit}>
    <div className="form-center">
    <FormRow
      type='text'
      name='name'
      value={userData.name}
      labelTxt='Name'
      handleChange={handleChange}
    />
    <FormRow
      type='email'
      name='email'
      value={userData.email}
      labelTxt='E-mail'
      handleChange={handleChange}
    />
      <FormRow
      type='text'
      name='lastName'
      value={userData.lastName}
      labelTxt='lastName'
      handleChange={handleChange}
    />
      <FormRow
      type='text'
      name='location'
      value={userData.location}
      labelTxt='Location'
      handleChange={handleChange}
    />
    <button className="btn btn-block" disabled={isLoading}>
      {
        isLoading?"Please wait":"Save Changes"
      }
    </button>

    </div>
    </form>
    </Wrapper>
  )
}

export default Profile