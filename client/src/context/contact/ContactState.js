import React, {useReducer} from 'react';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import axios from 'axios'
import { 
   GET_CONTACTS,
   ADD_CONTACT,
   CONTACT_ERROR,
   DELETE_CONTACT,
   SET_CURRENT,
   CLEAR_CURRENT,
   UPDATE_CONTACT,
   FILTER_CONTACTS,
   CLEAR_FILTER,
   CLEAR_CONTACTS
} from '../types'

const ContactState = props =>{
   const initialState = {
      contacts: null,
      current: null,
      filtered: null,
      error: null
   }
   
   const [state, dispatch] = useReducer(contactReducer, initialState);

   //Get Contacts.
   const getContacts = async () => {
      try {
         const res = await axios.get('api/contacts');
         dispatch({type: GET_CONTACTS, payload: res.data});
      } catch (error) {
         dispatch({
            type: CONTACT_ERROR,
            payload: error.response.msg
         });
      }
   }

   //Add Contact
   const addContact = async (contact) =>{
      const config ={
         headers: {
            'Content-Type': 'application/json'
         }
      }

      try {
         const res = await axios.post('api/contacts',contact,config);
         dispatch({type: ADD_CONTACT, payload: res.data});
      } catch (error) {
         dispatch({
            type: CONTACT_ERROR,
            payload: error.response.msg
         });
      }
   }
   
   //Update Contact
   const updateContact = async (contact) =>{

      const config ={
         headers: {
            'Content-Type': 'application/json'
         }
      }

      try {
         const res = await axios.put(`api/contacts/${contact._id}`,contact,config);
         dispatch({type: UPDATE_CONTACT, payload: res.data});
      } catch (error) {
         dispatch({
            type: CONTACT_ERROR,
            payload: error.response.msg
         });
      }

      dispatch({type: UPDATE_CONTACT, payload: contact});
   }

   //Delete Contact
   const deleteContact = async (_id) => {

      try {
         await axios.delete (`api/contacts/${_id}`);
         
         dispatch({type:DELETE_CONTACT, payload: _id });
      } catch (error) {
         dispatch({
            type: CONTACT_ERROR,
            payload: error.response.msg
         });
      }

   }

   //Set current contact
   const setCurrent = contact => {
      dispatch({
         type: SET_CURRENT,
         payload: contact
      });
   }
   //Clear Current contact
   const clearCurrent = () => {
      dispatch({
         type: CLEAR_CURRENT
      });
   }
   //Filter Contact
   const filterContacts = (text) =>{
      dispatch({type: FILTER_CONTACTS, payload: text});
   }
   //Clear filter
   const clearFilter = () => {
      dispatch({
         type: CLEAR_FILTER
      });
   }
   //Clear contacts 
   const clearContacts = () => {
      dispatch({
         type: CLEAR_CONTACTS
      });
   }
   return (
      <ContactContext.Provider
         value= {{
            contacts: state.contacts,
            current: state.current,
            filtered: state.filtered,
            error: state.error,
            getContacts,
            addContact,
            deleteContact,
            setCurrent,
            clearCurrent,
            updateContact,
            filterContacts,
            clearFilter,
            clearContacts
         }}
      >
       {props.children}
      </ContactContext.Provider>
   )

}

export default ContactState