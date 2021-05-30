import React from 'react'
import Header from '../components/Header'
import Planned from '../assets/img/dummy-img/status.png'
import Completed from '../assets/img/dummy-img/completed.png'
import { BsCheck, BsX } from 'react-icons/bs'
import { AiFillEdit } from 'react-icons/ai'
import { BiArrowToBottom } from 'react-icons/bi'
import { Link } from 'react-router-dom';
import HeaderUser from '../components/HeaderUser';

function Projects() {
	return (
		<>
		<Header/>
			<div className="projects-wrapper">
		        <HeaderUser
		          headerOneText="Projects"
		          headerOneButton="New Project"
		          headerOneLink="/projects/new"
		          headerSearchText="Search Projects"
		        />
				<div className="projects-main">
					<div className="projects-planned">
						<div className="p-logo">
							<img src={Planned}/>
						</div>
						<div className="p-title">Jamal & Denise</div>
						<div className="p-date">28 June 2021</div>
						<div className="p-text">
							<div className="p-packages">
								<div>
									<div className="flex">
										<BsX size={22} style={{color:"#0e203d", marginLeft:"-5px"}}/>
										<div className="p-packages-text">Packages</div>
									</div>
									<div className="p-packages-desc">No packages created</div>
								</div>
								<div className="p-addpackages">+ add new packages</div>
							</div>
							<div className="p-rundowninvoice">
								<div className="p-rundown">
									<div className="flex">
										<BsX size={22} style={{color:"#0e203d", marginLeft:"-5px"}}/>
										<div className="p-rundown-text">Rundown</div>
									</div>
									<div className="p-addrundown">+ add new rundown</div>
								</div>
								<div className="p-invoice">
									<div className="flex">
										<BsX size={22} style={{color:"#0e203d", marginLeft:"-5px"}}/>
										<div className="p-invoice-text">Invoice</div>
									</div>
									<div className="p-addinvoice">+ add new invoice</div>
								</div>
							</div>
						</div>
					</div>
					<div className="projects-custom-border"></div>
					<div className="projects-completed">
						<div className="c-logo">
							<img src={Completed} />
						</div>
						<div className="c-title">Leon & Stella</div>
						<div className="c-date">28 March 2021</div>
						<div className="c-text">
							<div className="c-packages">
								<div>
									<div className="flex">
										<BsCheck size={22} style={{color:"#0e203d", marginLeft:"-5px"}}/>
										<div className="c-packages-text">Packages</div>
									</div>
									<div className="c-packages-desc">
										<ul>
											<li>Full-day Wedding Photoshot</li>
											<li>100 Edited Photo</li>
											<li>1 Frameless Canvas 40cm x 60cm</li>
											<li>All Photo Download</li>
										</ul>
									</div>
								</div>
								<div>
									<div className="flex-edit">
										<BiArrowToBottom size={22} style={{color:"#0e203d", marginLeft:"-5px"}}/>
										<div className="download-text">Download pdf</div>
									</div>
									<div className="flex-edit">
										<AiFillEdit size={22} style={{color:"#0e203d", marginLeft:"-5px"}}/>
										<div className="download-text">Edit</div>
									</div>
									<div className="c-total">Total:<span>12,500,000</span></div>
								</div>
							</div>
							<div className="c-rundowninvoice">
								<div className="c-rundown">
									<div className="flex">
										<BsCheck size={22} style={{color:"#0e203d", marginLeft:"-5px"}}/>
										<div className="c-rundown-text">Rundown</div>
									</div>
									<div>
										<div className="flex">
											<BiArrowToBottom size={22} style={{color:"#0e203d", marginLeft:"-5px"}}/>
											<div className="download-text">Download pdf</div>
										</div>
										<div className="flex-edit">
											<AiFillEdit size={22} style={{color:"#0e203d", marginLeft:"-5px"}}/>
											<div className="download-text">Edit</div>
										</div>
									</div>
								</div>
								<div className="c-invoice">
									<div>
										<div className="flex">
											<BsCheck size={22} style={{color:"#0e203d", marginLeft:"-5px"}}/>
											<div className="c-invoice-text">Packages</div>
										</div>
										<div className="c-invoice-desc">
											<div>Down Payment Invoice</div>
											<div>Full Payment Invoice</div>
										</div>
									</div>
									<div>
										<div className="c-addinvoice">+ add new invoice</div>
										<div className="flex">
											<BiArrowToBottom size={22} style={{color:"#0e203d", marginLeft:"-5px"}}/>
											<div className="download-text">Download pdf</div>
										</div>
										<div className="flex">
											<BiArrowToBottom size={22} style={{color:"#0e203d", marginLeft:"-5px"}}/>
											<div className="download-text">Download pdf</div>
										</div>
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