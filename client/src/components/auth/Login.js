import React, {useState,useContext,useEffect}  from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import AlertContext from '../../context/alert/alertContext'
import AuthContext from '../../context/auth/authContext'

const Login = (props) => {   

   const alertContext = useContext(AlertContext);
   const {setAlert} = alertContext;

   const authContext = useContext(AuthContext);
   const {login, error, clearErrors, isAuthenticated} = authContext;

   useEffect(() => {
      if(isAuthenticated){
         props.history.push('/');
      }
      if(error === 'Invalid Credentials'){
         setAlert(error,'danger');
         clearErrors();
      }
      //eslint-disable-next-line
   }, [error, isAuthenticated,props.history]);

  /* const [user, setUser] = useState({
      email: '',
      password: ''
   });
   
   const { email, password} = user;

   const onChange = e =>{
      setUser({...user , [e.target.name] : e.target.value});
   }
   
   const onSubmit = (e) =>{
      e.preventDefault();
      if(email === '' || password === ''){
         setAlert('Please fill all the fields.','danger');
      }else{
         login(user);
      }
   }*/
   
   const formik = useFormik({
      initialValues: {
        email: '',
        password:''
      },
      validationSchema: Yup.object({
         email: Yup.string()
         .email('Invalid email address')
         .required('Required'),
       password: Yup.string()
          .min(6,'Password should be at least 6 characteres')
          .required('Required'),
      }),
      onSubmit: values => {
        login(values)
      },
    });

   return (
      <div className='form-container'>
         <h1>
           Account <span className="text-primary"> Login</span>
         </h1>
         <form onSubmit={formik.handleSubmit}>
            <div className="form-group">
               <label htmlFor='email'>Email</label>
               <input id='email' name='email' type='email' onChange={formik.handleChange} value={formik.values.email} />
               {
               formik.touched.email && formik.errors.email ? (<div>{formik.errors.email}</div>) : null
               }
            </div>
            <div className="form-group">
               <label htmlFor='password'>Password</label>
               <input id='password' name='password' type='password' onChange={formik.handleChange} value={formik.values.password} error={formik.errors.password}/>
               {
               formik.touched.password && formik.errors.password ? (<div>{formik.errors.password}</div>) : null
               }
            </div>
            <input type='submit' value='Login' className='btn btn-primary btn-block'/>
         </form>
      </div>

   )
}

export default Login
