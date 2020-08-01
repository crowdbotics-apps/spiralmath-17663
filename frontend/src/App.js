import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import { IntlProvider } from "react-intl";

import en from "./translations/en";
import hindi from "./translations/hindi";
import PrivateRoute from "./components/private-route/private-route.component";
import SignUp from "./pages/signup/signup.component";
import Login from "./pages/login/login.component";
import ForgotPassword from "./pages/forgot-password/forgot-password.component";
import Dashboard from "./pages/dashboard/dashboard.component";
import Footer from "./components/footer/footer.component";

import "./App.css";

const messages = { en, hindi };

function App() {
  const [locale, setLocale] = useState("en");
  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <Container>
        <Switch>
          <PrivateRoute path="/dashboard" exact component={Dashboard} />
          <Route path="/register" exact component={SignUp} />
          <Route path="/" exact component={Login} />
          <Route path="/forgot-password" exact component={ForgotPassword} />
        </Switch>

        <Footer />
      </Container>
    </IntlProvider>
  );
}

export default App;
