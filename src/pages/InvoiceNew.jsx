import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import HeaderProps from '../components/HeaderProps';
import { URL_API } from '../helper/url';

function InvoiceNew() {
  const { id } = useParams();
  const auth = useSelector((state) => state.auth);

  return (
    <>
      <HeaderProps title="Invoice" link={`/collections/details/${id}`} />
      <div className="invoice-wrapper">
        <div className="invoice-left">
          <div className="invoice-left-wrapper">
            <div className="invoice-left-studio-image">
              <img src={`${URL_API}${auth.photo}`} alt="image" />
            </div>
            <div className="invoice-left-studio-name">{auth.name}</div>
            <div className="invoice-left-name">Invoice</div>
            <div className="invoice-info">
              <div className="invoice-buyer">
                <div className="invoice-buyer-name"></div>
                <div className="invoice-buyer-address"></div>
              </div>
              <div className="invoice-studio">
                <div className="invoice-studio-name"></div>
                <div className="invoice-studio-address"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="invoice-right"></div>
      </div>
    </>
  );
}

export default InvoiceNew;
