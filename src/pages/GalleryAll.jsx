import React from 'react'
import HeaderHome from '../components/HeaderHome';
import Footer from '../components/Footer';
import Dummy4 from '../assets/img/dummy-img/dummy3.png'
// import { makeStyles } from '@material-ui/core/styles';
// import Pagination from '@material-ui/lab/Pagination';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     '& > *': {
//       marginTop: theme.spacing(2),
//     },
//   },
// }));

function GalleryAll() {
	// const classes = useStyles();
	return (
		<>
		<HeaderHome/>
		<div className="galleryall-wrapper">
			<div className="gallery-title">Explore Photographer Gallery</div>
			<div className="galleryall-cards-container">
				<div className="galleryall-cards">
					<img className="cards-img" src={Dummy4} alt="no image found"/>
					<div className="cards-text">
						<div className="cards-text1">Leon & Stella</div>
						<div className="cards-text2">Yedam Mansuri</div>
					</div>
				</div>
			</div>
			<div className="galleryall-pagination">pagination</div>
		</div>	
		<Footer/>
		</>
	)
}


export default GalleryAll