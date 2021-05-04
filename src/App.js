import { Route, Switch } from 'react-router';
import './assets/styles/style.scss';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Privacy from './pages/Privacy';
import Download from './pages/Download';
import Dashboard from './pages/Dashboard';
import EditProfile from './pages/EditProfile';


function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/privacy" component={Privacy} />
        <Route exact path="/download" component={Download} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/editprofile" component={EditProfile} />
      </Switch>
    </>
  );
}

export default App;
