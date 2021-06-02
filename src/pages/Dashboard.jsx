import React, { useEffect, useState } from 'react';
import {
  BsImage,
  BsBoxArrowInDown,
  BsEyeFill,
  BsCheck,
  BsX,
} from 'react-icons/bs';
import { AiFillEdit } from 'react-icons/ai';
import { Link, useHistory } from 'react-router-dom';
import { URL_API } from '../helper/url';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { deletePackage, deleteProject } from '../redux/actions';
import { toastError } from '../redux/actions/toastActions';
import Header from '../components/Header';
import Dummy3 from '../assets/img/dummy-img/dummy3.png';
import axios from 'axios';
import SimplePopover from '../components/Popover/SimplePopover';

function Dashboard() {
  const auth = useSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(false);
  const [dataPackages, setDataPackages] = useState([]);
  const [dataProjects, setDataProjects] = useState([]);
  const [dataCollections, setDataCollections] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchDataCollections();
    fetchDataProjects();
    fetchDataPackages();
  }, []);

  const fetchDataCollections = async () => {
    try {
      // var config = {
      //   headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      // };
      var res = await axios.get(`${URL_API}/collection`);
      setDataCollections(res.data.result);
      console.log(res)
    } catch (error) {
      dispatch(toastError(`${error.response.data.message}`));
    }
  };

  const onEditClickCollections = (id) => {
    // history.push(`/packages/edit/${id}`);
  };

  const onDeleteClickCollections = (id) => {
    // dispatch(deletePackage(id));
    // setTimeout(() => {
    //   fetchDataPackages();
    // }, 3000);
  };

  const collectionItems = () => {
    return dataCollections
    .sort((a, b) => a.id < b.id ? 1 : -1)
    .slice(0, 6)
    .map((val, index) => {
      return (
          <div className="rcollections-cards" key={index}>
            <div className="cards-img">
              <img src={val.cover} alt="cover not found"/>
            </div>
            <div className="cards-content">
              <div className="cards-top-wrapper">
                <div className="cards-name-date">
                  <div className="cards-name">{val.title}</div>
                  <div className="cards-date">{val.date.slice(0, 10).split('-').reverse().join('-')}</div>
                </div>
                <div className="cards-preview">
                  <BsEyeFill size={20} style={{marginBottom:"3px"}}/> <span>Preview</span>
                </div>
              </div>
              <div className="cards-bottom-wrapper">
                <div className="cards-img-down">
                  <BsImage size={20} style={{marginBottom:"3px"}}/> {val.collectionImages.length}
                  <BsBoxArrowInDown size={20} style={{marginBottom:"4px", marginLeft:"20px"}}/> 3
                </div>
                <SimplePopover
                  onEditClick={() => onEditClickCollections(val.id)}
                  onDeleteClick={() => onDeleteClickCollections(val.id)}
                  buttonName="Edit"
                /> 
              </div>
            </div>
          </div>  
      );
    });
  };

  const fetchDataProjects = async () => {
    setIsLoading(true);
    try {
      var config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      };
      var res = await axios.get(`${URL_API}/project/?page=0&limit=3`, config);
      setDataProjects(res.data.result);
      // console.log(res)
      setIsLoading(false);
    } catch (error) {
      dispatch(toastError(`${error.response.data.message}`));
      setIsLoading(false);
    }
  };

  const onEditClickProjects = (id) => {
    history.push(`/projects/edit/${id}`);
  };

  const onDeleteClickProjects = (id) => {
    dispatch(deleteProject(id));
    setTimeout(() => {
      fetchDataProjects();
    }, 3000);
  };

  const projectItems = () => {
    return dataProjects
    .sort((a, b) => a.id < b.id ? 1 : -1)
    // .slice(0, 3)
    .map((val, index) => {
      return (
          <div className="rprojects-cards" key={index}>
              <div className="cards-top-wrapper">
                <div className="cards-name-date">
                  <div className="cards-name">{val.clientName}</div>
                  <div className="cards-date">{val.date.slice(0, 10).split('-').reverse().join('-')}</div>
                </div>
                <div className="cards-planned">Planned</div>
              </div>
              <div className="cards-bottom-wrapper">
                <div className="cards-packages-rundown-invoice">
                  <BsCheck size={25} style={{marginBottom:"3px"}}/> Packages
                  <BsCheck size={25} style={{marginBottom:"3px", marginLeft:"10px"}}/> <span>Rundown</span>
                  <BsCheck size={25} style={{marginBottom:"3px"}}/> Invoice
                </div>
                <SimplePopover
                  className="cards-edit"
                  onEditClick={() => onEditClickProjects(val.id)}
                  onDeleteClick={() => onDeleteClickProjects(val.id)}
                  buttonName="Edit"
                /> 
              </div>
          </div>
        );
      });
    };

  const fetchDataPackages = async () => {
    try {
      var config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      };
      var res = await axios.get(`${URL_API}/package`, config);
      setDataPackages(res.data.result);
      // console.log(res)
    } catch (error) {
      dispatch(toastError(`${error.response.data.message}`));
    }
  };

  const onEditClickPackages = (id) => {
    history.push(`/packages/edit/${id}`);
  };

  const onDeleteClickPackages = (id) => {
    dispatch(deletePackage(id));
    setTimeout(() => {
      fetchDataPackages();
    }, 3000);
  };

  const packageItems = () => {
    return dataPackages
    .sort((a, b) => a.id < b.id ? 1 : -1)
    .slice(0, 3)
    .map((val, index)  => {
      return ( 
          <div className="rpackages-cards" key={index}>
            <div className="rpackages-image">
              <img src={val.image} alt="" />
            </div>
            <div className="rpackages-text">
              <div className="rpackages-name">{val.name}</div>
              <div className="rpackages-itemcount">{val.packageItems.length} Items</div>
              <div className="rpackages-priceedit">
                <div className="rpackages-price">Rp.2,500,000</div>
                <SimplePopover
                    onEditClick={() => onEditClickPackages(val.id)}
                    onDeleteClick={() => onDeleteClickPackages(val.id)}
                    buttonName="Edit"
                />   
              </div>  
            </div>
          </div>
      );
    });  
  };

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="loader"></div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="dashboard-wrapper">
        <div className="dashboard-background">
          <div className="dashboard-background-container">
            <div className="dashboard-logo">
              <img src={`${URL_API}${auth.photo}`} alt="logo" />
            </div>
            <div className="dashboard-name">{auth.businessName}</div>
            <div className="dashboard-button">
              <Link to="/profile">
                <button className="dashboard-button-btn">Edit Profile</button>
              </Link>
            </div>
          </div>
        </div>
        <div className="dashboard-main">
          <div className="dashboard-wrapper">
            <div className="dashboard-title">Quick Access</div>
            <div className="recent-collections">
              <div className="recent-collections-title">Recent Collections</div>
              <div className="rcollections-wrapper">
                {
                  collectionItems().length === 0 ?
                    <div className="cards-no-content">There is no collecton created yet</div>
                   :
                    collectionItems() 
                }
              </div>
              <Link to="/collections">
                <div className="recent-collections-seeall">see all collections</div>
              </Link>
            </div>
            <div className="recent-projects-packages-wrapper">
              <div className="recent-projects">
                <div className="recent-projects-title">Recent Projects</div>
                <div className="rprojects-wrapper">
                  {
                    projectItems().length === 0 ?
                      <div className="cards-no-content">There is no project created yet</div>
                    :
                    projectItems()
                  }
                </div>
                <Link to="/projects">
                  <div className="recent-projects-seeall">see all projects</div>
                </Link>
              </div>
              <div className="recent-packages">
                <div className="recent-packages-title">Recent Packages</div>
                <div className="rpackages-wrapper">
                    {
                      packageItems().length === 0 ?
                      <div className="cards-no-content">There is no package created yet</div>
                      :
                      packageItems()
                    }
                </div>
                <Link to="/packages">
                  <div className="recent-packages-seeall">see all packages</div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
