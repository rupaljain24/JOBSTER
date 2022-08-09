import React,{useState,useEffect} from 'react'
import Wrapper from '../assets/wrappers/RegisterPage'
import { FormRow, Logo } from '../components'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, registerUser } from '../features/user/userSlice'
import { useNavigate } from 'react-router-dom'

const Register = () => {

  const initialState={
    name:'',
    email:'',
    password:'',
    isMember:true
  }
  const {isLoading,user}=useSelector((store)=>store.user)
  console.log(initialState);
  const dispatch=useDispatch();
  const [users, setUsers] = useState(initialState);
  const navigate=useNavigate();

  const toggleMember=()=>{
    setUsers({...users,isMember:!users.isMember})
  }

  const handleChange=(e)=>{
      setUsers({...users,[e.target.name]:e.target.value})
      // console.log(e.target.value);
  }
   
  const onSubmit=(e)=>{
    e.preventDefault();
    const { name, email, password, isMember } = users;
    if (!email || !password || (!isMember && !name)) {
      toast.error('Please Fill Out All Fields');
      return;
    }
    if (isMember) {
      dispatch(loginUser({email,password}));
      return;
    }
    dispatch(registerUser({ name, email, password }));
    // console.log(user);
  }

  useEffect(() => {
    if(user){
      setTimeout(()=>{
        navigate('/')
      },2000)
    }
  }, [user])
  return (
    <Wrapper className='full-page'>
   
    <div>
      <form className='form' onSubmit={onSubmit}>
      <Logo/>
       <h3>{users.isMember ? 'Login' : 'Register'}</h3> 
      {
      !users.isMember &&  <FormRow type='text' 
      labelTxt='Name'
      name='name'
      value={users.name}
      handleChange={handleChange}
      />
     }
      <FormRow type='email' 
      labelTxt='E-mail'
      name='email'
      value={users.email}
      handleChange={handleChange}
      />
         <FormRow type='text' 
      labelTxt='Password'
      name='password'
      value={users.password}
      handleChange={handleChange}
      />
      <button type='submit' className='btn btn-block' disabled={isLoading}>
          {isLoading ? 'loading...' : 'submit'}
        </button>
        <button type='button' className='btn btn-block btn-hipster' disabled={isLoading}
        onClick={()=>{dispatch(loginUser({email:'testUser@test.com',password:'secret'}))}}
        >
          {isLoading ? 'loading...' : 'Demo'}
        </button>
        <p>
          {users.isMember ? 'Not a member yet?' : 'Already a member?'}
          <button type='button' onClick={toggleMember} className='member-btn'>
            {users.isMember ? 'Register' : 'Login'}
          </button>
        </p>
    </form>
      
    </div>
   

    </Wrapper>
  )
}

export default Register