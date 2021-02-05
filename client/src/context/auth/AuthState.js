import React, {useReducer} from 'react';
import axios from 'axios'
import AuthContext from './authContext';
import authReducer from './authReducer';
import setAuthToken from '../../utils/setAuthToken'
import { 
   REGISTER_SUCCESS,
   REGISTER_FAIL,
   LOGIN_SUCCESS,
   LOGIN_FAIL,
   LOGOUT,
   USER_LOADED,
   AUTH_ERROR,
   CLEAR_ERRORS
} from '../types'

const AuthState = props =>{
   const initialState = {
      token: localStorage.getItem('token'),
      isAuthenticated: null,
      user: null,
      loading: true,
      error: null

   }
   
   const [state, dispatch] = useReducer(authReducer, initialState);

   //load user
   const loadUser = async () =>{
      //This call the function setAuthToken to create a header named x-auth-token
         setAuthToken(localStorage.token);
      try {
         const res = await axios.get('api/auth');
         dispatch({
            type: USER_LOADED,
            payload: res.data
         });
      } catch (error) {
         dispatch({
            type: AUTH_ERROR
         });
      }
   }
   //Register User
   const register = async formData => {
      const config = {
         headers: {
            'Content-Type': 'application/json'
         }
      }
      try {
         const res = await axios.post('api/users',formData,config);
         dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
         });
         loadUser();
      } catch (error) {
         dispatch({
            type: REGISTER_FAIL,
            payload: error.response.data.msg
         });
      }
   }
   //Login User
   const login =  async (user) =>{
      const config = {
         headers: {
            'Content-Type': 'application/json'
         }
      }
      try {
         const res = await axios.post('api/auth',user,config);
         dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
         })
      } catch (error) {
         dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.msg
         })
      }
   }
   //Log out
   const logout = () =>{
      dispatch({type:LOGOUT});
   }

   //Clear Errors
   const clearErrors = () =>{
      dispatch({type:CLEAR_ERRORS});
   }
  
   return (
      <AuthContext.Provider
         value= {{
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            user: state.user,
            loading: state.loading,
            error: state.error,
            register,
            loadUser,
            login,
            logout,
            clearErrors
         }}
      >
       {props.children}
      </AuthContext.Provider>
   )

}

export default AuthState