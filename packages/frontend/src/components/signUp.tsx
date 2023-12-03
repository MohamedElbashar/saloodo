import axios from 'axios';
import { useState } from 'react';
import Logo from './helper/logo';

const SIGNUP_URL =
  'https://easy-generator-task-production.up.railway.app/api/auth/signup';
const AUTHENTICATE_URL =
  'https://easy-generator-task-production.up.railway.app/api/auth/authenticate';

const SignUp = () => {
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const signUpResponse = await axios.post(SIGNUP_URL, formData);

      if (signUpResponse.data) {
        const { code } = signUpResponse.data;
        const token = await axios.post(AUTHENTICATE_URL, { code });

        if (token.data) {
          window.location.href = '/welcome';
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error);
        setError(error.response?.data.error.message);
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Logo main={false} />
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create New Account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form
              className="space-y-6"
              action="#"
              method="POST"
              onSubmit={handleSubmit}
            >
              <div>
                <label
                  htmlFor="userName"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  User Name
                </label>
                <div className="mt-2">
                  <input
                    id="userName"
                    name="userName"
                    type="text"
                    placeholder="User Name"
                    autoComplete="text"
                    required
                    value={formData.userName}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-orange-300 placeholder:text-gray-400 hover:ring-orange-600 focus:ring-2 focus:ring-inset focus:ring-orange-300 focus-visible:outline-orange-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email address"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-orange-300  placeholder:text-gray-400 hover:ring-orange-600 focus:ring-2 focus:ring-inset focus:ring-orange-300 focus-visible:outline-orange-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    autoComplete="current-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-orange-300 placeholder:text-gray-400 hover:ring-orange-600 focus:ring-2 focus:ring-inset focus:ring-orange-300 focus-visible:outline-orange-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-orange-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
                >
                  Sign Up
                </button>
              </div>
            </form>

            {error && (
              <div className="mt-4 text-center text-red-500">
                <p>{error}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
