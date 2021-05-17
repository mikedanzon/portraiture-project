import React from 'react'
import Dummy2 from '../assets/img/dummy-img/dummy2.png'
import Header from '../components/Header'
import Dummy3 from '../assets/img/dummy-img/dummy3.png'
import Status from '../assets/img/dummy-img/status.png'
import Baby from '../assets/img/dummy-img/baby.png'
import { BsCardImage } from 'react-icons/bs'
import { BsBoxArrowInDown } from 'react-icons/bs'
import { AiOutlineEye } from 'react-icons/ai'
import { AiFillEdit } from 'react-icons/ai'
import { AiOutlineCheck } from 'react-icons/ai'
import { AiOutlineClose } from 'react-icons/ai'

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
		<div className="dinner-container">
			<div className="dinner-quick">Quick Access</div>
			<div className="dinner-rcollections">
				<div className="dinner-rcollections-title">Recent Collections</div>
				<div className="dinner-rcollections-cards-container">
					<div className="dinner-rcollections-cards">
						<div><img src={Dummy3} alt=""/></div>
						<div className="dinner-rcollections-cards-info">
							<div className="dinner-rcollections-cards-info-1">
								<div>
									<div className="rcollections-text1">Justin & Stella</div>
									<div className="rcollections-text2">28 March 2021</div>
								</div>
								<div className="rcollections-preview">
									<AiOutlineEye className="rcollections-preview-img"/>
									<div className="rcollections-text3">Preview</div>
								</div>
							</div>
							<div className="dinner-rcollections-cards-info-2">
								<div className="rcollections-imgdow">
									<BsCardImage className="rcollections-img"/>
									<div className="rcollections-text4">13</div>
									<BsBoxArrowInDown className="rcollections-dow"/>
									<div className="rcollections-text5">3</div>
								</div>
								<div className="rcollections-edit">
									<AiFillEdit className="rcollections-edit-img"/>
									<div className="rcollections-text6">Edit</div>
								</div>
							</div>
						</div>
					</div>

						<div className="dinner-rcollections-cards">
						<div><img src={Dummy3} alt=""/></div>
						<div className="dinner-rcollections-cards-info">
							<div className="dinner-rcollections-cards-info-1">
								<div>
									<div className="rcollections-text1">Justin & Stella</div>
									<div className="rcollections-text2">28 March 2021</div>
								</div>
								<div className="rcollections-preview">
									<AiOutlineEye className="rcollections-preview-img"/>
									<div className="rcollections-text3">Preview</div>
								</div>
							</div>
							<div className="dinner-rcollections-cards-info-2">
								<div className="rcollections-imgdow">
									<BsCardImage className="rcollections-img"/>
									<div className="rcollections-text4">13</div>
									<BsBoxArrowInDown className="rcollections-dow"/>
									<div className="rcollections-text5">3</div>
								</div>
								<div className="rcollections-edit">
									<AiFillEdit className="rcollections-edit-img"/>
									<div className="rcollections-text6">Edit</div>
								</div>
							</div>
						</div>
					</div>
						<div className="dinner-rcollections-cards">
						<div><img src={Dummy3} alt=""/></div>
						<div className="dinner-rcollections-cards-info">
							<div className="dinner-rcollections-cards-info-1">
								<div>
									<div className="rcollections-text1">Justin & Stella</div>
									<div className="rcollections-text2">28 March 2021</div>
								</div>
								<div className="rcollections-preview">
									<AiOutlineEye className="rcollections-preview-img"/>
									<div className="rcollections-text3">Preview</div>
								</div>
							</div>
							<div className="dinner-rcollections-cards-info-2">
								<div className="rcollections-imgdow">
									<BsCardImage className="rcollections-img"/>
									<div className="rcollections-text4">13</div>
									<BsBoxArrowInDown className="rcollections-dow"/>
									<div className="rcollections-text5">3</div>
								</div>
								<div className="rcollections-edit">
									<AiFillEdit className="rcollections-edit-img"/>
									<div className="rcollections-text6">Edit</div>
								</div>
							</div>
						</div>
					</div>
						<div className="dinner-rcollections-cards">
						<div><img src={Dummy3} alt=""/></div>
						<div className="dinner-rcollections-cards-info">
							<div className="dinner-rcollections-cards-info-1">
								<div>
									<div className="rcollections-text1">Justin & Stella</div>
									<div className="rcollections-text2">28 March 2021</div>
								</div>
								<div className="rcollections-preview">
									<AiOutlineEye className="rcollections-preview-img"/>
									<div className="rcollections-text3">Preview</div>
								</div>
							</div>
							<div className="dinner-rcollections-cards-info-2">
								<div className="rcollections-imgdow">
									<BsCardImage className="rcollections-img"/>
									<div className="rcollections-text4">13</div>
									<BsBoxArrowInDown className="rcollections-dow"/>
									<div className="rcollections-text5">3</div>
								</div>
								<div className="rcollections-edit">
									<AiFillEdit className="rcollections-edit-img"/>
									<div className="rcollections-text6">Edit</div>
								</div>
							</div>
						</div>
					</div>
						<div className="dinner-rcollections-cards">
						<div><img src={Dummy3} alt=""/></div>
						<div className="dinner-rcollections-cards-info">
							<div className="dinner-rcollections-cards-info-1">
								<div>
									<div className="rcollections-text1">Justin & Stella</div>
									<div className="rcollections-text2">28 March 2021</div>
								</div>
								<div className="rcollections-preview">
									<AiOutlineEye className="rcollections-preview-img"/>
									<div className="rcollections-text3">Preview</div>
								</div>
							</div>
							<div className="dinner-rcollections-cards-info-2">
								<div className="rcollections-imgdow">
									<BsCardImage className="rcollections-img"/>
									<div className="rcollections-text4">13</div>
									<BsBoxArrowInDown className="rcollections-dow"/>
									<div className="rcollections-text5">3</div>
								</div>
								<div className="rcollections-edit">
									<AiFillEdit className="rcollections-edit-img"/>
									<div className="rcollections-text6">Edit</div>
								</div>
							</div>
						</div>
					</div>
						<div className="dinner-rcollections-cards">
						<div><img src={Dummy3} alt=""/></div>
						<div className="dinner-rcollections-cards-info">
							<div className="dinner-rcollections-cards-info-1">
								<div>
									<div className="rcollections-text1">Justin & Stella</div>
									<div className="rcollections-text2">28 March 2021</div>
								</div>
								<div className="rcollections-preview">
									<AiOutlineEye className="rcollections-preview-img"/>
									<div className="rcollections-text3">Preview</div>
								</div>
							</div>
							<div className="dinner-rcollections-cards-info-2">
								<div className="rcollections-imgdow">
									<BsCardImage className="rcollections-img"/>
									<div className="rcollections-text4">13</div>
									<BsBoxArrowInDown className="rcollections-dow"/>
									<div className="rcollections-text5">3</div>
								</div>
								<div className="rcollections-edit">
									<AiFillEdit className="rcollections-edit-img"/>
									<div className="rcollections-text6">Edit</div>
								</div>
							</div>
						</div>
					</div>

				</div>
				<div className="dinner-rcollections-seeall">see all collections</div>
			</div>
			<div className="dinner-propac-contanier">
				<div className="dinner-rprojects">
					<div className="dinner-rprojects-title">Recent Projects</div>
					<div className="dinner-rprojects-cards-container">
						<div className="dinner-rprojects-cards">
							<div className="dinner-rprojects-cards-info">
								<div className="dinner-rprojects-cards-info1">
									<div>
										<div className="rprojects-text1">Justin & Stella</div>
										<div className="rprojects-text2">28 March 2021</div>
									</div>
									<div>
										<div><img src={Status} alt=""/></div>
									</div>
								</div>
								<div className="dinner-rprojects-cards-info2">
									<div className="rprojects-checks">
										<AiOutlineCheck className="rprojects-checks-img"/>
										<div className="rprojects-checks-text">Packages</div>
										<AiOutlineCheck className="rprojects-checks-img"/>
										<div className="rprojects-checks-text">Rundown</div>
										<AiOutlineCheck className="rprojects-checks-img"/>
										<div className="rprojects-checks-text">Invoice</div>
									</div>
									<div className="rprojects-edit">
										<AiFillEdit className="rprojects-edit-img"/>
										<div className="rprojects-edit-text">Edit</div>
									</div>
								</div>
							</div>
						</div>

						<div className="dinner-rprojects-cards">
							<div className="dinner-rprojects-cards-info">
								<div className="dinner-rprojects-cards-info1">
									<div>
										<div className="rprojects-text1">Justin & Stella</div>
										<div className="rprojects-text2">28 March 2021</div>
									</div>
									<div>
										<div><img src={Status} alt=""/></div>
									</div>
								</div>
								<div className="dinner-rprojects-cards-info2">
									<div className="rprojects-checks">
										<AiOutlineCheck className="rprojects-checks-img"/>
										<div className="rprojects-checks-text">Packages</div>
										<AiOutlineCheck className="rprojects-checks-img"/>
										<div className="rprojects-checks-text">Rundown</div>
										<AiOutlineCheck className="rprojects-checks-img"/>
										<div className="rprojects-checks-text">Invoice</div>
									</div>
									<div className="rprojects-edit">
										<AiFillEdit className="rprojects-edit-img"/>
										<div className="rprojects-edit-text">Edit</div>
									</div>
								</div>
							</div>
						</div>
						<div className="dinner-rprojects-cards">
							<div className="dinner-rprojects-cards-info">
								<div className="dinner-rprojects-cards-info1">
									<div>
										<div className="rprojects-text1">Justin & Stella</div>
										<div className="rprojects-text2">28 March 2021</div>
									</div>
									<div>
										<div><img src={Status} alt=""/></div>
									</div>
								</div>
								<div className="dinner-rprojects-cards-info2">
									<div className="rprojects-checks">
										<AiOutlineCheck className="rprojects-checks-img"/>
										<div className="rprojects-checks-text">Packages</div>
										<AiOutlineCheck className="rprojects-checks-img"/>
										<div className="rprojects-checks-text">Rundown</div>
										<AiOutlineCheck className="rprojects-checks-img"/>
										<div className="rprojects-checks-text">Invoice</div>
									</div>
									<div className="rprojects-edit">
										<AiFillEdit className="rprojects-edit-img"/>
										<div className="rprojects-edit-text">Edit</div>
									</div>
								</div>
							</div>
						</div>

					</div>
					<div className="dinner-rprojects-seeall">see all projects</div>
				</div>
				<div className="dinner-rpackages">
					<div className="dinner-rpackages-title">Recent Packages</div>
					<div className="dinner-rpackages-cards-container">
						<div className="dinner-rpackages-cards">
							<div><img src={Baby} alt=""/></div>
							<div className="dinner-rpackages-cards-info">
								<div className="dinner-rpackages-cards-info1">
									<div className="rpackages-text1">Baby Photo Session</div>
									<div className="rpackages-text2">3 Items</div>
								</div>
								<div className="dinner-rpackages-cards-info2">
									<div className="rpackages-text3">Rp.2,500,000</div>
									<AiFillEdit className="rpackages-edit"/>
									<div className="rpackages-text4">Edit</div>
								</div>
							</div>
						</div>

						<div className="dinner-rpackages-cards">
							<div><img src={Baby} alt=""/></div>
							<div className="dinner-rpackages-cards-info">
								<div className="dinner-rpackages-cards-info1">
									<div className="rpackages-text1">Baby Photo Session</div>
									<div className="rpackages-text2">3 Items</div>
								</div>
								<div className="dinner-rpackages-cards-info2">
									<div className="rpackages-text3">Rp.2,500,000</div>
									<AiFillEdit className="rpackages-edit"/>
									<div className="rpackages-text4">Edit</div>
								</div>
							</div>
						</div>
						<div className="dinner-rpackages-cards">
							<div><img src={Baby} alt=""/></div>
							<div className="dinner-rpackages-cards-info">
								<div className="dinner-rpackages-cards-info1">
									<div className="rpackages-text1">Baby Photo Session</div>
									<div className="rpackages-text2">3 Items</div>
								</div>
								<div className="dinner-rpackages-cards-info2">
									<div className="rpackages-text3">Rp.2,500,000</div>
									<AiFillEdit className="rpackages-edit"/>
									<div className="rpackages-text4">Edit</div>
								</div>
							</div>
						</div>


					</div>
					<div className="dinner-rpackages-seeall">see all projects</div>
				</div>
			</div>
		</div>
		</>
	)
}

export default Dashboard