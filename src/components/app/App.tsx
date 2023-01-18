import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import SignUp from "../../pages/SignUp/SignUp";
import ContactsPage from "../../pages/Contacts/Contacts";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { baseUrl } from "../../constants/constants";

function App() {
  const { isLoading: userLoader } = useSelector(
    (store: any) => store.userReducer
  );

  useEffect(() => {
    const getCurrentUser = (token: any, userId: number) => {
      return fetch(`${baseUrl}/600/users/${userId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((data) => console.log(data));
    };
    const token = JSON.parse(localStorage.getItem("userInfo") as string)?.token;
    const userId = JSON.parse(
      localStorage.getItem("userInfo") as string
    )?.userId;
    getCurrentUser(token, userId);
  }, []);

  return (
    <>
      {userLoader ? (
        <p>...LOADING</p>
      ) : (
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
      )}
    </>
  );
}

export default App;
