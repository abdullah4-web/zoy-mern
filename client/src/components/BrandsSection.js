import React from "react";
import { Carousel } from "react-bootstrap";

function BrandsSection() {
  return (
    <section className="bg-light py-5">
      <div className="container my-6">
        <div className="row text-center py-3">
          <div className="col-lg-6 m-auto">
            <h1 className="h1">Our Brands</h1>
            <p>
            Discover a collection of top-notch brands at our shopping website, carefully curated to bring you the best in quality and style."
            </p>
          </div>
          <div className="col-lg-9 m-auto">
            <Carousel
              interval={1000} // Autoplay speed in milliseconds (3 seconds)
              prevIcon={<span className="text-success fas fa-chevron-left" />}
              nextIcon={<span className="text-success fas fa-chevron-right" />}
            >
              <Carousel.Item>
                <div className="row">
                  <div className="col-3 p-md-5">
                    <a href="#"><img className="img-fluid brand-img" src="assets/img/brand_01.png" alt="Brand Logo" /></a>
                  </div>
                  <div className="col-3 p-md-5">
                    <a href="#"><img className="img-fluid brand-img" src="assets/img/brand_02.png" alt="Brand Logo" /></a>
                  </div>
                  <div className="col-3 p-md-5">
                    <a href="#"><img className="img-fluid brand-img" src="assets/img/brand_03.png" alt="Brand Logo" /></a>
                  </div>
                  <div className="col-3 p-md-5">
                    <a href="#"><img className="img-fluid brand-img" src="assets/img/brand_04.png" alt="Brand Logo" /></a>
                  </div>
                </div>
              </Carousel.Item>
              <Carousel.Item>
                <div className="row">
                  <div className="col-3 p-md-5">
                    <a href="#"><img className="img-fluid brand-img" src="assets/img/brand_01.png" alt="Brand Logo" /></a>
                  </div>
                  <div className="col-3 p-md-5">
                    <a href="#"><img className="img-fluid brand-img" src="assets/img/brand_02.png" alt="Brand Logo" /></a>
                  </div>
                  <div className="col-3 p-md-5">
                    <a href="#"><img className="img-fluid brand-img" src="assets/img/brand_03.png" alt="Brand Logo" /></a>
                  </div>
                  <div className="col-3 p-md-5">
                    <a href="#"><img className="img-fluid brand-img" src="assets/img/brand_04.png" alt="Brand Logo" /></a>
                  </div>
                </div>
              </Carousel.Item>
              <Carousel.Item>
                <div className="row">
                  <div className="col-3 p-md-5">
                    <a href="#"><img className="img-fluid brand-img" src="assets/img/brand_01.png" alt="Brand Logo" /></a>
                  </div>
                  <div className="col-3 p-md-5">
                    <a href="#"><img className="img-fluid brand-img" src="assets/img/brand_02.png" alt="Brand Logo" /></a>
                  </div>
                  <div className="col-3 p-md-5">
                    <a href="#"><img className="img-fluid brand-img" src="assets/img/brand_03.png" alt="Brand Logo" /></a>
                  </div>
                  <div className="col-3 p-md-5">
                    <a href="#"><img className="img-fluid brand-img" src="assets/img/brand_04.png" alt="Brand Logo" /></a>
                  </div>
                </div>
              </Carousel.Item>
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
}

export default BrandsSection;
