import React from 'react'
import Dummy3 from '../assets/img/dummy-img/dummy3.png'

function HeaderProfile() {
	return (
			<div className="header-profile">
        		<div className="header-profile-title">
         			<p>Edit Profile</p>
        		</div>
        		<div className="header-profile-back">
        			<img src={Dummy3} alt="" />
        		</div>
    		</div>
	)
}

export default HeaderProfile