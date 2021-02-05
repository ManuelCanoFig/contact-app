import React, {useContext,Fragment, useEffect} from 'react'
import ContactItem from './ContactItem'
import Spinner from '../layaout/Spinner'
import ContactContext from '../../context/contact/contactContext'


const Contacts = () => {
   //This allow us to have access to the state and the actions 
   const contactContext = useContext(ContactContext)

   const {contacts, filtered, getContacts, loading} = contactContext;

   useEffect(() => {
      getContacts();
      //eslint-disable-next-line
   }, [])

   if(contacts !== null && contacts.length === 0 && !loading){
      console.log(!loading);
      return <h4>Please add contacts...</h4>
   }

   return (
      <Fragment>
         {contacts !== null && !loading ? (
            filtered !== null ? filtered.map(contact => <ContactItem  key={contact._id} contact={contact} />) : 
            contacts.map(contact => <ContactItem  key={contact._id} contact={contact} />) 
         ) : <Spinner/>
         }
         
      </Fragment>
      
   )
}

export default Contacts
