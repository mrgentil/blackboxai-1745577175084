import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BuildingOfficeIcon, UserIcon } from '@heroicons/react/24/outline';

export default function Register() {
  const [accountType, setAccountType] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    website: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // TODO: Implement actual registration logic here
      console.log('Registration attempt with:', { ...formData, accountType });
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Failed to register. Please try again.');
    }
  };

  return (
    <div className="flex min-h-[80vh] flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
            Sign in
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
          {!accountType ? (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Choose account type</h3>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setAccountType('business')}
                  className="relative flex flex-col items-center justify-center rounded-lg border border-gray-300 p-4 hover:border-primary-500 hover:bg-primary-50"
                >
                  <BuildingOfficeIcon className="h-8 w-8 text-gray-900" />
                  <span className="mt-2 font-medium">Business</span>
                  <span className="mt-1 text-xs text-gray-500">I want to work with influencers</span>
                </button>
                <button
                  type="button"
                  onClick={() => setAccountType('influencer')}
                  className="relative flex flex-col items-center justify-center rounded-lg border border-gray-300 p-4 hover:border-primary-500 hover:bg-primary-50"
                >
                  <UserIcon className="h-8 w-8 text-gray-900" />
                  <span className="mt-2 font-medium">Influencer</span>
                  <span className="mt-1 text-xs text-gray-500">I am a content creator</span>
                </button>
              </div>
            </div>
          ) : (
            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="rounded-md bg-red-50 p-4">
                  <div className="text-sm text-red-700">{error}</div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900">
                    First name
                  </label>
                  <div className="mt-2">
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      className="input-field"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-gray-900">
                    Last name
                  </label>
                  <div className="mt-2">
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      className="input-field"
                    />
                  </div>
                </div>
              </div>

              {accountType === 'business' && (
                <div>
                  <label htmlFor="companyName" className="block text-sm font-medium leading-6 text-gray-900">
                    Company name
                  </label>
                  <div className="mt-2">
                    <input
                      id="companyName"
                      name="companyName"
                      type="text"
                      required
                      value={formData.companyName}
                      onChange={handleChange}
                      className="input-field"
                    />
                  </div>
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>
              </div>

              {accountType === 'business' && (
                <div>
                  <label htmlFor="website" className="block text-sm font-medium leading-6 text-gray-900">
                    Website
                  </label>
                  <div className="mt-2">
                    <input
                      id="website"
                      name="website"
                      type="url"
                      value={formData.website}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="https://"
                    />
                  </div>
                </div>
              )}

              <div>
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium leading-6 text-gray-900">
                  Confirm password
                </label>
                <div className="mt-2">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="input-field"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                >
                  Create account
                </button>
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => setAccountType('')}
                  className="flex w-full justify-center text-sm text-gray-600 hover:text-gray-900"
                >
                  ← Choose different account type
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
