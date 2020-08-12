import React from "react";
import { Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import { RawIntlProvider } from "react-intl";
import { generateIntl } from "./helpers/intl";

import en from "./translations/en";
import hindi from "./translations/hindi";
import AdminRoute from "./components/admin-route/admin-route.component";
import PrivateRoute from "./components/private-route/private-route.component";
import SignUp from "./pages/signup/signup.component";
import ConfirmEmail from "./pages/confirm-email/confirm-email.component";
import Login from "./pages/login/login.component";
import ForgotPassword from "./pages/forgot-password/forgot-password.component";
import Dashboard from "./pages/dashboard/dashboard.component";
import QuestionsManagement from "./pages/questions-management/questions-management.component";
import Footer from "./components/footer/footer.component";

import "../node_modules/react-quill/dist/quill.snow.css";
import "./App.css";

const messages = { en, hindi };
const intlValue = generateIntl({ locale: "en", messages: messages["en"] });

function App() {
  return (
    <RawIntlProvider value={intlValue}>
      <Container>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/admin-dashboard" exact component={Dashboard} />
          <PrivateRoute
            path="/users-dashboard"
            exact
            component={QuestionsManagement}
          />
          <Route path="/register" exact component={SignUp} />
          <Route path="/reset-password" exact component={SignUp} />

          <Route path="/forgot-password" exact component={ForgotPassword} />
          <Route path="/confirm-email" exact component={ConfirmEmail} />
        </Switch>

        <Footer />
      </Container>
    </RawIntlProvider>
  );
}

export default App;
