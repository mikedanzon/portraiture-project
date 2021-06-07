import { Route, Switch } from 'react-router';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { URL_API } from './helper/url';
import { toast, ToastContainer } from 'react-toastify';
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
import InvoiceNew from './pages/invoices/InvoiceNew';
import InvoiceEdit from './pages/invoices/InvoiceEdit';
import NotFound from './pages/NotFound';
import TempClassic from './pages/TempClassic';
import TempDarkmode from './pages/TempDarkmode';
import TempMinimalism from './pages/TempMinimalism';
import 'react-toastify/dist/ReactToastify.css';
import './assets/styles/style.scss';
import 'react-awesome-lightbox/build/style.css';
import InvoicePreview from './pages/invoices/InvoicePreview';
import InvoicePaid from './pages/invoices/InvoicePaid';

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
          console.log(err);
          localStorage.removeItem('token');
          setTimeout(() => {
            window.location = '/';
          }, 2000);
        });
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!localStorage.getItem('token')) {
    toast.dark(
      '👋🏻 Welcome to portraiture! Please login or signup to access the photographer area, enjoy!',
      {
        position: 'bottom-left',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    );

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
          <Route exact path="/gallery/all" component={GalleryAll} />
          <Route
            exact
            path="/gallery/photographer/:id"
            component={GalleryPhoto}
          />
          <Route exact path="/temp/classic/:id" component={TempClassic} />
          <Route exact path="/temp/minimalism/:id" component={TempMinimalism} />
          <Route exact path="/temp/darkmode/:id" component={TempDarkmode} />
          <Route path="*" component={NotFound} />
        </Switch>
      </>
    );
  }

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
        <Route exact path="/privacy/:id" component={Privacy} />
        <Route exact path="/download/:id" component={Download} />
        <Route exact path="/collections" component={Collections} />
        <Route exact path="/collections/new" component={CollectionNew} />
        <Route exact path="/collections/edit/:id" component={CollectionEdit} />
        <Route exact path="/testing" component={Testing} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/profile" component={Profile} />
        <Route exact path="/projects/new" component={ProjectNew} />
        <Route exact path="/projects/edit/:id" component={ProjectEdit} />
        <Route exact path="/projects/details/:id" component={ProjectDetails} />
        <Route exact path="/projects" component={Projects} />
        <Route exact path="/gallery/all" component={GalleryAll} />
        <Route
          exact
          path="/gallery/photographer/:id"
          component={GalleryPhoto}
        />
        <Route exact path="/packages" component={Packages} />
        <Route exact path="/packages/new" component={PackagesNew} />
        <Route exact path="/packages/edit/:id" component={PackagesEdit} />
        <Route exact path="/invoice/new/:id" component={InvoiceNew} />
        <Route exact path="/invoice/edit/:id" component={InvoiceEdit} />
        <Route exact path="/invoice/preview/:id" component={InvoicePreview} />
        <Route exact path="/invoice/paid/:id" component={InvoicePaid} />
        <Route exact path="/temp/classic/:id" component={TempClassic} />
        <Route exact path="/temp/minimalism/:id" component={TempMinimalism} />
        <Route exact path="/temp/darkmode/:id" component={TempDarkmode} />
        <Route path="*" component={NotFound} />
      </Switch>
    </>
  );
}

export default App;
