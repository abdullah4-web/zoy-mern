import React from "react";
import Carousel from "react-bootstrap/Carousel";
import "./BannerHero.css";

function BannerHero() {
  return (
    <Carousel
      id="template-mo-zay-hero-carousel"
      interval={1000}
      indicators
      pause={false}
      nextLabel=""
      prevLabel=""
      nextIcon={<span className="carousel-control-next-icon" />}
      prevIcon={<span className="carousel-control-prev-icon" />}
    >
      <Carousel.Item>
        <div className="container">
          <div className="row p-5">
            <div className="mx-auto col-md-8 col-lg-6 order-lg-last">
              <img className="img-fluid" src="./assets/img/banner_img_01.jpg" alt="" />
            </div>
            <div className="col-lg-6 mb-0 d-flex align-items-center">
              <div className="text-align-left align-self-center">
                
                <h3 className="h2 text-success">Welcome to Our Online Store</h3>
                <p>
                  Welcome to Our Online Store! In our Hero Section, we invite you to explore a world of possibilities. 
                  With a wide range of products available, our online store brings you the latest trends and must-have items. 
                  Whether you're searching for fashion-forward clothing, stylish accessories, trendy home decor, 
                  or cutting-edge electronics, we've got you covered.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="container">
          <div className="row p-5">
            <div className="mx-auto col-md-8 col-lg-6 order-lg-last">
              <img className="img-fluid" src="./assets/img/banner_img_02.jpg" alt="banner" />
            </div>
            <div className="col-lg-6 mb-0 d-flex align-items-center">
              <div className="text-align-left">
               
                <h3 className="h2 text-success">Welcome to Our Online Store</h3>
                <p>
                  Our curated selection ensures that you'll find high-quality products that meet your needs and reflect your unique style. 
                  Take advantage of the convenience of online shopping and 
                  discover everything you're looking for in one place. 
                  From fashion enthusiasts to tech-savvy individuals, our store caters to all
                </p>
              </div>
            </div>
          </div>
        </div>
      </Carousel.Item>
      <Carousel.Item>
        <div className="container">
          <div className="row p-5">
            <div className="mx-auto col-md-8 col-lg-6 order-lg-last">
              <img className="img-fluid" src="./assets/img/banner_img_03.jpg" alt="BannerImage" />
            </div>
            <div className="col-lg-6 mb-0 d-flex align-items-center">
              <div className="text-align-left">
               
                <h3 className="h2 text-success">Welcome to Our Online Store</h3>
                <p>
                  Experience the joy of shopping from the comfort of your own home. Browse through our extensive collection, select your favorites, 
                  and add them to your cart. With just a few clicks, you'll be on your way to elevating your style and enhancing your lifestyle.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Carousel.Item>
    </Carousel>
  );
}

export default BannerHero;
