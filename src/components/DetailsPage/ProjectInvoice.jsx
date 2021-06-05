import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { URL_API } from '../../helper/url';
import { toastError } from '../../redux/actions/toastActions';
import { HiDownload } from 'react-icons/hi';
import { FaFileInvoiceDollar } from 'react-icons/fa';
import SimplePopover from '../Popover/SimplePopover';

function ProjectInvoice() {
  const { id } = useParams();
  const [dataInvoice, setDataInvoice] = useState([]);
  const [issuedDate, setIssuedDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchData = async () => {
    setIsLoading(true);
    try {
      var res = await axios.get(`${URL_API}/invoice?id_project=${id}`);
      setDataInvoice(res.data.result);
      setIssuedDate(
        res.data.result[0].issuedDate.split('-').reverse().join('-')
      );
      setIsLoading(false);
    } catch (error) {
      dispatch(toastError(`${error}`));
      setIsLoading(false);
    }
  };

  const onEditClick = () => {};

  const onDeleteClick = () => {};

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
          <div className="projects-invoice-done">
            <div className="projects-invoice-done-wrapper">
              <div className="invoice-done-header">
                <div className="invoice-done-header-icon">
                  <FaFileInvoiceDollar size={24} />
                </div>
                <div className="invoice-done-header-edit">
                  <SimplePopover
                    onEditClick={() => onEditClick()}
                    onDeleteClick={() => onDeleteClick()}
                    buttonName="Edit / Preview"
                  />
                </div>
              </div>
              {dataInvoice.isPaid ? (
                <div className="invoice-done-paid">Paid</div>
              ) : (
                <div className="invoice-done-unpaid">Unpaid</div>
              )}
              <div className="invoice-done-text">INVOICE</div>
              {dataInvoice.isPaid ? (
                <div className="invoice-done-date">Paid at {issuedDate}</div>
              ) : (
                <div className="invoice-done-date">Issued at {issuedDate}</div>
              )}
            </div>
            <div className="projects-invoice-done-download">
              <Link>
                <HiDownload size={20} /> Download pdf
              </Link>
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
