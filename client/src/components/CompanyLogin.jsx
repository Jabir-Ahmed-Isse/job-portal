import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { AppContext } from '../context/appContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function CompanyLogin() {
  const navigate = useNavigate();
  const [state, setState] = useState('Login');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState('');
  const [isTextDataSubmitted, setIsTextDataSubmitted] = useState(false);

  const {
    setShowRecriuterLogin,
    backEndUrl,
    setCompanyToken,
    setCompanyData
  } = useContext(AppContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (state === 'Login') {
        const { data } = await axios.post(backEndUrl + '/api/company/login', {
          email,
          password,
        });

        if (data.success) {
          setCompanyData(data.company);
          setCompanyToken(data.token);
          localStorage.setItem('companyToken', data.token);
          setShowRecriuterLogin(false);
          navigate('/dashboard');
        } else {
          toast.error(data.message);
        }
      } else {
        // Sign Up logic
        if (!isTextDataSubmitted) {
          setIsTextDataSubmitted(true);
          return;
        }

        if (!image) {
          toast.error('Please upload your company logo.');
          return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('image', image);

        const { data } = await axios.post(backEndUrl + '/api/company/register', formData);

        if (data.success) {
          setCompanyData(data.company);
          setCompanyToken(data.token);
          localStorage.setItem('companyToken', data.token);
          toast.success("You registered successfully! 🎉");
          setShowRecriuterLogin(false);
          navigate('/dashboard');
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md relative">
        <button
          onClick={() => setShowRecriuterLogin(false)}
          className="absolute top-2 right-3 text-gray-500 hover:text-black text-xl font-bold"
        >
          &times;
        </button>

        <form onSubmit={onSubmitHandler} className="space-y-5">
          <h1 className="text-2xl font-semibold text-center text-black">
            Company {state}
          </h1>
          <p className="text-sm text-gray-500 text-center">
            {state === 'Login' ? 'Welcome back, please sign in' : 'Create your company account'}
          </p>

          {state === 'Sign Up' ? (
            <>
              {!isTextDataSubmitted ? (
                <>
                  {/* Step 1: Basic Info */}
                  <div className="flex items-center border rounded px-3 py-2">
                    <img src={assets.person_icon} alt="" className="w-5 h-5 mr-2" />
                    <input
                      onChange={e => setName(e.target.value)}
                      type="text"
                      value={name}
                      placeholder="Company name"
                      required
                      className="w-full outline-none text-sm"
                    />
                  </div>

                  <div className="flex items-center border rounded px-3 py-2">
                    <img src={assets.email_icon} alt="" className="w-5 h-5 mr-2" />
                    <input
                      onChange={e => setEmail(e.target.value)}
                      type="email"
                      value={email}
                      placeholder="Enter email"
                      required
                      className="w-full outline-none text-sm"
                    />
                  </div>

                  <div className="flex items-center border rounded px-3 py-2">
                    <img src={assets.lock_icon} alt="" className="w-5 h-5 mr-2" />
                    <input
                      onChange={e => setPassword(e.target.value)}
                      type="password"
                      value={password}
                      placeholder="Enter password"
                      required
                      className="w-full outline-none text-sm"
                    />
                  </div>
                </>
              ) : (
                <>
                  {/* Step 2: Image Upload */}
                  <label
                    htmlFor="image"
                    className="flex flex-col items-center justify-center gap-2 p-4 border-2 border-dashed border-gray-300 rounded-xl hover:bg-gray-100 transition cursor-pointer w-60 h-60 mx-auto"
                  >
                    <img
                      src={image ? URL.createObjectURL(image) : assets.upload_area}
                      alt="Upload"
                      className="w-20 h-20 object-contain"
                    />
                    <p className="text-gray-500 text-sm font-medium">Upload Company Logo</p>
                    <input
                      onChange={e => setImage(e.target.files[0])}
                      type="file"
                      id="image"
                      hidden
                      required
                    />
                  </label>
                </>
              )}
            </>
          ) : (
            <>
              {/* Login */}
              <div className="flex items-center border rounded px-3 py-2">
                <img src={assets.email_icon} alt="" className="w-5 h-5 mr-2" />
                <input
                  onChange={e => setEmail(e.target.value)}
                  type="email"
                  value={email}
                  placeholder="Enter email"
                  required
                  className="w-full outline-none text-sm"
                />
              </div>

              <div className="flex items-center border rounded px-3 py-2">
                <img src={assets.lock_icon} alt="" className="w-5 h-5 mr-2" />
                <input
                  onChange={e => setPassword(e.target.value)}
                  type="password"
                  value={password}
                  placeholder="Enter password"
                  required
                  className="w-full outline-none text-sm"
                />
              </div>
            </>
          )}

          {state === 'Login' && (
            <p className="text-sm text-green-300 my-4 cursor-pointer">Forgot password?</p>
          )}

          <button
            type="submit"
            className="w-full bg-lime-500 hover:bg-lime-600 text-white py-2 rounded"
          >
            {state === 'Login' ? 'Login' : isTextDataSubmitted ? 'Create Account' : 'Next'}
          </button>

          <p className="text-sm text-gray-600 mt-4">
            {state === 'Login' ? (
              <>
                Don't have an account?{' '}
                <span
                  onClick={() => {
                    setState('Sign Up');
                    setIsTextDataSubmitted(false);
                  }}
                  className="text-green-600 hover:underline cursor-pointer font-medium"
                >
                  Sign Up
                </span>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <span
                  onClick={() => {
                    setState('Login');
                    setIsTextDataSubmitted(false);
                  }}
                  className="text-green-600 hover:underline cursor-pointer font-medium"
                >
                  Login
                </span>
              </>
            )}
          </p>
        </form>
      </div>
    </div>
  );
}

export default CompanyLogin;
