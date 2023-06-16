import React from "react";

function AboutSection() {
  return (
    <section className="bg-success py-5">
      <div className="container">
        <div className="row align-items-center py-5">
          <div className="col-md-8 text-white">
            <h1>About Us</h1>
            <p>
            Welcome to our online shopping destination! At our store, we are committed to delivering an enjoyable and convenient 
            shopping experience. Our mission is to provide you with a seamless online platform where you can explore, discover, and 
            purchase a wide range of products that meet your needs and preferences.
            We take pride in offering a diverse selection of items across various categories. 
            From fashion-forward clothing and beauty products to stylish home decor and cutting-edge electronics,
             we have carefully curated our store to cater to different tastes and lifestyles.
            </p>
          </div>
          <div className="col-md-4">
            <img src="assets/img/about-hero.svg" alt="About Hero" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
