import React, { useEffect, useState } from 'react';
import {
  BsImage,
  BsBoxArrowInDown,
  BsEyeFill,
  BsCheck,
  BsX,
} from 'react-icons/bs';
import { AiFillEdit } from 'react-icons/ai';
import { Link, useHistory } from 'react-router-dom';
import { URL_API } from '../helper/url';
import Header from '../components/Header';
import Status from '../assets/img/dummy-img/status.png';
import Baby from '../assets/img/dummy-img/baby.png';
import Dummy3 from '../assets/img/dummy-img/dummy3.png';
import axios from 'axios';
import { useSelector } from 'react-redux';
import SimplePopover from '../components/Popover/SimplePopover';
import { useDispatch } from 'react-redux';
import { deletePackage } from '../redux/actions';

function Dashboard() {
  const auth = useSelector((state) => state.auth);
  const [dataPackages, setDataPackages] = useState([]);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      var config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      };
      var res = await axios.get(`${URL_API}/package`, config);
      setDataPackages(res.data.result);
      console.log(res)
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  const onEditClick = (id) => {
    history.push(`/packages/edit/${id}`);
  };

  const onDeleteClick = (id) => {
    dispatch(deletePackage(id));
    setTimeout(() => {
      fetchData();
    }, 3000);
  };

    const packageItems = () => {
    return dataPackages
    .sort((a, b) => a.updatedAt < b.updatedAt ? 1 : -1)
    .slice(0, 3)
    .map((val, index) => {
      return (
        
          <div className="rpackages-cards" key={index}>
                  <div className="rpackages-image">
                    <img src={val.image} alt="" />
                  </div>
                  <div className="rpackages-text">
                      <div className="rpackages-name">{val.name}</div>
                      <div className="rpackages-itemcount">{val.packageItems.length} Items</div>
                      <div className="rpackages-priceedit">
                          <div className="rpackages-price">Rp.2,500,000</div>
                          <div className="rpackages-edit">
                              {/*<AiFillEdit size={16} />
                              <div className="rpackages-edittext">Edit</div>*/}
                              <SimplePopover
                                onEditClick={() => onEditClick(val.id)}
                                onDeleteClick={() => onDeleteClick(val.id)}
                              />
                          </div>
                      </div>
                      
                  </div>
          </div>
        
      );
    });
  };

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
              </div>
              <div className="dirpr-seeall">
                <Link to="/projects">
                  <a className="dirpr-seeall">see all projects</a>
                </Link>
              </div>
            </div>
            <div className="dic-rpackages">
              <div className="dirpa-title">Recent Packages</div>
              <div className="rpackages-wrapper">{packageItems()}</div>
              <Link to="/packages">
              <div className="rpackages-seeall">see all packages</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
