import React from 'react'
import HeaderHome from '../components/HeaderHome';
import Footer from '../components/Footer';
import Dummy4 from '../assets/img/dummy-img/dummy4.png'

function GalleryAll() {
	return (
		<>
		<HeaderHome/>
		<div className="gallery-title">Explore Photographer Gallery</div>
		<div className="gallery-container">
			<div className="gallery-cards">
				<div><img src={Dummy4} alt=""/></div>
				<div>Jamal & Denise Wedding Ceremony</div>
				<div>Justin Studio</div>
			</div>
		</div>
		<Footer/>
		</>
	)
}


export default GalleryAll