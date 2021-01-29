import React, {useContext,Fragment} from 'react'
import ContactItem from './ContactItem'
import ContactContext from '../../context/contact/contactContext'


const Contacts = () => {
   //This allow us to have access to the state and the actions 
   const contactContext = useContext(ContactContext)

   const {contacts, filtered} = contactContext;

   if(contacts.length === 0){
      return <h4>Please add contacts...</h4>
   }

   return (
      <Fragment>
         {filtered !== null ? filtered.map(contact => <ContactItem  key={contact.id} contact={contact} />) : 
         contacts.map(contact => <ContactItem  key={contact.id} contact={contact} />) }
      </Fragment>
   )
}

export default Contacts
