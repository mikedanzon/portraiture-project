import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { URL_API } from '../helper/url';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteProject, toastError } from '../redux/actions';
import { MdClose, MdDone } from 'react-icons/md';
import { HiDownload } from 'react-icons/hi';
import Header from '../components/Header';
import HeaderUser from '../components/HeaderUser';
import SimplePopover from '../components/Popover/SimplePopover';

function Projects() {
  const [isLoading, setIsLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const [packagesItems, setPackagesItems] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      var config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      };
      var res = await axios.get(`${URL_API}/project`, config);
      let project = await Promise.all(
        res.data.result.map(async (data) => {
          if (data.id_package) {
            let packages = await fetchPackage(data.id_package);
            return {
              ...data,
              packages,
            };
          }
          return data;
        })
      );
      console.log(project);
      setProjects(project);
      setIsLoading(false);
    } catch (error) {
      dispatch(toastError(`${error.response.data.message}`));
      setIsLoading(false);
    }
  };

  const fetchPackage = (id) => {
    var config = {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    };
    return axios
      .get(`${URL_API}/package/one?packageId=${id}`, config)
      .then((res) => {
        return res.data.result;
      })
      .catch((err) => {
        dispatch(toastError(`${err.response.data.message}`));
      });
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
        <div className="content-items" key={index}>
          <div className="item-header">
            {val.isCompleted ? (
              <div className="item-header-completed">Completed</div>
            ) : (
              <div className="item-header-planned">Planned</div>
            )}
            <div className="item-header-button">
              <SimplePopover
                onEditClick={() => onEditClick(val.id)}
                onDeleteClick={() => onDeleteClick(val.id)}
                buttonName="Details / Edit"
              />
            </div>
          </div>
          <div className="item-name">{val.clientName}</div>
          <div className="item-date">
            {val.date.split('-').reverse().join('-')}
          </div>
          <div className="item-content">
            {val.id_package ? (
              <div className="item-left-wrapper">
                <div className="item-packages">
                  <div className="item-packages-name">
                    <MdDone size={19} className="mdclose-styling" /> Packages
                  </div>
                  <div className="item-packages-link">
                    <Link>
                      <HiDownload size={20} /> Download pdf
                    </Link>
                  </div>
                </div>
                <div className="item-packages-content">
                  {val.packages.packageItems.map((val) => {
                    return <li>{val.itemName}</li>;
                  })}
                </div>
              </div>
            ) : (
              <div className="item-left-wrapper-empty">
                <div className="item-packages">
                  <div className="item-packages-name">
                    <MdClose size={19} className="mdclose-styling" /> Packages
                  </div>
                  <div className="item-packages-link">
                    <Link to={`/projects/details/${val.id}`}>
                      + Add new package
                    </Link>
                  </div>
                </div>
                <div className="item-packages-content">No package created</div>
              </div>
            )}
            <div className="item-right-wrapper">
              <div className="item-rundown">
                <div className="item-rundown-name">
                  <MdClose size={19} className="mdclose-styling" /> Rundown
                </div>
                <div className="item-rundown-link">
                  <Link to={`/projects/details/${val.id}`}>
                    + Add new rundown
                  </Link>
                </div>
              </div>
              <div className="item-invoice">
                <div className="item-invoice-name">
                  <MdClose size={19} className="mdclose-styling" /> Invoice
                </div>
                <div className="item-invoice-link">
                  <Link to={`/projects/details/${val.id}`}>
                    + Add new invoice
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="projects-border"></div>
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
        <div className="projects-content">{projectItems()}</div>
      </div>
    </>
  );
}

export default Projects;
