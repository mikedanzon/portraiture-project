import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { URL_API } from '../helper/url';
import Header from '../components/Header';
import HeaderUser from '../components/HeaderUser';
import { useHistory } from 'react-router';

function Projects() {
  const [isLoading, setIsLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const history = useHistory();

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
      setIsLoading(false);
    } catch (error) {
      console.log(error.response.data.message);
      setIsLoading(false);
    }
  };

  const projectItems = () => {
	return projects.map((val, index) => {
		return (
			<div key={index}>
				{val.clientName} {val.date}
			</div>
		)
	})
  }

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
        />
		{projectItems()}
      </div>
    </>
  );
}

export default Projects;
