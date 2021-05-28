import React from 'react'
import Header from '../components/Header'
import { CgOptions } from 'react-icons/cg'
import Status from '../assets/img/dummy-img/status.png'
import Completed from '../assets/img/dummy-img/completed.png'
import { FiSearch } from "react-icons/fi";
import { BsCheck, BsX } from 'react-icons/bs'
import { AiFillEdit } from 'react-icons/ai'
import { BiArrowToBottom } from 'react-icons/bi'
import { Link } from 'react-router-dom';
import HeaderUser from '../components/HeaderUser';

function Projects() {
	return (
		<>
		<Header/>
		
		<div>
			<div className="projects-container">
				<div className="projects-inner-container">
					<HeaderUser
						headerOneText="Projects"
						headerOneButton="New Project"
						headerOneLink="/projects/new"
						headerSearchText="Search Projects"
					/>
					{/* <div className="projects-first-inner-container">
							<div className="projects-title">Projects</div>
							<Link to="/projects/new">
							<button className="projects-button">New Projects</button>
							</Link>
					</div>
					<div className="projects-second-inner-container">
						<input className="projects-searchbar" type="search" placeholder="Search projects"/>
						<div className="projects-searchbar-logo"><FiSearch size={16}/></div>
						<div className="projects-filter">
							<div><CgOptions/></div>
							<div>Filter</div>
						</div>
					</div> */}
					<div className="projects-third-inner-container">
						<div className="ptic-one"><img src={Status} alt=""/></div>
						<div className="ptic-two">
							<div className="ptic-two-text1">Jamal & Denise</div>
							<div className="ptic-two-text2">28 June 2021</div>
						</div>
						<div className="ptic-three">
							<div className="ptic-three-text1">
								<div className="ptic-items1">
									<BsX size={20}/>
									<div className="ptic-items2">Packages</div>
								</div>
								<div className="ptic-items3">No package created</div>
							</div>
							<div className="ptic-three-text2">+ add new packages</div>
							<div className="ptic-three-text3">
							    <div className="ptic-items4">
							    	<BsX size={20}/>
							    	<div className="ptic-items4-text">Rundown</div>
							    </div>
							    <div className="ptic-items5">
							    	<BsX size={20}/>
							    	<div className="ptic-items5-text">Invoice</div>
							    </div>
							</div>
							<div className="ptic-three-text4">
								<div>+ add new rundown</div>
								<div className="ptic-items6">+ add new invoice</div>
							</div>
						</div>
					</div>
					<div className="project-custom-border"></div>
					<div className="projects-fourth-inner-container">
						<div className="ptic-one"><img src={Completed} alt=""/></div>
						<div className="ptic-two">
							<div className="ptic-two-text1">Leon & Stella</div>
							<div className="ptic-two-text2">28 March 2021</div>
						</div>
						<div className="ptic-fourth">
							<div className="ptic-fourth-text1">
								<div className="ptic-items1">
									<BsCheck size={20}/>
									<div className="ptic-items2">Packages</div>
								</div>
								<div className="ptic-items3">
									<ul className="ptic-items3-ul">
										<li>Full-day Wedding Photoshoot</li>
										<li>100 Edited Photos</li>
										<li>1 Frameless Canvas 40 x 60 cm</li>
										<li>All Photo Download</li>
									</ul>
								</div>
							</div>
							<div className="ptic-fourth-text2">
								<div className="pticft2-item1">
									<BiArrowToBottom size={20}/>
									<div>Download pdf</div>
								</div>
								<div className="pticft2-item2">
									<AiFillEdit size={20}/>
									<div>Edit</div>
								</div>
								<div className="pticft2-item3">Total: <span className="span">RP.12,500,000</span></div>
							</div>
							<div className="ptic-fourth-text3">
							    <div className="ptic-items4">
							    	<BsCheck size={20}/>
							    	<div className="ptic-items4-text">Rundown</div>
							    </div>
							    <div className="ptic-items5">
							    	<BsCheck size={20}/>
							    	<div>
							    		<div className="ptic-items5-text">Invoice</div>
							    		<div className="ptic-items5-text-1">Down Payment Invoice</div>
							    		<div className="ptic-items5-text-2">Full Payment Invoice</div>
							    	</div>
							    </div>
							</div>
							<div className="ptic-fourth-text4">
								<div className="ptic-items8">
									<div className="ptic-items7">
										<BiArrowToBottom size={20}/>
										<div>Download pdf</div>
									</div>
									<div>
										<AiFillEdit size={20}/>
									</div>
								</div>
								<div className="ptic-items6">+ add new invoice</div>
								<div className="ptic-items7">
									<BiArrowToBottom size={20}/>
									<div>Download pdf</div>
								</div>
								<div className="ptic-items7">
									<BiArrowToBottom size={20}/>
									<div>Download pdf</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>	
		</div>
		</>
	)
}

export default Projects