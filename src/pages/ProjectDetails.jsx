import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { URL_API } from '../helper/url';
import { Breadcrumb } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Header from '../components/Header';
import axios from 'axios';
import ProjectPackages from '../components/DetailsPage/ProjectPackages';

function ProjectDetails() {
  const { id } = useParams();
  const [page, setPage] = useState(null);
  const [project, setProject] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      var config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      };
      var res = await axios.get(`${URL_API}/project/one?id=${id}`, config);
      setProject(res.data.result);
      setIsLoading(false);
    } catch (error) {
      toast.error(`${error.response.data.message}`, {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
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
            <div className="petail-header-text-date">{project.date}</div>
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
        {
          page === 'rundown' ?
          <div className="petail-content">
            Rundown still pending
          </div>
          : page === 'invoice' ?
          <div className="petail-content">
            Invoice still pending
          </div>
          :
          <div className="petail-content">
            <ProjectPackages id={project.id_package}/>
          </div>
        }
      </div>
    </>
  );
}

export default ProjectDetails;
