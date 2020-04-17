import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';

// import fontawesome from '@fortawesome/fontawesome-free';     // <--- The Fon't awesome Icons are not loading, I need to do more research on how to get them working in React.

import Landing from './pages/Landing';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import AboutUsPage from './pages/AboutUsPage';
import DashboardPage from './pages/DashboardPage';

import Recipe from "./pages/Recipe";
import Recipe_API from "./RecipeApi";

import CelebratePage from './pages/CelebratePage';
import SavedPage from "./pages/savedPage";
import SharePage from './SharePage';
import SettingsPage from "./pages/settingsPage";
import "./SMSForm"

import "./pages/Recipe";
import "./pages/Form";
import "./pages/Router";
import './css/App.css';



class App extends React.Component {
  render() {
    return (
        <Router>
          <div className="container-fluid text-center">
            <div className="row justify-content-center">
              <Switch>
                
                {/* <Route path="/posts/new" component={PostFormPage} /> */}
                {/* <Route path="/posts/:id" component={ShowPostPage} /> */}
                <Route exact path="/" component={Landing} />
                <Route path="/login" component={LoginPage} />
                <Route path="/signup" component={SignUpPage} />
                <PrivateRoute path="/dashboard" component={DashboardPage} />
                
                <PrivateRoute path="/recipe" component={Recipe_API} exact />
                <PrivateRoute path="/recipe/:id" component={Recipe} />

                <PrivateRoute path="/holiday" component={CelebratePage} />
                <PrivateRoute path="/settings" component={SettingsPage} />
                <PrivateRoute path="/saved" component={SavedPage} />
                <PrivateRoute path="/api/messages" component={SharePage} />
                <PrivateRoute path="/aboutUs" component={AboutUsPage} />


              </Switch>
            </div>
          </div>
        </Router>
    );
  }
}


export default App;
