import { useSelector } from "react-redux";
import Contact from "../Contact/Contact";
import { selectFilteredContacts } from "../../redux/contactsSlice";

export default function ContactList() {
 const contacts = useSelector(selectFilteredContacts)

 

  return (
    <ul className="flex  gap-3 flex-wrap ">
      {contacts.map((contact) => (
        <li key={contact.id} className="">
          <Contact data={contact} />
        </li>
      ))}
    </ul>
  );
}
