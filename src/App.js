import { Route, Switch } from 'react-router';
import Home from './pages/Home';
import Register from './pages/Register';
import './assets/styles/style.scss';
import Login from './pages/Login';

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </>
  );
}

export default App;
