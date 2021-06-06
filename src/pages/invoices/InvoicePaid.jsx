import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { URL_API } from '../../helper/url';
import { Fragment } from 'react';
import { toastError, toastWarning } from '../../redux/actions/toastActions';
import { HiDownload } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import HeaderProps from '../../components/HeaderProps';

function InvoicePaid() {
  const { id } = useParams();
  const [clientName, setClientName] = useState('');
  const [clientAddress, setClientAddress] = useState('');
  const [idProject, setIdProject] = useState(0);
  const [issuedDate, setIssuedDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [paid, setPaid] = useState(0);
  const [isPaid, setIsPaid] = useState(false);
  const [subtotal, setSubtotal] = useState(0);
  const [amountdue, setAmountdue] = useState(0);
  const [invoiceDetails, setInvoiceDetails] = useState(false);
  const [inputFields, setInputFields] = useState([
    {
      name: null,
      quantity: null,
      price: null,
      amount: null,
    },
  ]);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      fetchData();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    let total = 0;
    for (let i = 0; i < inputFields.length; i++) {
      total += inputFields[i].amount;
    }
    setSubtotal(total);
  }, [inputFields]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    let total = subtotal - paid;
    setAmountdue(total);
  }, [subtotal]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    let total = subtotal - paid;
    setAmountdue(total);
  }, [paid]); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchData = async () => {
    setIsLoading(true);
    try {
      var res = await axios.get(`${URL_API}/invoice/one?id_invoice=${id}`);
      console.log(res.data.result);
      setDueDate(res.data.result.dueDate);
      setIssuedDate(res.data.result.issuedDate);
      setClientName(res.data.result.project.billToName);
      setClientAddress(res.data.result.project.billToAddress);
      setInputFields(res.data.result.detailInvoices);
      setPaid(res.data.result.paidCost);
      setIsPaid(res.data.result.isPaid);
      setIdProject(res.data.result.id_project);
      setInvoiceDetails(res.data.result);
      setIsLoading(false);
    } catch (error) {
      dispatch(toastError(`${error.response.data.message}`));
      setIsLoading(false);
    }
  };

  const onClickSave = () => {
    dispatch(toastWarning('This is just a preview...'));
  };

  if (isLoading) {
    return (
      <>
        <HeaderProps
          title={`INVOICE ${invoiceDetails.invoiceName}`}
          link={`/projects/details/${invoiceDetails.id_project}`}
        />
        <div className="loader-project"></div>
      </>
    );
  }

  if (!localStorage.getItem('token')) {
    return (
      <div className="notfound">
        <div className="notfound-inside">
          <h1>You need to login to view this page!</h1>
        </div>
      </div>
    );
  }

  return (
    <>
      <HeaderProps
        title={`INVOICE ${invoiceDetails.invoiceName}`}
        link={`/projects/details/${invoiceDetails.id_project}`}
      />
      <div className="invoice-paid-wrapper">
        <div className="invoice-left">
          <div className="invoice-left-studio">
            <div className="invoice-left-studio-image">
              <img src={`${URL_API}${auth.photo}`} alt="photoImage" />
            </div>
            <div className="invoice-left-studio-name">{auth.businessName}</div>
          </div>
          <div className="invoice-left-name">{`INVOICE ${invoiceDetails.invoiceName}`}</div>
          <div className="invoice-date">
            <div className="invoice-date-issued">
              <div className="invoice-date-issued-text">Issued Date</div>
              <div className="invoice-date-issued-date">{issuedDate}</div>
            </div>
            <div className="invoice-date-due">
              <div className="invoice-date-due-text">Due Date</div>
              <div className="invoice-date-due-date">{dueDate}</div>
            </div>
          </div>
          <div className="invoice-info">
            <div className="invoice-buyer">
              <div className="invoice-buyer-text">Bill to</div>
              <div className="invoice-buyer-name">{clientName}</div>
              <div className="invoice-buyer-address">{clientAddress}</div>
            </div>
            <div className="invoice-studio">
              <div className="invoice-studio-text">Bill from</div>
              <div className="invoice-studio-name">
                {auth.name} ({auth.businessName})
              </div>
              <div className="invoice-studio-address">{auth.address}</div>
            </div>
          </div>
          <div className="invoice-items">
            <div className="invoice-items-header">
              <div className="invoice-header-name">Name</div>
              <div className="invoice-header-qty">Qty</div>
              <div className="invoice-header-price">Price</div>
              <div className="invoice-header-amount">Amount</div>
            </div>
            <div className="invoice-border"></div>
            <div className="invoice-items-content">
              {inputFields.map((inputField, index) => (
                <div className="invoice-items-main">
                  <form>
                    <div className="invoice-form">
                      <Fragment key={`${inputField}~${index}`}>
                        <div className="invoice-form-name">
                          {inputField.name}
                        </div>
                        <div className="invoice-form-qty">
                          {inputField.quantity}
                        </div>
                        <div className="invoice-form-price">
                          {inputField.price}
                        </div>
                        <div className="invoice-form-amount">
                          {inputField.amount}
                        </div>
                      </Fragment>
                    </div>
                  </form>
                </div>
              ))}
            </div>
            <div className="invoice-border"></div>
            <div className="invoice-items-subtotal">
              <div className="invoice-items-subtotal-text">Subtotal</div>
              <div className="invoice-items-subtotal-total">Rp.{subtotal}</div>
            </div>
            <div className="invoice-items-paid">
              <div className="invoice-items-paid-text">Paid</div>
              <div className="invoice-items-paid-total">Rp.{paid}</div>
            </div>
            <div className="invoice-items-due">
              <div className="invoice-items-due-text">Amount Due</div>
              <div className="invoice-items-due-total">Rp.{amountdue}</div>
            </div>
          </div>
          <div className="invoice-footer">
            <div className="invoice-footer-left">
              <div className="invoice-footer-text">
                {auth.businessName} © 2021
              </div>
              <div className="invoice-footer-email">{auth.email}</div>
            </div>
            <div className="invoice-footer-right">powered by portraiture</div>
          </div>
        </div>
        <div className="invoice-right">
          <div className="invoice-right-text">Project</div>
          <div className="invoice-right-name">{clientName}</div>
          <div className="invoice-right-date">{invoiceDetails.issuedDate}</div>
          <div className="invoice-right-text">Status</div>
          <div className="invoice-right-paid">Paid</div>
          <div className="invoice-right-payment">
            <div className="invoice-right-receipt">
              <div className="invoice-right-text">Receipt</div>
              <div className="invoice-right-receipt-image">receipt.png</div>
            </div>
            <div className="invoice-right-payment-date">
              <div className="invoice-right-text">Payment Date</div>
              <div className="invoice-right-date-payment">Date here later</div>
            </div>
          </div>
          <div className="invoice-right-pdf pb-3">
            <HiDownload size={18} /> Download pdf
          </div>
        </div>
      </div>
    </>
  );
}

export default InvoicePaid;
