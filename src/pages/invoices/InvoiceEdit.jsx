import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { URL_API } from '../../helper/url';
import { Fragment } from 'react';
import {
  toastError,
  toastInfo,
  toastSuccess,
} from '../../redux/actions/toastActions';
import { BsTrash } from 'react-icons/bs';
import { HiDownload } from 'react-icons/hi';
import HeaderProps from '../../components/HeaderProps';
import { Link } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';

function InvoiceEdit() {
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
  const [receipt, setReceipt] = useState(false);
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
  const history = useHistory();

  const onDrop = useCallback((acceptedFiles) => {
    dispatch(toastSuccess('Upload success! Please continue.'));
    setReceipt(acceptedFiles);
    console.log(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

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

  const handleInputChange = (index, event) => {
    const values = [...inputFields];
    if (event.target.name === 'name') {
      values[index].name = event.target.value;
    } else if (event.target.name === 'quantity') {
      values[index].quantity = event.target.value;
      values[index].amount = values[index].quantity * values[index].price;
    } else if (event.target.name === 'price') {
      values[index].price = event.target.value;
      values[index].amount = values[index].quantity * values[index].price;
    } else {
      values[index].amount = values[index].quantity * values[index].price;
    }
    setInputFields(values);
  };

  const handleAddFields = () => {
    const values = [...inputFields];
    values.push({ name: '', quantity: '', price: '', amount: '' });
    setInputFields(values);
  };

  const handleRemoveFields = (index) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  const onClickSave = () => {
    // buat var isinya invoicedetails , ntar tinggal di push (tp bkn push kan object)
    setIsLoading(true);
    let bodyFormData = new FormData();
    bodyFormData.append('issuedDate', issuedDate);
    bodyFormData.append('dueDate', dueDate);
    bodyFormData.append('isPaid', isPaid);
    bodyFormData.append('paidCost', paid);
    axios
      .put(
        `${URL_API}/invoice?id_project=${invoiceDetails.id_project}&id_invoice=${id}`,
        bodyFormData
      )
      .then(() => {
        dispatch(toastInfo('Please wait connecting to server...'));
        onUpdateDetails();
      })
      .catch((err) => {
        dispatch(toastError(`${err.response.data.message}`));
        setIsLoading(false);
      });
  };

  const onUpdateDetails = () => {
    let itemsFormData = new FormData();
    for (let i = 0; i < inputFields.length; i++) {
      itemsFormData.append('name', inputFields[i].name);
      itemsFormData.append('quantity', inputFields[i].quantity);
      itemsFormData.append('price', inputFields[i].price);
    }
    axios
      .put(`${URL_API}/detailInvoice?id_invoice=${id}`, itemsFormData)
      .then(() => {
        dispatch(toastSuccess('Success updating the invoice! Redirecting...'));
        setTimeout(() => {
          history.push(`/projects/details/${idProject}`);
        }, 2000);
      })
      .catch((err) => {
        dispatch(toastError(`${err.response.data.message}`));
        setIsLoading(false);
      });
  };

  if (isLoading) {
    return (
      <>
        <HeaderProps
          title={invoiceDetails.invoiceName}
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
      <div className="invoice-edit-header-top">
        <div className="invoice-header-wrapper">
          <div className="invoice-header-top-edit">
            <Link to={`/invoice/edit/${id}`}>Edit</Link>
          </div>
          <div className="invoice-header-top-preview">
            <Link to={`/invoice/preview/${id}`}>Preview</Link>
          </div>
        </div>
      </div>
      <div className="invoice-edit-wrapper">
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
              <div className="invoice-date-issued-date">
                <input
                  type="date"
                  className="custom-form-port"
                  value={issuedDate}
                  onChange={(e) => setIssuedDate(e.target.value)}
                />
              </div>
            </div>
            <div className="invoice-date-due">
              <div className="invoice-date-due-text">Due Date</div>
              <div className="invoice-date-due-date">
                <input
                  type="date"
                  className="custom-form-port"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="invoice-info">
            <div className="invoice-buyer">
              <div className="invoice-buyer-text">Bill to</div>
              <div className="invoice-buyer-name">
                <input
                  type="text"
                  className="custom-form-port"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                />
              </div>
              <div className="invoice-buyer-address">
                <textarea
                  rows="5"
                  cols="50"
                  className="custom-form-port invoice-buyer-address-text"
                  style={{ width: '90%' }}
                  value={clientAddress}
                  onChange={(e) => setClientAddress(e.target.value)}
                />
              </div>
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
                          <input
                            placeholder="Type product/service name"
                            type="text"
                            id="name"
                            name="name"
                            value={inputField.name}
                            onChange={(event) =>
                              handleInputChange(index, event)
                            }
                          />
                        </div>
                        <div className="invoice-form-qty">
                          <input
                            placeholder="e.g. 1"
                            type="number"
                            id="quantity"
                            name="quantity"
                            value={inputField.quantity}
                            onChange={(event) =>
                              handleInputChange(index, event)
                            }
                          />
                        </div>
                        <div className="invoice-form-price">
                          <input
                            placeholder="e.g. 2000000"
                            type="number"
                            id="price"
                            name="price"
                            value={inputField.price}
                            onChange={(event) =>
                              handleInputChange(index, event)
                            }
                          />
                        </div>
                        <div className="invoice-form-amount">
                          <input
                            placeholder="e.g. 0"
                            type="number"
                            id="amount"
                            name="amount"
                            value={inputField.amount}
                          />
                          <span onClick={() => handleRemoveFields(index)}>
                            <BsTrash />
                          </span>
                        </div>
                      </Fragment>
                    </div>
                  </form>
                </div>
              ))}
            </div>
            <div className="invoice-border"></div>
            <div className="invoice-items-button">
              <button onClick={handleAddFields}>New Row</button>
            </div>
            <div className="invoice-items-subtotal">
              <div className="invoice-items-subtotal-text">Subtotal</div>
              <div className="invoice-items-subtotal-total">Rp.{subtotal}</div>
            </div>
            <div className="invoice-items-paid">
              <div className="invoice-items-paid-text">Paid</div>
              <div className="invoice-items-paid-total">
                Rp.
                <input
                  type="number"
                  value={paid}
                  onChange={(e) => setPaid(e.target.value)}
                  style={{ width: `${paid ? paid.length : '1'}ch` }}
                />
              </div>
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
          {isPaid ? (
            <div className="invoice-right-paid">Paid</div>
          ) : (
            <div className="invoice-right-unpaid">
              <b>Unpaid</b> - Due in days
            </div>
          )}
          {isPaid ? (
            <div className="invoice-right-payment">
              <div className="invoice-right-receipt">
                <div className="invoice-right-text">Receipt</div>
                <div className="invoice-right-receipt-image">receipt.png</div>
              </div>
              <div className="invoice-right-payment-date">
                <div className="invoice-right-text">Payment Date</div>
                <div className="invoice-right-date-payment">
                  Date here later
                </div>
              </div>
            </div>
          ) : (
            <div className="invoice-right-receipt-upload">
              <div className="invoice-right-text">Receipt</div>
              <div className="invoice-right-upload-receipt">
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  {receipt ? (
                    <div className="invoice-right-upload-dropzone">
                      Success Upload
                    </div>
                  ) : (
                    <div className="invoice-right-upload-dropzone">
                      Upload Receipt
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          <div className="invoice-right-pdf">
            <HiDownload size={18} /> Download pdf
          </div>
          <div className="invoice-right-button">
            <button onClick={onClickSave}>Save</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default InvoiceEdit;
