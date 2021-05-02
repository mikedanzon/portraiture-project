import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import HeaderHome from '../components/HeaderHome';
import HomeMini from '../assets/img/home/home-minimalist.png';
import HomeClass from '../assets/img/home/home-classic.png';
import HomeDark from '../assets/img/home/home-dark.png';
import HomeLaptop from '../assets/img/home/home-laptop.png';
import Home9 from '../assets/img/home/home-image9.png';
import Collection from '../assets/img/home/collection.png';
import Projects from '../assets/img/home/projects.png';
import Package from '../assets/img/home/package.png';
import Footer from '../components/Footer';


function Home() {
  const [image, setImage] = useState();

  return (
    <>
      <HeaderHome />
      <div className="port-home">
        <div className="home-template">
          <div className="home-template-text">
            <div className="home-template-text-1">Create Professional</div>
            <div className="home-template-text-2">Client Photo Galleries</div>
          </div>
          <div className="home-template-mid">
            <div className="home-template-mid-left">
              <div className="mid-left-1">Build your online presence!</div>
              <div className="mid-left-2">
                Dedicated online photo gallery for each of your clients, with
                beaufitul cover and layout right out of the box.
              </div>
            </div>
            <div className="home-template-mid-center">
              {image === 'classic' ? (
                <img src={HomeClass} alt="imageClassic" />
              ) : image === 'dark' ? (
                <img src={HomeDark} alt="imageDark" />
              ) : (
                <img src={HomeMini} alt="imageMinimalist" />
              )}
            </div>
            <div className="home-template-mid-right">
              <div className="mid-right-text">Our featured template</div>
              <div className="mid-right-mode">
                <div className="home-template-minimalist">
                  <button onClick={() => setImage(false)}>Minimalist</button>
                </div>
                <div className="home-template-classic">
                  <button onClick={() => setImage('classic')}>Classic</button>
                </div>
                <div className="home-template-dark-mode">
                  <button onClick={() => setImage('dark')}>Dark Mode</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="home-template-accs">
          <div className="home-template-accs-1">
            <span className="home-template-accs-2">
              Accessible from all accross devices
            </span>
            <p />
            it come with full responsive design to ensure
            <br />
            usability and client satisfaction
          </div>
        </div>
        <div className="port-home-slideone">
          <div className="slideone-img">
            <img src={HomeLaptop} alt="imageLaptop" />
          </div>
          <div className="slideone-text">
            <div className="slideone-text-1">Digital Delivery</div>
            <div className="slideone-text-2">
              Deliver via <span className="color-gold">Download</span>
            </div>
            <div className="slideone-text-3">
              Allow clients download their photos directly from your
              professional gallery
            </div>
          </div>
        </div>
        <div className="port-home-slidetwo">
          <div className="slidetwo-text">
            <div className="slidetwo-text-1">Manage your project</div>
            <div className="slidetwo-text-2">
              Provide <span className="color-gold">Seamless</span> Service
            </div>
            <div className="slidetwo-text-3">
              From creating your package to invoice, all there for maintain
              project going smoothly
            </div>
          </div>
          <div className="slidetwo-img">
            <img src={Home9} alt="image9" />
          </div>
        </div>
        <div className="home-product" id="product">
          <div className="home-product-text">Our products</div>
          <div className="home-product-list">
            <div className="home-product-collection">
              <div className="collection-1">
                <img src={Collection} alt="productsImage" /> Collection
              </div>
              <div className="collection-2">
                The easy and fun way to build a stunning photography website,
                portofolio and blog
              </div>
              <div className="collection-3">
                <Link to="/">learn more</Link>
              </div>
            </div>
            <div className="home-product-line mr-3"></div>
            <div className="home-product-projects">
              <div className="projects-1">
                <img src={Projects} alt="productsImage" /> Projects
              </div>
              <div className="projects-2">
                The easy and fun way to build a stunning photography website,
                portofolio and blog
              </div>
              <div className="projects-3">
                <Link to="/">learn more</Link>
              </div>
            </div>
            <div className="home-product-line mr-3"></div>
            <div className="home-product-package">
              <div className="package-1">
                <img src={Package} alt="productsImage" /> Package
              </div>
              <div className="package-2">
                The easy and fun way to build a stunning photography website,
                portofolio and blog
              </div>
              <div className="package-3">
                <Link to="/">learn more</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
