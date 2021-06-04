import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { URL_API } from '../helper/url';
import { Fragment } from 'react';
import {
  toastError,
  toastInfo,
  toastSuccess,
} from '../redux/actions/toastActions';
import { BsTrash } from 'react-icons/bs';
import HeaderProps from '../components/HeaderProps';

function InvoiceNew() {
  const { id } = useParams();
  const [hidePackage, setHidePackage] = useState(false);
  const [clientName, setClientName] = useState('');
  const [clientAddress, setClientAddress] = useState('');
  const [issuedDate, setIssuedDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [packageItems, setPackageItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [paid, setPaid] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [amountdue, setAmountdue] = useState(0);
  const [inputFields, setInputFields] = useState([
    {
      itemName: null,
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
      var config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      };
      var res = await axios.get(`${URL_API}/project/one?id=${id}`, config);
      if (res.data.result.id_package) {
        let packages = await fetchPackages(res.data.result.id_package);
        setPackageItems(packages.packageItems);
      }
      setClientName(res.data.result.clientName);
      setClientAddress(res.data.result.clientAddress);
      setIsLoading(false);
    } catch (error) {
      dispatch(toastError(`${error.response.data.message}`));
      setIsLoading(false);
    }
  };

  const fetchPackages = (idPackage) => {
    var config = {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    };
    return axios
      .get(`${URL_API}/package/one?packageId=${idPackage}`, config)
      .then((res) => {
        return res.data.result;
      })
      .catch((err) => {
        dispatch(toastError(`${err.response.data.message}`));
      });
  };

  const handleInputChange = (index, event) => {
    const values = [...inputFields];
    if (event.target.name === 'itemName') {
      values[index].itemName = event.target.value;
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
    values.push({ itemName: '', quantity: '', price: '', amount: '' });
    setInputFields(values);
  };

  const handleRemoveFields = (index) => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };

  const onClickProceed = () => {
    let data = [...inputFields];
    for (let i = 0; i < packageItems.length; i++) {
      data.push({
        itemName: packageItems[i].itemName,
        quantity: 1,
        price: packageItems[i].price,
        amount: packageItems[i].price,
      });
    }
    setInputFields(data);
  };

  const onClickSave = () => {
    var itemFormData = new FormData();
    console.log(inputFields);
    for (var i = 0; i < inputFields.length; i++) {
      itemFormData.append('name', inputFields[i].itemName);
      itemFormData.append('quantity', inputFields[i].quantity);
      itemFormData.append('price', inputFields[i].price);
    }
    axios
      .post(`${URL_API}/detailInvoice`, itemFormData)
      .then(() => {
        dispatch(toastInfo('Please wait connecting to database'));
        createInvoice();
      })
      .catch((err) => {
        dispatch(toastError(`${err.response.data.message}`));
      });
  };

  const createInvoice = () => {
    var bodyFormData = new FormData();
    bodyFormData.append('issuedDate', issuedDate);
    bodyFormData.append('dueDate', dueDate);
    bodyFormData.append('isPaid', false);
    bodyFormData.append('subtotal', subtotal);
    bodyFormData.append('paidCost', paid);
    bodyFormData.append('amountDue', amountdue);
    axios
      .post(`${URL_API}/invoice?id_project=${id}`, bodyFormData)
      .then(() => {
        dispatch(toastSuccess('Success created invoice!'));
      })
      .catch((err) => {
        dispatch(toastError(`${err.response.data.message}`));
      });
  };

  if (isLoading) {
    return (
      <>
        <HeaderProps title="Invoice" link={`/projects/details/${id}`} />
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
      <HeaderProps title="Invoice" link={`/projects/details/${id}`} />
      <div className="invoice-wrapper">
        <div className="invoice-left">
          <div className="invoice-left-studio">
            <div className="invoice-left-studio-image">
              <img src={`${URL_API}${auth.photo}`} alt="photoImage" />
            </div>
            <div className="invoice-left-studio-name">{auth.businessName}</div>
          </div>
          <div className="invoice-left-name">INVOICE</div>
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
                            id="itemName"
                            name="itemName"
                            value={inputField.itemName}
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
          <div className="invoice-right-header">
            <div className="invoice-right-header-text">Project</div>
          </div>
          <div className="invoice-right-name">Leon & Stella</div>
          <div className="invoice-right-date">28 June 2021</div>
          <div className="invoice-right-package">
            <div className="invoice-right-package-header">
              <div className="invoice-right-pader-text">
                Related package found
              </div>
              <div className="invoice-right-pader-hide">
                <button onClick={() => setHidePackage(!hidePackage)}>
                  hide
                </button>
              </div>
            </div>
            <div
              className={
                hidePackage ? 'd-none' : 'invoice-right-package-content'
              }
            >
              <div className="invoice-right-content-text">
                You can import related package into this invoice. Here's the
                package details
              </div>
              <div className="invoice-right-content-items">
                {packageItems.map((val) => {
                  return <li>{val.itemName}</li>;
                })}
              </div>
              <div className="invoice-right-content-button">
                <button onClick={onClickProceed}>Proceed</button>
              </div>
            </div>
          </div>
          <div className="invoice-right-button">
            <button onClick={onClickSave}>Create Invoice</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default InvoiceNew;
