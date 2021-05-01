import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className="footer-background">
      <div className="footer-list">
        <div className="footer-1">
          <div className="footer-1-1">Product</div>
          <div className="footer-1-2">
            <div className="pb-1">
              <Link to="/">Collection</Link>
            </div>
            <div className="pb-1">
              <Link to="/">Project Management</Link>
            </div>
            <div className="pb-1">
              <Link to="/">Package Management</Link>
            </div>
            <div>
              <Link to="/">Invoice</Link>
            </div>
          </div>
        </div>
        <div className="footer-2">
          <div className="footer-2-1">Company</div>
          <div className="footer-2-2">
            <div className="pb-1">
              <Link to="/">About us</Link>
            </div>
            <div className="pb-1">
              <Link to="/">Careers</Link>
            </div>
            <div className="pb-1">
              <Link to="/">Terms of Service</Link>
            </div>
            <div>
              <Link to="/">Privacy Policy</Link>
            </div>
          </div>
        </div>
        <div className="footer-3">Copyright © 2021 portraiture</div>
      </div>
    </div>
  );
}

export default Footer;
