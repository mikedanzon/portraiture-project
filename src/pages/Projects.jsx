import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { URL_API } from '../helper/url';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { MdClose } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { deleteProject } from '../redux/actions';
import Header from '../components/Header';
import HeaderUser from '../components/HeaderUser';
import SimplePopover from '../components/Popover/SimplePopover';

function Projects() {
  const [isLoading, setIsLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchData(); //clientName, date
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      var config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      };
      var res = await axios.get(`${URL_API}/project/?page=0&limit=2`, config);
      setProjects(res.data.result);
      console.log(res.data.result);
      setIsLoading(false);
    } catch (error) {
      console.log(error.response.data.message);
      setIsLoading(false);
    }
  };

  const onEditClick = (id) => {
    history.push(`/projects/details/${id}`);
  };

  const onDeleteClick = (id) => {
    dispatch(deleteProject(id));
    setTimeout(() => {
      fetchData();
    }, 3000);
  };

  const projectItems = () => {
    return projects.map((val, index) => {
      return (
        <div className="planned-items" key={index}>
          <div className="item-header">
            <div className="item-header-text">Planned</div>
            <div className="item-header-button">
              <SimplePopover
                onEditClick={() => onEditClick(val.id)}
                onDeleteClick={() => onDeleteClick(val.id)}
                buttonName="Details / Edit"
              />
            </div>
          </div>
          <div className="item-name">{val.clientName}</div>
          <div className="item-date">{val.date}</div>
          <div className="item-content">
            <div className="item-left-wrapper">
              <div className="item-packages">
                <div className="item-packages-name">
                  <MdClose size={19} className="mdclose-styling" /> Packages
                </div>
                <div className="item-packages-link">
                  <Link>+ Add new package</Link>
                </div>
              </div>
              <div className="item-packages-content">No package created</div>
            </div>
            <div className="item-right-wrapper">
              <div className="item-rundown">
                <div className="item-rundown-name">
                  <MdClose size={19} className="mdclose-styling" /> Rundown
                </div>
                <div className="item-rundown-link">
                  <Link>+ Add new rundown</Link>
                </div>
              </div>
              <div className="item-invoice">
                <div className="item-invoice-name">
                  <MdClose size={19} className="mdclose-styling" /> Invoice
                </div>
                <div className="item-invoice-link">
                  <Link>+ Add new invoice</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  const onClickFilter = () => {
    alert('success filter');
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
      <div className="projects-wrapper">
        <HeaderUser
          headerOneText="Projects"
          headerOneButton="New Project"
          headerOneLink="/projects/new"
          headerSearchText="Search Projects"
          onClick={onClickFilter}
        />
        <div className="projects-planned">{projectItems()}</div>
        <div className="projects-border"></div>
        <div className="projects-completed"></div>
      </div>
    </>
  );
}

export default Projects;
