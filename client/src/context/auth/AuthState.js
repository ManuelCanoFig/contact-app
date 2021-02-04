import React, {useReducer} from 'react';
import axios from 'axios'
import AuthContext from './authContext';
import authReducer from './authReducer';
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
      } catch (error) {
         dispatch({
            type: REGISTER_FAIL,
            payload: error.response.data.msg
         });
      }
   }
   //Login User
   //Log out
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
            clearErrors
         }}
      >
       {props.children}
      </AuthContext.Provider>
   )

}

export default AuthState