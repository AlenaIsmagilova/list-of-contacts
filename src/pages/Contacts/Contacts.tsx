import { useEffect, useState } from "react";
import ContactsList from "../../components/contacts/Contacts";
import { apiReq } from "../../services/api/api";

const ContactsPage = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getContactsList = async () => {
    setLoading(true);
    try {
      const lists = await apiReq();
      setContacts(lists);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getContactsList();
  }, []);

  const listOfContacts = loading ? (
    "loading"
  ) : contacts ? (
    <ContactsList contacts={contacts} />
  ) : null;

  return <div>{listOfContacts}</div>;
};

export default ContactsPage;
