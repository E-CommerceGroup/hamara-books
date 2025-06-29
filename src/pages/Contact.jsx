import { useState } from 'react';
import { FiMail, FiPhone, FiMapPin, FiSend, FiMessageCircle, FiHeadphones } from 'react-icons/fi';
import toast from 'react-hot-toast';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate form submission
    setTimeout(() => {
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setLoading(false);
    }, 1000);
  };

  const contactInfo = [
    {
      icon: FiPhone,
      title: 'Phone',
      details: ['+91 98765 43210', '+91 11 4567 8901'],
      description: 'Mon-Sat from 9am to 7pm IST'
    },
    {
      icon: FiMail,
      title: 'Email',
      details: ['info@hamarabooks.in', 'support@hamarabooks.in'],
      description: 'Online support'
    },
    {
      icon: FiMapPin,
      title: 'Address',
      details: ['123 Book Street, Connaught Place', 'New Delhi - 110001, India'],
      description: 'Visit our store'
    }
  ];

  const faqs = [
    {
      question: 'How long does shipping take?',
      answer: 'Standard shipping takes 3-7 business days across India. Express shipping is available for 1-3 business days in major cities.'
    },
    {
      question: 'Can I return a book?',
      answer: 'Yes, we accept returns within 15 days of purchase. Books must be in original condition.'
    },
    {
      question: 'Do you offer Cash on Delivery (COD)?',
      answer: 'Yes! We offer Cash on Delivery for orders across India. COD charges may apply for orders below ₹500.'
    },
    {
      question: 'How can I track my order?',
      answer: 'Once your order ships, you\'ll receive a tracking number via SMS and email to monitor your package.'
    },
    {
      question: 'Do you have a physical store?',
      answer: 'Yes! Visit us at Connaught Place, New Delhi. We\'re open Monday-Saturday, 10am-8pm.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept UPI, Credit/Debit Cards, Net Banking, Wallets, and Cash on Delivery.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-warm-brown-600 to-warm-brown-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Get in Touch
            </h1>
            <p className="text-xl text-warm-brown-100 max-w-2xl mx-auto">
              We're here to help! Reach out to us with any questions, concerns, or just to say hello.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {contactInfo.map((info, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="w-16 h-16 bg-warm-brown-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <info.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{info.title}</h3>
              {info.details.map((detail, i) => (
                <p key={i} className="text-gray-600 font-medium">{detail}</p>
              ))}
              <p className="text-sm text-gray-500 mt-2">{info.description}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Send us a Message</h2>
              <p className="text-gray-600">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-brown-500 focus:border-transparent"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-brown-500 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <select
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-brown-500 focus:border-transparent"
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="order">Order Support</option>
                  <option value="shipping">Shipping Question</option>
                  <option value="return">Returns & Refunds</option>
                  <option value="technical">Technical Support</option>
                  <option value="partnership">Partnership Inquiry</option>
                  <option value="bulk">Bulk Orders</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-warm-brown-500 focus:border-transparent resize-none"
                  placeholder="Tell us how we can help you..."
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center px-6 py-3 bg-warm-brown-500 text-white font-semibold rounded-lg hover:bg-warm-brown-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? (
                  'Sending...'
                ) : (
                  <>
                    <FiSend className="w-5 h-5 mr-2" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>

          {/* FAQ Section */}
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-600">
                Find quick answers to common questions about our services.
              </p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                    <FiMessageCircle className="w-5 h-5 mr-2 text-warm-brown-500" />
                    {faq.question}
                  </h3>
                  <p className="text-gray-600 pl-7">{faq.answer}</p>
                </div>
              ))}
            </div>

            {/* Additional Support */}
            <div className="mt-8 bg-soft-beige-50 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <FiHeadphones className="w-6 h-6 text-warm-brown-500 mr-2" />
                <h3 className="text-lg font-semibold text-gray-900">Need Immediate Help?</h3>
              </div>
              <p className="text-gray-600 mb-4">
                Our customer support team is available Monday through Saturday, 9am-7pm IST.
                For urgent matters, please call us directly.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="tel:+919876543210"
                  className="inline-flex items-center justify-center px-4 py-2 bg-warm-brown-500 text-white font-medium rounded-lg hover:bg-warm-brown-600 transition-colors"
                >
                  <FiPhone className="w-4 h-4 mr-2" />
                  Call Now
                </a>
                <a
                  href="mailto:info@hamarabooks.in"
                  className="inline-flex items-center justify-center px-4 py-2 border border-warm-brown-500 text-warm-brown-600 font-medium rounded-lg hover:bg-warm-brown-50 transition-colors"
                >
                  <FiMail className="w-4 h-4 mr-2" />
                  Email Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;