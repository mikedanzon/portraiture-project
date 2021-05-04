import React from 'react'
import Dummy1 from '../assets/img/dummy-img/dummy1.png'
import Dummy2 from '../assets/img/dummy-img/dummy2.png'
import Header from '../components/Header'
import { Container, Row, Col } from 'reactstrap'

function Dashboard() {
	return (
		<div>
		<Header/>
			<div className="dashboard-background">
				<img className="dashboard-profile-background" src={Dummy1} alt="" />
				<div className="dashboard-profile">
					<img className="dashboard-profile-photo" src={Dummy2} alt="" />
					<h3 className="dashboard-profile-name">Justin Studio</h3>
					<button className="dashboard-profile-btn">Edit Profile</button>
				</div>
			</div>
			<div className="dashboard-container">
				<div className="dashboard-inner-container">
					<div className="dashboard-quick">Quick Access</div>
					<Container>
						<Row className="dashboard-inner-recent-collection">
							<Col>Recent Collections</Col>
							<Container>
								<Row>
									<Col>hsbfh</Col>
									<Col>jhsbcjwb</Col>
								</Row>
								<Row>
									<Col>hsbfh</Col>
									<Col>jhsbcjwb</Col>
								</Row>
								<Row>
									<Col>hsbfh</Col>
									<Col>jhsbcjwb</Col>
								</Row>
							</Container>
						</Row>
						<Row>
							<Col>Recent Projects</Col>
							<Col>Recent Packages</Col>
						</Row>
					</Container>
				</div>
			</div>
		{/*	<div className="dashboard-inner-container">
				<div className="dashboard-inner-container-two">
					<div className="dashboard-inner-quick">Quick Access</div>
					<div className="dashboard-inner-recent-collection">
						<p>Recent Collections</p>
						<div className="dashboard-inner-recent-collection-container">
								<div className="dashboard-collection-card-img">
									<img src={Dummy2} alt="" />
								</div>
								<div className="dashboard-collection-card-info">
								</div>
						
						

							<div className="dashboard-collection-card-img">
								<img src={Dummy2} alt="" />
							</div>
							<div className="dashboard-collection-card-info">
							</div>
							<div className="dashboard-collection-card-img">
								<img src={Dummy2} alt="" />
							</div>
							<div className="dashboard-collection-card-info">
							</div>
							<div className="dashboard-collection-card-img">
								<img src={Dummy2} alt="" />
							</div>
							<div className="dashboard-collection-card-info">
							</div>
							<div className="dashboard-collection-card-img">
								<img src={Dummy2} alt="" />
							</div>
							<div className="dashboard-collection-card-info">
							</div>
							<div className="dashboard-collection-card-img">
								<img src={Dummy2} alt="" />
							</div>
							<div className="dashboard-collection-card-info">
							</div>

						</div>
					</div>
					<div className="dashboard-inner-recent-container">
						<div className="dashboard-inner-recent-projects"></div>
						<div className="dashboard-inner-recent-packages"></div>
					</div>
				</div>
				
			</div>*/}
		</div>
	)
}

export default Dashboard