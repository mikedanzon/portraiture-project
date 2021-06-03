import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Dummy from '../assets/img/dummy-img/minimalist-background.png';
import Dummy2 from '../assets/img/dummy-img/dummy2.png';
import Height from '../assets/img/dummy-img/dummy-height.png';
import { BsBoxArrowInDown } from 'react-icons/bs';
import { FaRegShareSquare } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { URL_API } from '../helper/url';

function TemplateMinimalist() {
  const auth = useSelector((state) => state.auth);
  const [images, setImages] = useState([]);

  useEffect(() => {
  	fetchDataImage();
  }, [])

  const fetchDataImage = async () => {
    // setIsLoading(true);
    try {
      var res = await axios.get(`${URL_API}/collectionImages/bycollection?id_collection=5`);
      let colImages = res.data.result.filter((item, index) => {
      		return index % 2 !== 0;
		});
      setImages(colImages);
      console.log(res.data.result)
      // setIsLoading(false);
    } catch (error) {
      // dispatch(toastError(`${error.response.data.message}`));
      // setIsLoading(false);
    }
  };

  // const onImageClick = (image) => {
  //   let colImages = [];
  //   for (var i = 0; i < image.length; i++) {
  //     if (i % 2 !== 0) {
  //       colImages.push(image[i]);
  //     }
  //   }
  //   setImages(colImages);
  // };

  // const collectionAllImage = () => {
  //   return images.map((val, index) => {
  //     return (
  //          <div>
  //          	{
  //          		index % 2 !== 0 ? <img src={val.image} alt=""/> : null
  //          	}
  //          </div>
  //     );
  //   });
  // };

  // const allImage = (images) => {
  //   let hasil = [];
  //   for (let i=0; i < images.length; i++) {
  //   	if (i % 2 !== 0) {
  //   		hasil.push(images[i])
  //   	}
  //   }
  //   setImages(hasil)
  // };

  const collectionAllImage = () => {
    return images.map((val, index) => {
      return (
           <img src={val.image} alt=""/>
      );
    });
  };

	return (
		<div className="minimalist-wrapper">
			<div className="minimalist-header">
				<div className="ch-background">
					<img src={Dummy} alt=""/>
				</div>
				<div className="ch-info">
					<div className="ch-logo-studioname">
						<div className="ch-logo">
							<img src={`${URL_API}${auth.photo}`} alt=""/>
						</div>
						<div className="ch-studioname">{auth.businessName}</div>
					</div>
					<div className="ch-title-date">
						<div className="ch-title">Leon & Stella</div>
						<div className="ch-date">28 June 2021</div>
					</div>
					<div className="ch-desc">Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas expedita eos nisi officiis.</div>
				</div>
			</div>
			<div className="minimalist-main">
				<div className="cm-title-studioname-info">
					<div className="cm-title-studioname">
						<div className="cm-title">Leon & Stella</div>
						<div className="cm-studioname">{auth.businessName}</div>
					</div>
					<div className="cm-info">
						<FaRegShareSquare style={{marginBottom:"3px"}}/> Share
						<BsBoxArrowInDown style={{marginBottom:"3px", marginLeft:"20px"}}/> Download
					</div>
				</div>
				<div className="cm-cards-wrapper">
				{collectionAllImage()}
					{/*<img src={Dummy2} alt=""/>
					<img src={Dummy} alt=""/>
					<img src={Height} alt=""/>
					<img src={Dummy} alt=""/>
					<img src={Height} alt=""/>
					<img src={Dummy} alt=""/>
					<img src={Dummy} alt=""/>
					<img src={Height} alt=""/>
					<img src={Dummy} alt=""/>*/}
				</div>
			</div>
			<div className="minimalist-footer">
				<div className="footer-text-top">Copyright &#xA9; 2021 <span>{auth.businessName}</span></div>
				<div className="footer-text-bottom">powered by <span>portraiture</span></div>
			</div>
		</div>
	)
}

export default TemplateMinimalist;