import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import { CgOptions } from 'react-icons/cg';
import Dummy3 from '../assets/img/dummy-img/dummy3.png';
import { AiFillEdit } from 'react-icons/ai';
import {
  BsImage,
  BsBoxArrowInDown,
  BsEyeFill,
  BsCheck,
  BsX,
} from 'react-icons/bs';
import { FiSearch } from 'react-icons/fi';
import axios from 'axios';
import { URL_API } from '../helper/url';
import { Link } from 'react-router-dom';
import HeaderUser from '../components/HeaderUser';

function Collections() {
//   const [dataCollections, setDataCollections] = useState([]);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
    // await fetch(`${URL_API}/collection`)
    // .then(res => res.json())
    // .then(data => setDataCollections(data.result))
  //   try {
  //     var res = await axios.get(`${URL_API}/collection`);
  //     console.log(res.data.result);
  //   } catch (error) {
  //     console.log(error.response.data.message);
  //   }
  // };
  // console.log(dataCollections);
  // 	const collectionsName = () => {
  //   return dataCollections.map((val, index) => {
  //     return (
  //       <div key={index}>
  //        <div className="cct1-text">{val.title}</div>
  // <div className="collections-cards-text-1-date">{val.date}</div>
  //       </div>
  //     );
  //   });
  // };

  return (
    <>
      <Header />
      <div className="collections-container">
        <div className="collections-inner-container">
          <HeaderUser 
            headerOneText="Collections"
            headerOneButton="New Collection"
            headerOneLink="/collections/new"
            headerSearchText="Search Collections"
          />
          {/* <div className="collection-first-inner-container">
            <div className="collections-title">Collections</div>
            <Link to="/collections/new">
              <button className="collections-button">New Collection</button>
            </Link>
          </div>
          <div className="collection-second-inner-container">
            <input
              className="collections-searchbar"
              type="search"
              placeholder="Search collections"
            />
            <div className="collections-searchbar-logo">
              <FiSearch size={16} />
            </div>
            <div className="collections-filter">
              <div>
                <CgOptions />
              </div>
              <div className="collections-filter-text">Filter</div>
            </div>
          </div> */}
          <div className="collections-third-inner-container">
            <div className="collections-cards">
                <div>
                  <div className="collections-cards-img">
                    <img
                      className="collections-cards-img"
                      src={Dummy3}
                      alt="image not found"
                    />
                  </div>
                  <div className="collections-cards-text-1">
                    <div>
                      <div className="cct1-text">Justin & Stella</div>
                      <div className="collections-cards-text-1-date">28 March 2021</div>
                    </div>
                    <div>
                      <div className="collections-cards-text-1-preview">
                        <BsEyeFill size={16} />
                        <div className="cct1p-text">Preview</div>
                      </div>
                    </div>
                  </div>
                  <div className="collections-cards-text-2">
                    <div className="collections-cards-text-2-imgdow">
                      <BsImage size={16} />
                      <div className="imgdow-text1">13</div>
                      <BsBoxArrowInDown size={16} />
                      <div className="imgdow-text2">3</div>
                    </div>
                    <div className="collections-cards-text-2-edit">
                      <AiFillEdit size={16} />
                      <div className="cct2p-text">Edit</div>
                    </div>
                  </div>
                </div>
            </div>

            <div className="collections-cards">
                <div>
                  <div className="collections-cards-img">
                    <img
                      className="collections-cards-img"
                      src={Dummy3}
                      alt="image not found"
                    />
                  </div>
                  <div className="collections-cards-text-1">
                    <div>
                      <div className="cct1-text">Justin & Stella</div>
                      <div className="collections-cards-text-1-date">28 March 2021</div>
                    </div>
                    <div>
                      <div className="collections-cards-text-1-preview">
                        <BsEyeFill size={16} />
                        <div className="cct1p-text">Preview</div>
                      </div>
                    </div>
                  </div>
                  <div className="collections-cards-text-2">
                    <div className="collections-cards-text-2-imgdow">
                      <BsImage size={16} />
                      <div className="imgdow-text1">13</div>
                      <BsBoxArrowInDown size={16} />
                      <div className="imgdow-text2">3</div>
                    </div>
                    <div className="collections-cards-text-2-edit">
                      <AiFillEdit size={16} />
                      <div className="cct2p-text">Edit</div>
                    </div>
                  </div>
                </div>
            </div><div className="collections-cards">
                <div>
                  <div className="collections-cards-img">
                    <img
                      className="collections-cards-img"
                      src={Dummy3}
                      alt="image not found"
                    />
                  </div>
                  <div className="collections-cards-text-1">
                    <div>
                      <div className="cct1-text">Justin & Stella</div>
                      <div className="collections-cards-text-1-date">28 March 2021</div>
                    </div>
                    <div>
                      <div className="collections-cards-text-1-preview">
                        <BsEyeFill size={16} />
                        <div className="cct1p-text">Preview</div>
                      </div>
                    </div>
                  </div>
                  <div className="collections-cards-text-2">
                    <div className="collections-cards-text-2-imgdow">
                      <BsImage size={16} />
                      <div className="imgdow-text1">13</div>
                      <BsBoxArrowInDown size={16} />
                      <div className="imgdow-text2">3</div>
                    </div>
                    <div className="collections-cards-text-2-edit">
                      <AiFillEdit size={16} />
                      <div className="cct2p-text">Edit</div>
                    </div>
                  </div>
                </div>
            </div>
            <div className="collections-cards">
                <div>
                  <div className="collections-cards-img">
                    <img
                      className="collections-cards-img"
                      src={Dummy3}
                      alt="image not found"
                    />
                  </div>
                  <div className="collections-cards-text-1">
                    <div>
                      <div className="cct1-text">Justin & Stella</div>
                      <div className="collections-cards-text-1-date">28 March 2021</div>
                    </div>
                    <div>
                      <div className="collections-cards-text-1-preview">
                        <BsEyeFill size={16} />
                        <div className="cct1p-text">Preview</div>
                      </div>
                    </div>
                  </div>
                  <div className="collections-cards-text-2">
                    <div className="collections-cards-text-2-imgdow">
                      <BsImage size={16} />
                      <div className="imgdow-text1">13</div>
                      <BsBoxArrowInDown size={16} />
                      <div className="imgdow-text2">3</div>
                    </div>
                    <div className="collections-cards-text-2-edit">
                      <AiFillEdit size={16} />
                      <div className="cct2p-text">Edit</div>
                    </div>
                  </div>
                </div>
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
}

export default Collections;
