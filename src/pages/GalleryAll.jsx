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
		<div className="gallery-wrapper">
			<div className="gallery-title">Explore Photographer Gallery</div>
			<div className="gallery-container">
				<div className="gallery-cards">
					<div><img className="gallery-cards-img" src={Dummy4} alt=""/></div>
					<div className="gallery-cards-text">
						<div className="gallery-cards-text1">Jamal & Denise Wedding Ceremony</div>
						<div className="gallery-cards-text2">Justin Studio</div>
					</div>
				</div>
				<div className="gallery-cards">
					<div><img className="gallery-cards-img" src={Dummy4} alt=""/></div>
					<div className="gallery-cards-text">
						<div className="gallery-cards-text1">Jamal & Denise Wedding Ceremony</div>
						<div className="gallery-cards-text2">Justin Studio</div>
					</div>
				</div>
				<div className="gallery-cards">
					<div><img className="gallery-cards-img" src={Dummy4} alt=""/></div>
					<div className="gallery-cards-text">
						<div className="gallery-cards-text1">Jamal & Denise Wedding Ceremony</div>
						<div className="gallery-cards-text2">Justin Studio</div>
					</div>
				</div>
				<div className="gallery-cards">
					<div><img className="gallery-cards-img" src={Dummy4} alt=""/></div>
					<div className="gallery-cards-text">
						<div className="gallery-cards-text1">Jamal & Denise Wedding Ceremony</div>
						<div className="gallery-cards-text2">Justin Studio</div>
					</div>
				</div>
				<div className="gallery-cards">
					<div><img className="gallery-cards-img" src={Dummy4} alt=""/></div>
					<div className="gallery-cards-text">
						<div className="gallery-cards-text1">Jamal & Denise Wedding Ceremony</div>
						<div className="gallery-cards-text2">Justin Studio</div>
					</div>
				</div>
				<div className="gallery-cards">
					<div><img className="gallery-cards-img" src={Dummy4} alt=""/></div>
					<div className="gallery-cards-text">
						<div className="gallery-cards-text1">Jamal & Denise Wedding Ceremony</div>
						<div className="gallery-cards-text2">Justin Studio</div>
					</div>
				</div>
				<div className="gallery-cards">
					<div><img className="gallery-cards-img" src={Dummy4} alt=""/></div>
					<div className="gallery-cards-text">
						<div className="gallery-cards-text1">Jamal & Denise Wedding Ceremony</div>
						<div className="gallery-cards-text2">Justin Studio</div>
					</div>
				</div>
				<div className="gallery-cards">
					<div><img className="gallery-cards-img" src={Dummy4} alt=""/></div>
					<div className="gallery-cards-text">
						<div className="gallery-cards-text1">Jamal & Denise Wedding Ceremony</div>
						<div className="gallery-cards-text2">Justin Studio</div>
					</div>
				</div>
				<div className="gallery-cards">
					<div><img className="gallery-cards-img" src={Dummy4} alt=""/></div>
					<div className="gallery-cards-text">
						<div className="gallery-cards-text1">Jamal & Denise Wedding Ceremony</div>
						<div className="gallery-cards-text2">Justin Studio</div>
					</div>
				</div>
				<div className="gallery-cards">
					<div><img className="gallery-cards-img" src={Dummy4} alt=""/></div>
					<div className="gallery-cards-text">
						<div className="gallery-cards-text1">Jamal & Denise Wedding Ceremony</div>
						<div className="gallery-cards-text2">Justin Studio</div>
					</div>
				</div>
				<div className="gallery-cards">
					<div><img className="gallery-cards-img" src={Dummy4} alt=""/></div>
					<div className="gallery-cards-text">
						<div className="gallery-cards-text1">Jamal & Denise Wedding Ceremony</div>
						<div className="gallery-cards-text2">Justin Studio</div>
					</div>
				</div>
				<div className="gallery-cards">
					<div><img className="gallery-cards-img" src={Dummy4} alt=""/></div>
					<div className="gallery-cards-text">
						<div className="gallery-cards-text1">Jamal & Denise Wedding Ceremony</div>
						<div className="gallery-cards-text2">Justin Studio</div>
					</div>
				</div>
	{/*			<div className={classes.root}>
					<Pagination count={10} shape="rounded" />
				</div>*/}
			</div>
		</div>
		<Footer/>
		</>
	)
}


export default GalleryAll