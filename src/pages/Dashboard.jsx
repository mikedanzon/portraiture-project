import React, { useEffect, useState } from 'react';
import {
  BsImage,
  BsBoxArrowInDown,
  BsEyeFill,
  BsCheck,
  BsX,
} from 'react-icons/bs';
import { AiFillEdit } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { URL_API } from '../helper/url';
import Header from '../components/Header';
import Status from '../assets/img/dummy-img/status.png';
import Baby from '../assets/img/dummy-img/baby.png';
import Dummy3 from '../assets/img/dummy-img/dummy3.png';
import axios from 'axios';
import { useSelector } from 'react-redux';

function Dashboard() {
  const auth = useSelector((state) => state.auth);

  return (
    <>
      <Header />
      <div className="dashboard-background">
        <div className="dashboard-background-container">
          <div className="dashboard-logo">
            <img src={`${URL_API}${auth.photo}`} alt="logo" />
          </div>
          <div className="dashboard-name">{auth.businessName}</div>
          <div className="dashboard-button">
            <Link to="/profile">
              <button className="dashboard-button-btn">Edit Profile</button>
            </Link>
          </div>
        </div>
      </div>
      <div className="dashboard-container">
        <div className="dashboard-inner-container">
          <div className="dic-title">Quick Access</div>
          <div className="dic-rcollections">
            <div className="dirc-rc-title">Recent Collections</div>
            <div className="dirc-rc-card-container">
              <div className="dirc-rc-cards">
                <div className="dirc-rc-image">
                  <img src={Dummy3} alt="" />
                </div>
                <div className="dirc-rc-info">
                  <div className="dirc-rc-info-1">
                    <div>
                      <div className="dirc-rc-text1">Justin & Stella</div>
                      <div className="dirc-rc-text2">28 March 2021</div>
                    </div>
                    <div className="dirc-rc-imgdown">
                      <BsImage size={16} />
                      <div className="dirc-rc-text3">13</div>
                      <BsBoxArrowInDown size={16} />
                      <div className="dirc-rc-text3">3</div>
                    </div>
                  </div>
                  <div className="dirc-rc-info-2">
                    <div className="dirc-rc-preed">
                      <BsEyeFill size={16} />
                      <div className="dirc-rc-text4">Preview</div>
                    </div>
                    <div className="dirc-rc-preed">
                      <AiFillEdit soze={16} />
                      <div className="dirc-rc-text4">Edit</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="dirc-rc-cards">
                <div className="dirc-rc-image">
                  <img src={Dummy3} alt="" />
                </div>
                <div className="dirc-rc-info">
                  <div className="dirc-rc-info-1">
                    <div>
                      <div className="dirc-rc-text1">Justin & Stella</div>
                      <div className="dirc-rc-text2">28 March 2021</div>
                    </div>
                    <div className="dirc-rc-imgdown">
                      <BsImage size={16} />
                      <div className="dirc-rc-text3">13</div>
                      <BsBoxArrowInDown size={16} />
                      <div className="dirc-rc-text3">3</div>
                    </div>
                  </div>
                  <div className="dirc-rc-info-2">
                    <div className="dirc-rc-preed">
                      <BsEyeFill size={16} />
                      <div className="dirc-rc-text4">Preview</div>
                    </div>
                    <div className="dirc-rc-preed">
                      <AiFillEdit soze={16} />
                      <div className="dirc-rc-text4">Edit</div>
                    </div>
                  </div>
                </div>
              </div><div className="dirc-rc-cards">
                <div className="dirc-rc-image">
                  <img src={Dummy3} alt="" />
                </div>
                <div className="dirc-rc-info">
                  <div className="dirc-rc-info-1">
                    <div>
                      <div className="dirc-rc-text1">Justin & Stella</div>
                      <div className="dirc-rc-text2">28 March 2021</div>
                    </div>
                    <div className="dirc-rc-imgdown">
                      <BsImage size={16} />
                      <div className="dirc-rc-text3">13</div>
                      <BsBoxArrowInDown size={16} />
                      <div className="dirc-rc-text3">3</div>
                    </div>
                  </div>
                  <div className="dirc-rc-info-2">
                    <div className="dirc-rc-preed">
                      <BsEyeFill size={16} />
                      <div className="dirc-rc-text4">Preview</div>
                    </div>
                    <div className="dirc-rc-preed">
                      <AiFillEdit soze={16} />
                      <div className="dirc-rc-text4">Edit</div>
                    </div>
                  </div>
                </div>
              </div><div className="dirc-rc-cards">
                <div className="dirc-rc-image">
                  <img src={Dummy3} alt="" />
                </div>
                <div className="dirc-rc-info">
                  <div className="dirc-rc-info-1">
                    <div>
                      <div className="dirc-rc-text1">Justin & Stella</div>
                      <div className="dirc-rc-text2">28 March 2021</div>
                    </div>
                    <div className="dirc-rc-imgdown">
                      <BsImage size={16} />
                      <div className="dirc-rc-text3">13</div>
                      <BsBoxArrowInDown size={16} />
                      <div className="dirc-rc-text3">3</div>
                    </div>
                  </div>
                  <div className="dirc-rc-info-2">
                    <div className="dirc-rc-preed">
                      <BsEyeFill size={16} />
                      <div className="dirc-rc-text4">Preview</div>
                    </div>
                    <div className="dirc-rc-preed">
                      <AiFillEdit soze={16} />
                      <div className="dirc-rc-text4">Edit</div>
                    </div>
                  </div>
                </div>
              </div><div className="dirc-rc-cards">
                <div className="dirc-rc-image">
                  <img src={Dummy3} alt="" />
                </div>
                <div className="dirc-rc-info">
                  <div className="dirc-rc-info-1">
                    <div>
                      <div className="dirc-rc-text1">Justin & Stella</div>
                      <div className="dirc-rc-text2">28 March 2021</div>
                    </div>
                    <div className="dirc-rc-imgdown">
                      <BsImage size={16} />
                      <div className="dirc-rc-text3">13</div>
                      <BsBoxArrowInDown size={16} />
                      <div className="dirc-rc-text3">3</div>
                    </div>
                  </div>
                  <div className="dirc-rc-info-2">
                    <div className="dirc-rc-preed">
                      <BsEyeFill size={16} />
                      <div className="dirc-rc-text4">Preview</div>
                    </div>
                    <div className="dirc-rc-preed">
                      <AiFillEdit soze={16} />
                      <div className="dirc-rc-text4">Edit</div>
                    </div>
                  </div>
                </div>
              </div><div className="dirc-rc-cards">
                <div className="dirc-rc-image">
                  <img src={Dummy3} alt="" />
                </div>
                <div className="dirc-rc-info">
                  <div className="dirc-rc-info-1">
                    <div>
                      <div className="dirc-rc-text1">Justin & Stella</div>
                      <div className="dirc-rc-text2">28 March 2021</div>
                    </div>
                    <div className="dirc-rc-imgdown">
                      <BsImage size={16} />
                      <div className="dirc-rc-text3">13</div>
                      <BsBoxArrowInDown size={16} />
                      <div className="dirc-rc-text3">3</div>
                    </div>
                  </div>
                  <div className="dirc-rc-info-2">
                    <div className="dirc-rc-preed">
                      <BsEyeFill size={16} />
                      <div className="dirc-rc-text4">Preview</div>
                    </div>
                    <div className="dirc-rc-preed">
                      <AiFillEdit soze={16} />
                      <div className="dirc-rc-text4">Edit</div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
            <div className="dirc-rc-seeall">
              <Link to="/collections">
                <a className="dirc-rc-seeall">see all collections</a>
              </Link>
            </div>
          </div>
          <div className="dic-rpr-rpa">
            <div className="dic-rprojects">
              <div className="dirpr-title">Recent Projects</div>
              <div className="dirpr-card-container">
                <div className="dirpr-cards">
                  <div className="dirpr-info1">
                    <div>
                      <div className="dirpr-text1">Justin & Stella</div>
                      <div className="dirpr-text2">28 March 2021</div>
                    </div>
                    <div className="dirpr-info2">
                      <BsCheck size={16} />
                      <div className="dirpr-text3">Packages</div>
                      <BsX size={16} />
                      <div className="dirpr-text3">Rundown</div>
                      <BsCheck size={16} />
                      <div className="dirpr-text3">Invoice</div>
                    </div>
                  </div>
                  <div className="dirpr-planedit">
                    <div>
                      <img src={Status} alt="" />
                    </div>
                    <div className="dirpr-edit">
                      <AiFillEdit size={16} />
                      <div className="dirpr-text4">Edit</div>
                    </div>
                  </div>
                </div>

                <div className="dirpr-cards">
                  <div className="dirpr-info1">
                    <div>
                      <div className="dirpr-text1">Justin & Stella</div>
                      <div className="dirpr-text2">28 March 2021</div>
                    </div>
                    <div className="dirpr-info2">
                      <BsCheck size={16} />
                      <div className="dirpr-text3">Packages</div>
                      <BsX size={16} />
                      <div className="dirpr-text3">Rundown</div>
                      <BsCheck size={16} />
                      <div className="dirpr-text3">Invoice</div>
                    </div>
                  </div>
                  <div className="dirpr-planedit">
                    <div>
                      <img src={Status} alt="" />
                    </div>
                    <div className="dirpr-edit">
                      <AiFillEdit size={16} />
                      <div className="dirpr-text4">Edit</div>
                    </div>
                  </div>
                </div><div className="dirpr-cards">
                  <div className="dirpr-info1">
                    <div>
                      <div className="dirpr-text1">Justin & Stella</div>
                      <div className="dirpr-text2">28 March 2021</div>
                    </div>
                    <div className="dirpr-info2">
                      <BsCheck size={16} />
                      <div className="dirpr-text3">Packages</div>
                      <BsX size={16} />
                      <div className="dirpr-text3">Rundown</div>
                      <BsCheck size={16} />
                      <div className="dirpr-text3">Invoice</div>
                    </div>
                  </div>
                  <div className="dirpr-planedit">
                    <div>
                      <img src={Status} alt="" />
                    </div>
                    <div className="dirpr-edit">
                      <AiFillEdit size={16} />
                      <div className="dirpr-text4">Edit</div>
                    </div>
                  </div>
                </div>

              </div>
              <div className="dirpr-seeall">
                <Link to="/projects">
                  <a className="dirpr-seeall">see all projects</a>
                </Link>
              </div>
            </div>
            <div className="dic-rpackages">
              <div className="dirpa-title">Recent Packages</div>
              <div className="dirpa-card-container">
                <div className="dirpa-cards">
                  <div className="dirpa-img">
                    <img src={Baby} alt="" />
                  </div>
                  <div className="dirpa-info">
                    <div className="dirpa-info1">
                      <div>
                        <div className="dirpa-text1">Baby Photo Session</div>
                        <div className="dirpa-text2">3 Items</div>
                      </div>
                      <div className="dirpa-text3">Rp.2,500,000</div>
                    </div>
                    <div className="dirpa-info2">
                      <AiFillEdit size={16} />
                      <div className="dirpa-text4">Edit</div>
                    </div>
                  </div>
                </div>

                <div className="dirpa-cards">
                  <div className="dirpa-img">
                    <img src={Baby} alt="" />
                  </div>
                  <div className="dirpa-info">
                    <div className="dirpa-info1">
                      <div>
                        <div className="dirpa-text1">Baby Photo Session</div>
                        <div className="dirpa-text2">3 Items</div>
                      </div>
                      <div className="dirpa-text3">Rp.2,500,000</div>
                    </div>
                    <div className="dirpa-info2">
                      <AiFillEdit size={16} />
                      <div className="dirpa-text4">Edit</div>
                    </div>
                  </div>
                </div><div className="dirpa-cards">
                  <div className="dirpa-img">
                    <img src={Baby} alt="" />
                  </div>
                  <div className="dirpa-info">
                    <div className="dirpa-info1">
                      <div>
                        <div className="dirpa-text1">Baby Photo Session</div>
                        <div className="dirpa-text2">3 Items</div>
                      </div>
                      <div className="dirpa-text3">Rp.2,500,000</div>
                    </div>
                    <div className="dirpa-info2">
                      <AiFillEdit size={16} />
                      <div className="dirpa-text4">Edit</div>
                    </div>
                  </div>
                </div>
                
              </div>
              <div className="dirpa-seeall">see all packages</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
