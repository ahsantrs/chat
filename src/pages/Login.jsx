import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { setUserDetails } from '../store/reducer/auth';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const dispatch=useDispatch()
  const navigation =useNavigate()
  const formik = useFormik({
    initialValues: {
      user_id: '',
      username: '',
      avatar: ''
    },
    validationSchema: Yup.object({
      user_id: Yup.string()
        .required('User ID is required'),
        username: Yup.string()
        .required('Name is required'),
      avatar: Yup.string().required('Avatar URL is required')
    }),
    onSubmit: async values => {
      try {
        const response = await axios.post('http://localhost:3000/users', values);
        console.log('Form submitted successfully:', response.data);
       
        dispatch(setUserDetails({token:response.data?.token,userData:response.data?.user}));
        navigation('/')
        // Handle the response as needed
      } catch (error) {
        console.error('Error submitting the form:', error);
        // Handle the error as needed
      }
    }
  });

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-xs">
        <h2 className="text-center text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="user_id">
              User ID
            </label>
            <input
              id="user_id"
              name="user_id"
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.user_id}
            />
            {formik.touched.user_id && formik.errors.user_id ? (
              <p className="text-red-500 text-xs italic">{formik.errors.user_id}</p>
            ) : null}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              name="username"
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
            />
            {formik.touched.username && formik.errors.username ? (
              <p className="text-red-500 text-xs italic">{formik.errors.username}</p>
            ) : null}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="avatar">
              Avatar URL
            </label>
            <input
              id="avatar"
              name="avatar"
              type="text"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.avatar}
            />
            {formik.touched.avatar && formik.errors.avatar ? (
              <p className="text-red-500 text-xs italic">{formik.errors.avatar}</p>
            ) : null}
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
