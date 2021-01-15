import React, {useReducer} from 'react';
import uuid from 'uuid';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import { 
   ADD_CONTACT,
   DELETE_CONTACT,
   SET_CURRENT,
   CLEAR_CURRENT,
   UPDATE_CONTACT,
   FILTER_CONTACTS,
   CLEAR_FILTER
} from '../types'

const ContactState = props =>{
   const initialState = {
      contacts: [
         {
            id:1,
            name: 'Alfonso Perez',
            email: 'alfonso@gmail.com',
            phone: '111-111-1111',
            type: 'personal'
         },
         {
            id:2,
            name: 'Kathleen Fonseca',
            email: 'kath@gmail.com',
            phone: '111-111-1111',
            type: 'personal'
         },
         {
            id:3,
            name: 'Manuel Cano',
            email: 'manuel@gmail.com',
            phone: '111-111-1111',
            type: 'profesional'
         }
      ]
   }
   
   const [state, dispatch] = useReducer(contactReducer, initialState);

   //Add Contact

   //Delete Contact

   //Set current contact

   //Clear Current contact

   //Update Contact

   //Filter Contact

   //Clear filter

   return (
      <ContactContext.Provider
         value= {{
            contacts: state.contacts,
         }}
      >
       {props.children}
      </ContactContext.Provider>
   )

}

export default ContactState