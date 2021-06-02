import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { URL_API } from '../helper/url';
import { toastError } from '../redux/actions/toastActions';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import HeaderHome from '../components/HeaderHome';
import Footer from '../components/Footer';
import Dummy4 from '../assets/img/dummy-img/dummy3.png'

function GalleryAll() {
  const auth = useSelector((state) => state.auth);
	const [image, setImage] = useState([])
  const dispatch = useDispatch();

	useEffect(() => {
    	fetchDataGallery();
  	}, []);

	const fetchDataGallery = async () => {
    // setIsLoading(true);
    try {
      // var config = {
      //   headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      // };
      var res = await axios.get(`${URL_API}/collection`);
      setImage(res.data.result);
      // setIsLoading(false);
      console.log(res)
    } catch (error) {
      dispatch(toastError(`${error.response.data.message}`));
      // setIsLoading(false);
    }
  };

  const galleryImage = () => {
    return image.map((val, index) => {
      return (
        <div className="galleryall-cards" key={index}>
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
		<HeaderHome/>
		<div className="galleryall-wrapper">
			<div className="gallery-title">Explore <Link to="/gallery/photographer"><span>Photographer Gallery</span></Link></div>
			<div className="galleryall-cards-container">{galleryImage()}</div>
			<div className="galleryall-pagination">pagination</div>
		</div>	
		<Footer/>
		</>
	)
}


export default GalleryAll