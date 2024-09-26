import React, { useState, Fragment } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { Dialog, Transition } from '@headlessui/react';
import { ChatBubbleLeftEllipsisIcon } from '@heroicons/react/16/solid';
import { useSelector } from 'react-redux';
import axios from 'axios';
import LoaderIcon from '../assets/LoaderIcon';
import { useNavigate } from 'react-router-dom';
const SendMessageModal = ({ product }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { userData } = useSelector((state:any) => state.authReducer);
const navigation =useNavigate()
  const initialValues = {
    product_id:String(product?.id || ''),
    product_name: product?.title,
    product_uuid:String(product?.id || ''),
    product_media: product?.image,
    module_id: '1',
    module_slug: 'shop',
    sender_id: userData?.user_id,
    sender_username: userData?.username,
    sender_avatar: userData?.avatar,
    receiver_avatar: 'avatar.com',
    receiver_id: '',
    receiver_username: '',
    room_id: '',
    message: '',
  };

  const validationSchema = Yup.object({
    room_id: Yup.string().required('Room ID is required'),
    receiver_id: Yup.string().required('Receiver ID is required'),
    receiver_username: Yup.string().required('Receiver username is required'),
    message: Yup.string().required('Message is required'),
  });

  const handleSubmit = async (values) => {
    setIsLoading(true); // Start loading
    try {
      const response = await axios.post('http://localhost:3000/conversation', values); // Change the endpoint as necessary
      console.log(response.data); // Assuming you want to log the response
      setIsOpen(false);
      navigation('/chat')
    } catch (error) {
      console.error('Failed to send message:', error);
    }
    setIsLoading(false); // End loading
  };

  return (
    <div>
      <div onClick={() => setIsOpen(true)} className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 cursor-pointer"><ChatBubbleLeftEllipsisIcon className='h-5 w-5' /></span>
      </div>

      <Transition show={isOpen} as={Fragment}>
        <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto bg-black opacity-95" onClose={() => setIsOpen(false)}>
          <div className="min-h-screen px-4 text-center">
            <span className="inline-block h-screen align-middle" aria-hidden="true">&#8203;</span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                  Create Message
                </Dialog.Title>
                <Formik enableReinitialize initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                  {({ errors, touched }) => (
                     <Form className="mt-2">
                     <Field name="room_id" className="border bg-[#f7f7f7] h-10 w-full rounded-full pl-3 mt-3" placeholder="Room ID" />
                     {touched.room_id && errors.room_id && <p className="text-red-500 text-xs">{errors.room_id}</p>}

                     <Field name="receiver_id" className="border bg-[#f7f7f7] h-10 w-full rounded-full pl-3 mt-3" placeholder="Receiver ID" />
                     {touched.receiver_id && errors.receiver_id && <p className="text-red-500 text-xs">{errors.receiver_id}</p>}

                     <Field name="receiver_username" className="border bg-[#f7f7f7] h-10 w-full rounded-full pl-3 mt-3" placeholder="Receiver Username" />
                     {touched.receiver_username && errors.receiver_username && <p className="text-red-500 text-xs">{errors.receiver_username}</p>}

                     <Field as="textarea" name="message" className="border bg-[#f7f7f7]  w-full rounded pt-3 pl-3 mt-3" placeholder="Message" />
                     {touched.message && errors.message && <p className="text-red-500 text-xs">{errors.message}</p>}

                     <div className="mt-4 flex justify-between w-full">
                     <button type="button" className="bg-red-500 px-4 py-1 rounded  " onClick={() => setIsOpen(false)}>Cancel</button>
                       <button type="submit" className="bg-blue-500 w-[80px] flex justify-center items-center px-4 py-1 rounded mr-2">{isLoading?<LoaderIcon />:'Send'}</button>
                      
                     </div>
                   </Form>
                  )}
                </Formik>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default SendMessageModal;
