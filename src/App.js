import React from "react";
import "./App.css";
import ErrorBoundary from "./ErrorBoundary";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Register from "./component/register/register";
import Login from "./component/login/login";
import Home from "./component/Dashboard/home/home.js";
import Cart from "./component/Dashboard/cart/cart";
import Singledish from "./component/Dashboard/home/categories/singledish";
import Alldish from "./component/Dashboard/All dish/alldish";
import Profile from "./component/Dashboard/profile/profile";
import { Provider } from "react-redux";
import store from "./redux/store";
import { getTotals } from "./component/Dashboard/cart/cartslice";
import { Amplify } from "aws-amplify";
import awsconfig from "./aws-exports"; // AWS Amplify config
import { withAuthenticator, useAuthenticator } from "@aws-amplify/ui-react"; // AWS Amplify Authenticator
import "@aws-amplify/ui-react/styles.css";
Amplify.configure(awsconfig);

// Dispatch totals calculation for the cart when the app starts
store.dispatch(getTotals());

export function Profilee() {
  const { user } = useAuthenticator((context) => [context.user]); // Fetch the current authenticated user
  const username = user.username;
  console.log(username);
  sessionStorage.setItem("user", username); // Save the username in sessionStorage with key "user"
  return username;
}

function App() {
  return (
    <Provider store={store}>
      <div style={{ height: "100%" }}>
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <Home /> {/* After login, redirect to Home */}
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route path="/cart">
              <Cart />
            </Route>
            <Route path="/singledish">
              <Singledish />
            </Route>
            <Route path="/alldish">
              <Alldish />
            </Route>
            <Route path="/profile">
              <ErrorBoundary>
                <Profile />
              </ErrorBoundary>
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    </Provider>
  );
}

// Wrap the App component with the Amplify Authenticator to enforce login
export default withAuthenticator(App);
