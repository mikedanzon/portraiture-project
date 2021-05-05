import { Route, Switch } from 'react-router';
import './assets/styles/style.scss';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Privacy from './pages/Privacy';
import Download from './pages/Download';
import CollectionNew from './pages/CollectionNew';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import ProjectNew from './pages/ProjectNew'
import ProjectEdit from './pages/ProjectEdit'

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/privacy" component={Privacy} />
        <Route exact path="/download" component={Download} />
        <Route exact path="/collections/new" component={CollectionNew} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/dashboard/profile" component={Profile} />
        <Route exact path="/project/new" component={ProjectNew} />
        <Route exact path="/project/edit" component={ProjectEdit} />
      </Switch>
    </>
  );
}

export default App;
