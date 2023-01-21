import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ContactsList from "../../components/contacts/ContactsList";
import { getContactsThunk } from "../../services/actions/actions";

const ContactsPage = () => {
  const dispatch = useDispatch();

  const token = JSON.parse(localStorage.getItem("userInfo") as string)?.token;
  const contacts = useSelector((store: any) => store.contactsReducer.contacts);
  const userId = JSON.parse(localStorage.getItem("userInfo") as string)?.userId;

  useEffect(() => {
    dispatch(getContactsThunk(token, userId));
  }, []);

  const listOfContacts = contacts ? <ContactsList /> : null;

  return <div>{listOfContacts}</div>;
};

export default ContactsPage;
