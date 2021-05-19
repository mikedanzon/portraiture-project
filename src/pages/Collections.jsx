import React from 'react'
import Header from '../components/Header'
import { CgOptions } from 'react-icons/cg'
import Dummy3 from '../assets/img/dummy-img/dummy3.png'
import { BsCardImage, BsBoxArrowInDown } from 'react-icons/bs'
import { AiOutlineEye, AiFillEdit } from 'react-icons/ai'

function Collections() {
	return (
		<>
		<Header />
		<div className="collections-container">
			<div className="collections-inner-container">
				<div className="collection-first-inner-container">
						<div className="collections-title">Collections</div>
						<button className="collections-button">New Collection</button>
				</div>
				<div className="collection-second-inner-container">
					<input className="collections-searchbar" type="search" placeholder="Search collections"/>
					<div className="collections-filter">
						<div><CgOptions/></div>
						<div>Filter</div>
					</div>
				</div>
				<div className="collections-third-inner-container">
					<div className="collections-cards">
						<div><img className="collections-cards-img" src={Dummy3} alt="" /></div>
						<div className="collections-cards-text-1">
							<div>
								<div>Justin & Stella</div>
								<div className="collections-cards-text-1-date">28 March 2021</div>
							</div>
							<div>
								<div className="collections-cards-text-1-preview">
									<AiOutlineEye className="cct1p-img" />
									<div className="cct1p-text">Preview</div>
								</div>
							</div>
						</div>
						<div className="collections-cards-text-2">
							<div className="collections-cards-text-2-imgdow">
								<BsCardImage className="cct2p-img"/>
								<div>13</div>
								<BsBoxArrowInDown className="cct2p-img2"/>
								<div>3</div>
							</div>
							<div className="collections-cards-text-2-edit">		
								<AiFillEdit className="cct2p-img3"/>
								<div className="cct2p-text">Edit</div>
							</div>
						</div>
					</div>
					<div className="collections-cards">
						<div><img className="collections-cards-img" src={Dummy3} alt="" /></div>
						<div className="collections-cards-text-1">
							<div>
								<div>Justin & Stella</div>
								<div className="collections-cards-text-1-date">28 March 2021</div>
							</div>
							<div>
								<div className="collections-cards-text-1-preview">
									<AiOutlineEye className="cct1p-img" />
									<div className="cct1p-text">Preview</div>
								</div>
							</div>
						</div>
						<div className="collections-cards-text-2">
							<div className="collections-cards-text-2-imgdow">
								<BsCardImage className="cct2p-img"/>
								<div>13</div>
								<BsBoxArrowInDown className="cct2p-img2"/>
								<div>3</div>
							</div>
							<div className="collections-cards-text-2-edit">		
								<AiFillEdit className="cct2p-img3"/>
								<div className="cct2p-text">Edit</div>
							</div>
						</div>
					</div>
					<div className="collections-cards">
						<div><img className="collections-cards-img" src={Dummy3} alt="" /></div>
						<div className="collections-cards-text-1">
							<div>
								<div>Justin & Stella</div>
								<div className="collections-cards-text-1-date">28 March 2021</div>
							</div>
							<div>
								<div className="collections-cards-text-1-preview">
									<AiOutlineEye className="cct1p-img" />
									<div className="cct1p-text">Preview</div>
								</div>
							</div>
						</div>
						<div className="collections-cards-text-2">
							<div className="collections-cards-text-2-imgdow">
								<BsCardImage className="cct2p-img"/>
								<div>13</div>
								<BsBoxArrowInDown className="cct2p-img2"/>
								<div>3</div>
							</div>
							<div className="collections-cards-text-2-edit">		
								<AiFillEdit className="cct2p-img3"/>
								<div className="cct2p-text">Edit</div>
							</div>
						</div>
					</div>
					<div className="collections-cards">
						<div><img className="collections-cards-img" src={Dummy3} alt="" /></div>
						<div className="collections-cards-text-1">
							<div>
								<div>Justin & Stella</div>
								<div className="collections-cards-text-1-date">28 March 2021</div>
							</div>
							<div>
								<div className="collections-cards-text-1-preview">
									<AiOutlineEye className="cct1p-img" />
									<div className="cct1p-text">Preview</div>
								</div>
							</div>
						</div>
						<div className="collections-cards-text-2">
							<div className="collections-cards-text-2-imgdow">
								<BsCardImage className="cct2p-img"/>
								<div>13</div>
								<BsBoxArrowInDown className="cct2p-img2"/>
								<div>3</div>
							</div>
							<div className="collections-cards-text-2-edit">		
								<AiFillEdit className="cct2p-img3"/>
								<div className="cct2p-text">Edit</div>
							</div>
						</div>
					</div>
						<div className="collections-cards">
						<div><img className="collections-cards-img" src={Dummy3} alt="" /></div>
						<div className="collections-cards-text-1">
							<div>
								<div>Justin & Stella</div>
								<div className="collections-cards-text-1-date">28 March 2021</div>
							</div>
							<div>
								<div className="collections-cards-text-1-preview">
									<AiOutlineEye className="cct1p-img" />
									<div className="cct1p-text">Preview</div>
								</div>
							</div>
						</div>
						<div className="collections-cards-text-2">
							<div className="collections-cards-text-2-imgdow">
								<BsCardImage className="cct2p-img"/>
								<div>13</div>
								<BsBoxArrowInDown className="cct2p-img2"/>
								<div>3</div>
							</div>
							<div className="collections-cards-text-2-edit">		
								<AiFillEdit className="cct2p-img3"/>
								<div className="cct2p-text">Edit</div>
							</div>
						</div>
					</div>
						<div className="collections-cards">
						<div><img className="collections-cards-img" src={Dummy3} alt="" /></div>
						<div className="collections-cards-text-1">
							<div>
								<div>Justin & Stella</div>
								<div className="collections-cards-text-1-date">28 March 2021</div>
							</div>
							<div>
								<div className="collections-cards-text-1-preview">
									<AiOutlineEye className="cct1p-img" />
									<div className="cct1p-text">Preview</div>
								</div>
							</div>
						</div>
						<div className="collections-cards-text-2">
							<div className="collections-cards-text-2-imgdow">
								<BsCardImage className="cct2p-img"/>
								<div>13</div>
								<BsBoxArrowInDown className="cct2p-img2"/>
								<div>3</div>
							</div>
							<div className="collections-cards-text-2-edit">		
								<AiFillEdit className="cct2p-img3"/>
								<div className="cct2p-text">Edit</div>
							</div>
						</div>
					</div>
						<div className="collections-cards">
						<div><img className="collections-cards-img" src={Dummy3} alt="" /></div>
						<div className="collections-cards-text-1">
							<div>
								<div>Justin & Stella</div>
								<div className="collections-cards-text-1-date">28 March 2021</div>
							</div>
							<div>
								<div className="collections-cards-text-1-preview">
									<AiOutlineEye className="cct1p-img" />
									<div className="cct1p-text">Preview</div>
								</div>
							</div>
						</div>
						<div className="collections-cards-text-2">
							<div className="collections-cards-text-2-imgdow">
								<BsCardImage className="cct2p-img"/>
								<div>13</div>
								<BsBoxArrowInDown className="cct2p-img2"/>
								<div>3</div>
							</div>
							<div className="collections-cards-text-2-edit">		
								<AiFillEdit className="cct2p-img3"/>
								<div className="cct2p-text">Edit</div>
							</div>
						</div>
					</div>
						<div className="collections-cards">
						<div><img className="collections-cards-img" src={Dummy3} alt="" /></div>
						<div className="collections-cards-text-1">
							<div>
								<div>Justin & Stella</div>
								<div className="collections-cards-text-1-date">28 March 2021</div>
							</div>
							<div>
								<div className="collections-cards-text-1-preview">
									<AiOutlineEye className="cct1p-img" />
									<div className="cct1p-text">Preview</div>
								</div>
							</div>
						</div>
						<div className="collections-cards-text-2">
							<div className="collections-cards-text-2-imgdow">
								<BsCardImage className="cct2p-img"/>
								<div>13</div>
								<BsBoxArrowInDown className="cct2p-img2"/>
								<div>3</div>
							</div>
							<div className="collections-cards-text-2-edit">		
								<AiFillEdit className="cct2p-img3"/>
								<div className="cct2p-text">Edit</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		</>
	)
}

export default Collections