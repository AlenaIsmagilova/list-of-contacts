import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import SignUp from "../../pages/SignUp/SignUp";
import ContactsPage from "../../pages/Contacts/ContactsPage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { authThunk } from "../../services/actions/actions";
import SignIn from "../../pages/SignIn/SignIn";
import Spinner from "../spinner/Spinner";

function App() {
  const dispatch = useDispatch();
  const { isLoading: userLoader } = useSelector(
    (store: any) => store.userReducer
  );

  const token = JSON.parse(localStorage.getItem("userInfo") as string)?.token;
  const userId = JSON.parse(localStorage.getItem("userInfo") as string)?.userId;

  useEffect(() => {
    dispatch(authThunk(token, userId));
  }, []);

  return (
    <>
      {userLoader ? (
        <Spinner />
      ) : (
        <Router>
          <Switch>
            <Route path="/" exact>
              <ContactsPage />
            </Route>
            <Route path="/signup">
              <SignUp />
            </Route>
            <Route path="/login">
              <SignIn />
            </Route>
          </Switch>
        </Router>
      )}
    </>
  );
}

export default App;
