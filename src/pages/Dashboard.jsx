import React from 'react'
import Dummy1 from '../assets/img/dummy-img/dummy1.png'
import Dummy2 from '../assets/img/dummy-img/dummy2.png'

function Dashboard() {
	return (
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

				<div className="inner-content">
					
					<div className="inner-quick">
						<p>Quick Access</p>
					</div>

					<div className="inner-container">

						<div className="inner-projects">
							<p>Recent Projects</p>
						</div>
						<div className="inner-packages">
							<p>Packages</p>
						</div>

					</div>
					

				</div>

			</div>		

				

				
				
			
			
		


		</div>
	)
}

export default Dashboard