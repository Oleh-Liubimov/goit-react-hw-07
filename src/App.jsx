import ContactList from "./components/ContactList/ContactList";
import SearchBox from "./components/SearchBox/SearchBox";
import ContactForm from "./components/ContactFrom/ContactForm";
import { Circles } from "react-loader-spinner";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectError, selectLoading } from "./redux/selectors";
import { fetchContacts } from "./redux/contactsOps";

function App() {


  const dispatch = useDispatch();
  const isLoading = useSelector(selectLoading);
  const error = useSelector(selectError)



  useEffect(() => {
    dispatch(fetchContacts())
  },[dispatch])


  return (
    <div className="root flex flex-col justify-center items-center h-screen p-5">
      <h1 className="text-3xl mb-5 font-bold">Phonebook</h1>
      <ContactForm />
      <SearchBox />
      {isLoading && !error && (
        <Circles
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      )}
      <ContactList />
    </div>
  );
}

export default App;
