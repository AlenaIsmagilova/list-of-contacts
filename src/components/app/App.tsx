import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import SignUp from "../../pages/SignUp/SignUp";
import ContactsPage from "../../pages/Contacts/Contacts";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { baseUrl } from "../../constants/constants";
import { AuthThunk } from "../../services/actions/actions";

function App() {
  const dispatch = useDispatch();
  const { isLoading: userLoader } = useSelector(
    (store: any) => store.userReducer
  );
  const token = JSON.parse(localStorage.getItem("userInfo") as string)?.token;
  const userId = JSON.parse(localStorage.getItem("userInfo") as string)?.userId;

  useEffect(() => {
    dispatch(AuthThunk(token, userId));
  }, []);

  return (
    <>
      {/* {userLoader ? (
        <p>...LOADING</p>
      ) : ( */}
      <Router>
        <Switch>
          <Route path="/" exact>
            <ContactsPage />
          </Route>
          <Route path="/signup">
            <SignUp />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
