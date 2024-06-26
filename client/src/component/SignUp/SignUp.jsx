import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../HeaderComponent/Header";
import AuthButton from "../AuthButtonCompo/AuthButton";
import { FaGoogle, FaGithub } from "react-icons/fa";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "react-loader-spinner"; // Import loader spinner

const SignUpPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false); // State for loading

  useEffect(() => {
    // Check if user is already authenticated and redirect if necessary
    // Add your authentication logic here if needed
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setIsLoading(true); // Set loading to true when form is submitted

    try {
      const response = await axios.post(`https://s51-kishore-capstone-resume-builder.onrender.com/signup`, {
        userEmail: formData.email,
        userPassword: formData.password,
      });
      console.log(response.data);
      if (response.status === 200) {
        toast.success("Registration successful! Please check your email for verification.");
        navigate(`/verify-email?token=${response.data.verificationToken}`);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error during registration. Please try again later.");
    } finally {
      setIsLoading(false); // Set loading to false after registration is complete
    }
  };

  return (
    <>
      <Header />
      <div className="login-div">
        <div className="log-div">
          <form className="form" onSubmit={handleSubmit}>
            <p className="title">Sign Up</p>
            <pre>Sign up to my website to get started</pre>

            <label>
              <input
                required
                type="email"
                className="input"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              <span>Email</span>
            </label>
            <label>
              <input
                required
                type="password"
                className="input"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
              <span>Password</span>
            </label>
            <label>
              <input
                required
                type="password"
                className="input"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              <span>Confirm Password</span>
            </label>
            <button type="submit" className="submit" disabled={isLoading}>
              {isLoading ? (
                <Loader type="ThreeDots" color="#00BFFF" height={20} width={20} />
              ) : (
                "Submit"
              )}
            </button>
            <p className="signin">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </form>
          <p className="continue-with">Or continue with</p>
          <div className="flex-row">
            <AuthButton
              Icon={FaGoogle}
              label={"Continue with Google"}
              provider={"GoogleAuthProvider"}
            />
            <AuthButton
              Icon={FaGithub}
              label={"Continue with Github"}
              provider={"GithubAuthProvider"}
            />
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default SignUpPage;
