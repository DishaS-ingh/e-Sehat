import React, { useEffect, useState } from "react";
import closeButton from "../assets/close.svg";
import app from "../firebase/firebaseConfig";
import {
  getAuth,
  signOut,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import about from "../assets/about.jpg";
import consultation from "../assets/consultation.jpg";
import pharmacy from "../assets/pharmacy.jpg";
import records from "../assets/records.jpg";
import missionIcon from "../assets/mission-icon.png";
import visionIcon from "../assets/vision-icon.png";
import valuesIcon from "../assets/values-icon.png";
import defaultUser from "../assets/user.png";
import logoutButton from "../assets/logout.svg";

const HomePage = () => {
  const auth = getAuth(app);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, [auth]);

  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = "/";
  };

  const handleLogin = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setIsRegister(false);
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setError("");
  };

  const handleToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (isRegister && password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, password);

      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      handleCloseModal();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <nav className="fixed top-0 w-full bg-white bg-opacity-70 shadow-md z-50">
        <div className="container mx-auto flex justify-between items-center p-4">
          <div className="logo" onClick={() => (window.location.href = "/")}>
            <h1 className="text-2xl text-gray-800 font-bold">E-Sehat</h1>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <span
              className="text-gray-800 hover:text-blue-500 cursor-pointer"
              onClick={() => (window.location.href = "/")}
            >
              Home
            </span>
            <span
              className="text-gray-800 hover:text-blue-500 cursor-pointer"
              onClick={() => (window.location.href = "#services")}
            >
              Services
            </span>
            <span
              className="text-gray-800 hover:text-blue-500 cursor-pointer"
              onClick={() => (window.location.href = "#about")}
            >
              About
            </span>
            <span
              className="text-gray-800 hover:text-blue-500 cursor-pointer"
              onClick={() => (window.location.href = "#contact")}
            >
              Contact
            </span>
            {user ? (
              <>
                <img
                  src={defaultUser}
                  alt="User"
                  className="w-10 h-10 rounded-full ml-4"
                />
                <button
                  className="text-gray-800 hover:text-blue-500 ml-4"
                  onClick={handleLogout}
                >
                  <img src={logoutButton} alt="" />
                </button>
              </>
            ) : (
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200 ml-4"
                onClick={handleLogin}
              >
                Login
              </button>
            )}
          </div>
          <div className="md:hidden">
            <button
              onClick={handleToggleMenu}
              className="text-gray-800 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-md">
            <div className="flex flex-col items-center space-y-4 py-4">
              <span
                className="text-gray-800 hover:text-blue-500 cursor-pointer"
                onClick={() => (window.location.href = "/")}
              >
                Home
              </span>
              <span
                className="text-gray-800 hover:text-blue-500 cursor-pointer"
                onClick={() => (window.location.href = "#services")}
              >
                Services
              </span>
              <span
                className="text-gray-800 hover:text-blue-500 cursor-pointer"
                onClick={() => (window.location.href = "#about")}
              >
                About
              </span>
              <span
                className="text-gray-800 hover:text-blue-500 cursor-pointer"
                onClick={() => (window.location.href = "#contact")}
              >
                Contact
              </span>
              {user ? (
                <>
                  <button
                    className="text-gray-800 hover:text-blue-500"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
                  onClick={handleLogin}
                >
                  Login
                </button>
              )}
            </div>
          </div>
        )}
      </nav>

      <header
        id="home"
        className="hero h-screen bg-cover bg-center relative"
        style={{ backgroundImage: `url("/src/assets/hero.jpg")` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="flex items-center justify-center text-center text-white h-full relative z-10">
          <div className="p-8">
            <h1 className="text-5xl mb-4 font-extrabold animate-fade-in">
              Welcome to E-Sehat
            </h1>
            <p className="text-2xl mb-8 animate-fade-in">
              Online Health for All
            </p>
            <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200 animate-bounce">
              Get Started
            </button>
          </div>
        </div>
      </header>

      <section id="services" className="py-16 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-semibold mb-8">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="service-card p-4 bg-white shadow-md rounded-lg cursor-pointer" onClick={() => window.location.href = "/consultation"}>
              <img
                src={consultation}
                alt="Consultation"
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <h3 className="text-xl font-semibold mt-4">Consultation</h3>
              <p className="mt-2 text-gray-600">
                Get expert advice from our experienced doctors.
              </p>
            </div>
            <div className="service-card p-4 bg-white shadow-md rounded-lg cursor-pointer" onClick={() => window.open("https://www.1mg.com/", '_blank')} >
              <img
                src={pharmacy}
                alt="Pharmacy"
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <h3 className="text-xl font-semibold mt-4">Pharmacy</h3>
              <p className="mt-2 text-gray-600">
                Order medicines online and get them delivered to your doorstep.
              </p>
            </div>
            <div className="service-card p-4 bg-white shadow-md rounded-lg cursor-pointer" onClick={() => window.location.href = "/find-hospitals"}>
              <img
                src={records}
                alt="Records"
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <h3 className="text-xl font-semibold mt-4">Search for Top Hospitals Nearby</h3>
              <p className="mt-2 text-gray-600">
                Find the best hospitals and healthcare providers near you.
              </p>
            </div>
            <div className="service-card p-4 bg-white shadow-md rounded-lg cursor-pointer">
              <img
                src={about}
                alt="About"
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <h3 className="text-xl font-semibold mt-4">Digitalized Health Documents</h3>
              <p className="mt-2 text-gray-600">
              Access your medical records anytime, anywhere.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-16 bg-blue-50">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-semibold mb-8 text-blue-600">
            About Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="about-card p-6 bg-white shadow-md rounded-lg">
              <img
                src={missionIcon}
                alt="Mission"
                className="w-16 h-16 mx-auto mb-4"
              />
              <h3 className="text-2xl font-semibold mb-2">Our Mission</h3>
              <p className="text-gray-700">
                To provide accessible and affordable healthcare services to
                everyone. We aim to bridge the gap between patients and
                healthcare providers through innovative technology and
                compassionate care.
              </p>
            </div>
            <div className="about-card p-6 bg-white shadow-md rounded-lg">
              <img
                src={visionIcon}
                alt="Vision"
                className="w-16 h-16 mx-auto mb-4"
              />
              <h3 className="text-2xl font-semibold mb-2">Our Vision</h3>
              <p className="text-gray-700">
                To leverage technology to improve health outcomes and make
                healthcare more convenient for all. We envision a world where
                everyone has access to quality healthcare, regardless of their
                location or financial status.
              </p>
            </div>
            <div className="about-card p-6 bg-white shadow-md rounded-lg">
              <img
                src={valuesIcon}
                alt="Values"
                className="w-16 h-16 mx-auto mb-4"
              />
              <h3 className="text-2xl font-semibold mb-2">Our Values</h3>
              <p className="text-gray-700">
                Compassion, Integrity, and Excellence in all that we do. We are
                committed to providing the highest standard of care and ensuring
                that our patients feel valued and respected.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-16 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-semibold mb-8">Contact Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="contact-info p-6 bg-white shadow-md rounded-lg">
              <h3 className="text-2xl font-semibold mb-4">Get in Touch</h3>
              <p className="text-gray-700 mb-4">
                Have any questions or need assistance? Reach out to us at:
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Email:</strong>{" "}
                <a href="mailto:support@e-sehat.com" className="text-blue-500">
                  support@e-sehat.com
                </a>
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Phone:</strong> +1 234 567 890
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Address:</strong> 123 Health St, Wellness City, HW 45678
              </p>
            </div>
            <div className="contact-form p-6 bg-white shadow-md rounded-lg">
              <h3 className="text-2xl font-semibold mb-4">Send Us a Message</h3>
              <form>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="message" className="block text-gray-700">
                    Message
                  </label>
                  <textarea
                    id="message"
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                    rows="4"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 bg-gray-800 text-white text-center">
        <p>&copy; 2024 E-Sehat. All rights reserved.</p>
      </footer>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="relative bg-white p-8 rounded-lg shadow-lg w-96">
            <button
              className="absolute top-2 right-2"
              onClick={handleCloseModal}
            >
              <img
                src={closeButton}
                alt="Close"
                className="w-6 h-6"
                style={{ filter: "brightness(1) invert(1)" }}
              />
            </button>
            <h2 className="text-2xl font-semibold mb-4">
              {isRegister ? "Register" : "Login"}
            </h2>
            <form onSubmit={handleSubmit}>
              {isRegister && (
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              )}
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full p-2 border border-gray-300 rounded mt-1"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {isRegister && (
                <div className="mb-4">
                  <label
                    htmlFor="confirmPassword"
                    className="block text-gray-700"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    id="confirmPassword"
                    className="w-full p-2 border border-gray-300 rounded mt-1"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              )}
              {error && <p className="text-red-500 mb-4">{error}</p>}
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200 w-full"
              >
                {isRegister ? "Register" : "Login"}
              </button>
            </form>
            <p className="mt-4 text-center">
              {isRegister
                ? "Already have an account?"
                : "Don't have an account?"}{" "}
              <span
                className="text-blue-500 hover:text-blue-700 cursor-pointer"
                onClick={() => setIsRegister(!isRegister)}
              >
                {isRegister ? "Login" : "Register"}
              </span>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;
