import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { URL_API } from '../helper/url';
import HeaderHome from '../components/HeaderHome';
import Footer from '../components/Footer';
import Dummy4 from '../assets/img/dummy-img/dummy3.png'

function GalleryAll() {
	const [image, setImage] = useState([])

	useEffect(() => {
    	fetchData();
  	}, []);

	const fetchData = async () => {
    // setIsLoading(true);
    try {
      var config = {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      };
      var res = await axios.get(`${URL_API}/package`, config);
      setImage(res.data.result);
      // setIsLoading(false);
      console.log(res)
    } catch (error) {
      // toast.error(`${error.response.data.message}`, {
      //   position: 'bottom-right',
      //   autoClose: 5000,
      //   hideProgressBar: false,
      //   closeOnClick: true,
      //   pauseOnHover: true,
      //   draggable: true,
      //   progress: undefined,
      // });
      // setIsLoading(false);
    }
  };

  const galleryImage = () => {
    return image.map((val, index) => {
      return (
        <div className="galleryall-cards">
			<img className="cards-img" src={val.image} alt="no image found"/>
			<div className="cards-text">
				<div className="cards-text1">{val.name}</div>
				<div className="cards-text2">Yedam Mansuri</div>
			</div>
		</div>
      );
    });
  };

	return (
		<>
		<HeaderHome/>
		<div className="galleryall-wrapper">
			<div className="gallery-title">Explore Photographer Gallery</div>
			<div className="galleryall-cards-container">{galleryImage()}</div>
			<div className="galleryall-pagination">pagination</div>
		</div>	
		<Footer/>
		</>
	)
}


export default GalleryAll