import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';

import Landing from './pages/Landing';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import AboutUsPage from './pages/AboutUsPage';
import DashboardPage from './pages/DashboardPage';

import SavedPage from "./pages/savedPage";
import SharePage from './SharePage';
import SettingsPage from "./pages/settingsPage";
import RecipeSearchPage from "./pages/RecipeSearchPage";
import RecipeSuggestPage from "./pages/RecipeSuggestPage";
import ShoppingListsPage from "./pages/ShoppingListsPage";
import UITest from "./pages/UITest";
import "./SMSForm"

import "./pages/Form";
import "./pages/Router";
import './css/App.css';
import './css/ui.css';



class App extends React.Component {
  render() {
    return (
        <Router>
          <div className="container-fluid text-center page">
            <div className="row justify-content-center page">
              <Switch>
                
                <Route exact path="/" component={Landing} />
                <Route path="/login" component={LoginPage} />
                <Route path="/signup" component={SignUpPage} />
                <Route path="/uitest" component={UITest} />
                <PrivateRoute path="/dashboard" component={DashboardPage} />
                
                <PrivateRoute path="/recipe-search" component={RecipeSearchPage} exact />
                <PrivateRoute path="/pantry-suggest" component={RecipeSuggestPage} exact />
                <PrivateRoute path="/shopping-lists" component={ShoppingListsPage} />

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
