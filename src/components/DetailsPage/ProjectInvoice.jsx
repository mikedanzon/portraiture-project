import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { URL_API } from '../../helper/url';
import { toastError } from '../../redux/actions/toastActions';

function ProjectInvoice() {
  const { id } = useParams();
  const [dataInvoice, setDataInvoice] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      var res = await axios.get(`${URL_API}/invoice?id_project=${id}`);
      console.log(res.data.result);
      setDataInvoice(res.data.result);
      setIsLoading(false);
    } catch (error) {
      dispatch(toastError(`${error.response.data.message}`));
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <>
        <div className="loader-project"></div>
      </>
    );
  }

  return (
    <>
      <div className="projects-invoice-wrapper">
        {dataInvoice.length !== 0 ? (
          <div className="projects-invoice">
            <div className="projects-invoice-text">
              <Link>+ Add new invoice</Link>
            </div>
          </div>
        ) : null}
        <div className="projects-invoice">
          <div className="projects-invoice-text">
            <Link to={`/invoice/new/${id}`}>+ Add new invoice</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProjectInvoice;
