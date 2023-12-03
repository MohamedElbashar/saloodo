import axios from 'axios';
import { useState } from 'react';
import Logo from './helper/logo';

const SIGNIN_URL =
  'https://easy-generator-task-production.up.railway.app/api/auth/OAuth';
const AUTHENTICATE_URL =
  'https://easy-generator-task-production.up.railway.app/api/auth/authenticate';

function SignIn() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const signInResponse = await axios.post(SIGNIN_URL, formData);

      if (signInResponse.data) {
        const { code } = signInResponse.data;
        const token = await axios.post(AUTHENTICATE_URL, { code });

        if (token.data) {
          window.location.href = '/welcome';
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError('Invalid email or password');
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
            Sign in to your account
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
              {' '}
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
                  className=" flex w-full justify-center rounded-md bg-orange-400 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
                >
                  Sign in
                </button>
              </div>
            </form>
            {error && (
              <div className="mt-4 text-center text-red-500">
                <p>Email or password did not match</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
export default SignIn;
