import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { URL_API } from '../helper/url';
import { Breadcrumb } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toastError } from '../redux/actions/toastActions';
import { dateFormatter } from '../helper/dateformatter';
import Header from '../components/Header';
import axios from 'axios';
import ProjectPackages from '../components/ProjectDetails/ProjectPackages';
import ProjectInvoice from '../components/ProjectDetails/ProjectInvoice';
import ProjectRundown from '../components/ProjectDetails/ProjectRundown';

function ProjectDetails() {
  const { id } = useParams();
  const [page, setPage] = useState(null);
  const [project, setProject] = useState({});
  const [date, setDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      fetchData();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchData = async () => {
    setIsLoading(true);
    try {
      var config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      };
      var res = await axios.get(`${URL_API}/project/one?id=${id}`, config);
      setProject(res.data.result);
      let newDate = dateFormatter(res.data.result.date);
      setDate(newDate);
      setIsLoading(false);
    } catch (error) {
      dispatch(toastError(`${error.response.data.message}`));
      setIsLoading(false);
    }
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
      <div className="petail-wrapper">
        <div className="petail-header-menu">
          <Breadcrumb>
            <Breadcrumb.Item href="/dashboard">Dashboard</Breadcrumb.Item>
            <Breadcrumb.Item Link to="#" active>
              Project
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className="petail-header-menu-second">
          <div className="petail-header-text">
            <div className="petail-header-text-name">{project.clientName}</div>
            <div className="petail-header-text-date">{date}</div>
          </div>
          <div className="petail-header-link">
            <Link to={`/projects/edit/${id}`}>Edit Project</Link>
          </div>
        </div>
        <div className="petail-main-menu">
          <div className="petail-menu">
            <div
              className={`petail-menu-style ${page ? '' : 'active'}`}
              onClick={() => setPage(false)}
            >
              Package
            </div>
            <div
              className={`petail-menu-style ${
                page === 'rundown' ? 'active' : ''
              }`}
              onClick={() => setPage('rundown')}
            >
              Rundown
            </div>
            <div
              className={`petail-menu-style ${
                page === 'invoice' ? 'active' : ''
              }`}
              onClick={() => setPage('invoice')}
            >
              Invoice
            </div>
          </div>
          <div className="petail-menu-border"></div>
        </div>
        {page === 'rundown' ? (
          <div className="petail-content">
            <ProjectRundown />
          </div>
        ) : page === 'invoice' ? (
          <div className="petail-content">
            <ProjectInvoice />
          </div>
        ) : (
          <div className="petail-content">
            <ProjectPackages id={project.id_package} />
          </div>
        )}
      </div>
    </>
  );
}

export default ProjectDetails;
