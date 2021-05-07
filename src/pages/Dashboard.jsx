import React from 'react'
import Dummy2 from '../assets/img/dummy-img/dummy2.png'
import Header from '../components/Header'
import Dummy3 from '../assets/img/dummy-img/dummy3.png'
import { BsCardImage } from 'react-icons/bs'

function Dashboard() {
	return (
		<>
		<Header />
		<div className="dashboard-background">
			<div className="dashboard-background-container">
				<div className="dashboard-logo"><img src={Dummy2} alt="logo"/></div>
				<div className="dashboard-name">Justin Studio</div>
				<div className="dashboard-button"><button className="dashboard-button-btn">Edit Profile</button></div>
			</div>
		</div>
		<div className="isi"></div>
		</>
	)
}

export default Dashboard