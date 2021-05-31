import { Route, Switch } from 'react-router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { URL_API } from './helper/url';
import { ToastContainer } from 'react-toastify';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Privacy from './pages/Privacy';
import Download from './pages/Download';
import CollectionNew from './pages/CollectionNew';
import Testing from './pages/Testing';
import CollectionEdit from './pages/CollectionEdit';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import ProjectNew from './pages/ProjectNew';
import ProjectEdit from './pages/ProjectEdit';
import Collections from './pages/Collections';
import Projects from './pages/Projects';
import GalleryAll from './pages/GalleryAll';
import GalleryPhoto from './pages/GalleryPhoto';
import axios from 'axios';
import Packages from './pages/Packages';
import PackagesNew from './pages/PackagesNew';
import PackagesEdit from './pages/PackagesEdit';
import ProjectDetails from './pages/ProjectDetails';
import 'react-toastify/dist/ReactToastify.css';
import './assets/styles/style.scss';
import 'react-awesome-lightbox/build/style.css';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      var config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      };
      axios
        .get(`${URL_API}/user/one`, config)
        .then((res) => {
          dispatch({
            type: 'LOGIN',
            payload: {
              id: res.data.result.id,
              token: localStorage.getItem('token'),
              name: res.data.result.name,
              businessName: res.data.result.businessName,
              photo: res.data.result.photo,
              address: res.data.result.address,
              email: res.data.result.email,
            },
          });
        })
        .catch((err) => {
          console.log(err.response.data.message);
          localStorage.removeItem('token');
          setTimeout(() => {
            window.location = '/';
          }, 2000);
        });
    }
  }, []);

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/privacy" component={Privacy} />
        <Route exact path="/download" component={Download} />
        <Route exact path="/collections/new" component={CollectionNew} />
        <Route exact path="/collections/edit" component={CollectionEdit} />
        <Route exact path="/testing" component={Testing} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/collections" component={Collections} />
        <Route exact path="/projects/new" component={ProjectNew} />
        <Route exact path="/projects/edit/:id" component={ProjectEdit} />
        <Route exact path="/projects/details/:id" component={ProjectDetails} />
        <Route exact path="/projects" component={Projects} />
        <Route exact path="/gallery/all" component={GalleryAll} />
        <Route exact path="/gallery/photographer" component={GalleryPhoto} />
        <Route exact path="/packages" component={Packages} />
        <Route exact path="/packages/new" component={PackagesNew} />
        <Route exact path="/packages/edit/:id" component={PackagesEdit} />
      </Switch>
    </>
  );
}

export default App;
