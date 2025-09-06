import React, { useState } from "react";

const BookDemo = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    employmentType: '',
    email: '',
    city: '',
    organizationName: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    // Basic validation
    if (!formData.name || !formData.phone || !formData.employmentType || !formData.email || !formData.city) {
      alert('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);

    try {
      // Send data to Flask backend API
      const response = await fetch('http://localhost:5000/api/submit-demo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit data');
      }

      const result = await response.json();
      console.log('User data saved:', result);
      
      // Show success popup instead of alert
      setShowSuccessPopup(true);
      
      // Hide popup after 3 seconds
      setTimeout(() => {
        setShowSuccessPopup(false);
      }, 3000);
      
      // Reset form
      setFormData({
        name: '',
        phone: '',
        employmentType: '',
        email: '',
        city: '',
        organizationName: ''
      });

    } catch (error) {
      console.error('Error submitting form:', error);
      alert(`Error: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative">
      {/* Success Popup */}
      <div 
        className={`fixed top-8 right-0 z-50 transform transition-transform duration-500 ease-in-out ${
          showSuccessPopup 
            ? 'translate-x-0' 
            : 'translate-x-full'
        }`}
      >
        <div className="bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg border-2 border-green-400 min-w-[250px] mr-8">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
              <svg 
                className="w-4 h-4 text-green-500" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M5 13l4 4L19 7" 
                />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-lg">Submitted!</h3>
              <p className="text-green-100 text-sm">Demo request sent successfully</p>
            </div>
          </div>
        </div>
      </div>

      <div 
        className="min-h-screen text-white px-4 sm:px-6 py-16 overflow-x-hidden mt-16"
        style={{
          backgroundColor: '#000000',
          backgroundImage: `radial-gradient(circle at 50% 50%, rgba(147, 51, 234, 0.3) 0%, rgba(147, 51, 234, 0.15) 25%, rgba(147, 51, 234, 0.05) 40%, transparent 60%)`
        }}
      >
        <div className="max-w-4xl mx-auto">
          <h1 className="text-center text-4xl md:text-5xl font-bold text-purple-500 mb-12">
            Book A Demo
          </h1>

          <div className="bg-[#00000000] border border-gray-600 rounded-2xl p-8 transition">
            <div className="space-y-6">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-lg font-semibold text-purple-400 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Enter your full name"
                />
              </div>

              {/* Phone Number Field */}
              <div>
                <label htmlFor="phone" className="block text-lg font-semibold text-purple-400 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Enter your phone number"
                />
              </div>

              {/* Employment Type Field */}
              <div>
                <label htmlFor="employmentType" className="block text-lg font-semibold text-purple-400 mb-2">
                  Employment Type *
                </label>
                <select
                  id="employmentType"
                  name="employmentType"
                  value={formData.employmentType}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <option value="">Select employment type</option>
                  <option value="self-employed">Self Employed</option>
                  <option value="business">Business</option>
                </select>
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-lg font-semibold text-purple-400 mb-2">
                  Working Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Enter your working email"
                />
              </div>

              {/* City Field */}
              <div>
                <label htmlFor="city" className="block text-lg font-semibold text-purple-400 mb-2">
                  City *
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Enter your city"
                />
              </div>

              {/* Organization Name Field */}
              <div>
                <label htmlFor="organizationName" className="block text-lg font-semibold text-purple-400 mb-2">
                  Organization Name
                </label>
                <input
                  type="text"
                  id="organizationName"
                  name="organizationName"
                  value={formData.organizationName}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full px-4 py-3 bg-gray-900 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Enter your organization name (optional)"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/25 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? 'Submitting...' : 'Book Demo'}
                </button>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-gray-700">
              <p className="text-gray-400 text-center text-sm">
                By submitting this form, you agree to our terms and conditions. 
                Our team will contact you within 24 hours to schedule your personalized demo.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDemo;