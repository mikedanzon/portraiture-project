import React, {useState, useEffect} from 'react'
import axios from 'axios';
import Dummy2 from '../assets/img/dummy-img/dummy2.png';
import Dummy3 from '../assets/img/dummy-img/dummy3.png';
import { FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { URL_API } from '../helper/url';
import { useSelector } from 'react-redux';
import { toastError } from '../redux/actions/toastActions';
import { useDispatch } from 'react-redux';

function GalleryPhoto() {
  const auth = useSelector((state) => state.auth);
  const [image, setImage] = useState([])
  const dispatch = useDispatch();

  useEffect(() => {
    	fetchDataGalleryPhoto();
  	}, []);

  const fetchDataGalleryPhoto = async () => {
    // setIsLoading(true);
    try {
      var config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      };
      var res = await axios.get(`${URL_API}/collection/all`, config);
      setImage(res.data.result);
      // setIsLoading(false);
      console.log(res)
    } catch (error) {
      dispatch(toastError(`${error.response.data.message}`));
      // setIsLoading(false);
    }
  };

  const galleryPhotoImage = () => {
    return image.map((val, index) => {
      return (
        <div className="gallery-cards">
			<img className="cards-img" src={val.cover} alt="no image found"/>
			<div className="cards-text">
				<div className="cards-text1">{val.title}</div>
				<div className="cards-text2">{auth.businessName}</div>
			</div>
		</div>
      );
    });
  };

	return (
		<>
		<div className="galleryphoto-wrapper">
			<div className="gallery-head">
				<Link className="gallery-link" to="/dashboard">
					<img className="gallery-logo" src={`${URL_API}${auth.photo}`} alt=""/>
					<div className="logo-name">{auth.businessName}</div>
				</Link>
				<div className="gallery-search">
	          		<div className="search-input">
			            <input
			              type="search"
			              placeholder="Search gallery"
			            />
	          		</div>
	          		<div className="search-icon">
	            		<FiSearch size={16} />
	          		</div>
        		</div>
			</div>
			<div className="gallery-wrapper">{galleryPhotoImage()}</div>
			<div className="gallery-pagination">pagination</div>
		</div>
		</>
	)
}

export default GalleryPhoto