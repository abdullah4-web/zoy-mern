import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

const Contact = () => {
  const { register, handleSubmit, reset } = useForm();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onSubmit = async (data) => {
    try {
      const response = await fetch('https://formspree.io/f/xknaawae', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Handle successful form submission
        setIsSubmitted(true);
        reset(); // Reset form fields after successful submission
      } else {
        // Handle form submission error
        console.log('Form submission error');
      }
    } catch (error) {
      console.log('Form submission error:', error);
    }
  };

  return (
    <> <div className='bg-light'>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13308.164058616816!2d71.03094282476157!3d33.500310015465374!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38d85b3d235ed267%3A0x9968958b53c83773!2z2KzYp9mF2Lkg2YXYs9is2K8g2Kjar9m52YgoQmFnYXRvKQ!5e0!3m2!1sen!2s!4v1683355829318!5m2!1sen!2s"
        title="Google Maps"
        width="100%"
        height="400"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>

      <div className="container-fluid bg-light py-5" style={{ marginTop: '-20px' }}>
        <div className="col-md-6 m-auto text-center">
          <h1 className="h1" style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>
            Contact Us
          </h1>
          <p style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>
            Feel free to reach out to us using the contact form below or via email, and our team will be happy to assist you with any inquiries or feedback you may have.
          </p>
        </div>
      </div>

      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="row">
              <div className="col-md-6 bg-light p-4">
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit(onSubmit)} role="form">
                    <div className="mb-3">
                      <label htmlFor="inputname" style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>
                        Name
                      </label>
                      <input
                        type="text"
                        className="form-control mt-1"
                        id="name"
                        name="name"
                        placeholder="Name"
                        {...register('name', { required: true })}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="inputsubject" style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>
                        Subject
                      </label>
                      <input
                        type="text"
                        className="form-control mt-1"
                        id="subject"
                        name="subject"
                        placeholder="Subject"
                        {...register('subject', { required: true })}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="inputemail" style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control mt-1"
                        id="email"
                        name="email"
                        placeholder="Email"
                        {...register('email', { required: true })}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="inputmessage" style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>
                        Message
                      </label>
                      <textarea
                        className="form-control mt-1"
                        id="message"
                        name="message"
                        placeholder="Message"
                        rows={8}
                        defaultValue={''}
                        {...register('message', { required: true })}
                      />
                    </div>
                    <div className="text-center mt-2">
                      <button type="submit" className="btn btn-success btn-lg px-3">
                        Send Your Query
                      </button>
                    </div> 
                  </form>
                ) : (
                  <div className="text-center">
                    <h2 style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>Thanks for contacting us!</h2>
                    <p style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>
                      We will respond to you as soon as possible.
                    </p>
                    <Link to="/" style={{ fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>
                      Go To Home
                    </Link>
                  </div>
                )}
              </div>
              <div className="col-md-6 bg-light p-4">
                <div className="col-md-12 text-center">
                  <h4 className="mb-4">Contact Information</h4>
                  <p>Bagato</p>
                  <p>Hangu, KPK</p>
                  <p>Pakistan</p>
                  <p>Email: sadiquiabdullah4@gmail.com</p>
                  <p>Phone: +92 332555745</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default Contact;
