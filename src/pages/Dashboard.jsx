import React from 'react'
import Dummy1 from '../assets/img/dummy-img/dummy1.png'
import Dummy2 from '../assets/img/dummy-img/dummy2.png'
import Header from '../components/Header'
import Dummy3 from '../assets/img/dummy-img/dummy3.png'
import { BsCardImage } from 'react-icons/bs'

function Dashboard() {
	return (
		<>
		<Header />
		<div>
			<div className="dashboard-background">
				<img className="dashboard-profile-background" src={Dummy1} alt="" />
				<div className="dashboard-profile">
					<img className="dashboard-profile-photo" src={Dummy2} alt="" />
					<h3 className="dashboard-profile-name">Justin Studio</h3>
					<button className="dashboard-profile-btn">Edit Profile</button>
				</div>
			</div>

			<div className="dashboard-inner">

				<div className="dashboard-quick">Quick Access</div>

				<div className="dashboard-inner-recent-collections">

					<p className="dirc-title">Recent Collections</p>

					<div className="dirc-cards-container">
						<div className="dirc-cards">
							<div className="dirc-cards-logo"><img className="dirc-cards-logo1" src={Dummy3} alt="" /></div>
							<div className="dirc-cards-info">
							<div className="apa">
								<p className="dirc-cards-info-text">Justin & Stella</p>
								<p className="dirc-cards-info-text">28 March 2021</p>
							</div>
								<BsCardImage/>
							</div>
							<div className="dirc-cards-infoo"></div>
						</div>
						<p className="dirc-loadmore">see all collections</p>
					</div>
				</div>

				<div className="dashboard-inner-recent-project"></div>

				<div className="dashboard-inner-recent-packages"></div>

			</div>

		</div>
		</>
	)
}

export default Dashboard