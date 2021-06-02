import React from 'react'
import Dummy2 from '../assets/img/dummy-img/dummy2.png';
import Dummy3 from '../assets/img/dummy-img/dummy3.png';
import { FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';

function GalleryPhoto() {
	return (
		<>
		<div className="galleryphoto-wrapper">
			<div className="gallery-head">
				<Link className="gallery-link" to="/dashboard">
					<img className="gallery-logo" src={Dummy2} alt=""/>
					<div className="logo-name">Justin Studio</div>
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
			<div className="gallery-wrapper">
				<div className="gallery-cards">
					<img className="cards-img" src={Dummy3} alt="no image found"/>
					<div className="cards-text">
						<div className="cards-text1">Leon & Stella</div>
						<div className="cards-text2">Yedam Mansuri</div>
					</div>
				</div>
			</div>
			<div className="gallery-pagination">pagination</div>
		</div>
		</>
	)
}

export default GalleryPhoto