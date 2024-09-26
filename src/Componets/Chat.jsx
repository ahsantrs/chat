import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import io from 'socket.io-client';
const Chat = ({rommData}) => {
    const [message,setMessage]=useState()
    const [messageList,setMessageList]=useState()
    const { userData,token } = useSelector((state) => state.authReducer);
    const socket = io('http://localhost:3000/', {
      extraHeaders: {
        Authorization: `Bearer ${token}` 
      }
    });
    useEffect(() => {
  
  
      socket.emit('join_room', { room_id: rommData.room_id });
  
      socket.on('receive_message', (newMessage) => {
        setMessage(prevMessages => [...prevMessages, newMessage]);
      });
  
      return () => {
        socket.off('receive_message');
        socket.disconnect();
      };
    }, [rommData.room_id]);

    useEffect(() => {
        // Load user listings on component mount
        axios.get(`http://localhost:3000/chat/room-messages?room_id=${rommData?.room_id}&page=1&limit=5`)
          .then(response => {
            setMessageList(response.data);
          })
          .catch(error => console.error('Error fetching user listings:', error));
    
      }, []);


      
  const sendMessage = () => {

    if (message !== '') {
      
      socket.emit('send_message', {
        room_id: rommData?.room_id,
        message,
        sender_id: userData.user_id,
        product_id: rommData?.product?.product_id,
        module_slug: rommData?.module_slug
      });
      setMessage('');
    }
  };
  return (
    <div className='w-full border'>
    <div className='flex flex-col h-[400px] justify-between'>
      <div className= ' h-full overflow-y-auto'>
        {messageList?.data?.map((msg, index) => (
          <div key={index} className={`flex ${userData.user_id === msg.sender_id ?  "justify-end":"justify-start" } m-4`}>
            <p className={`${userData.user_id === msg.sender_id ? "bg-[#FF6846]" : "bg-[#f7f7f7]"} rounded p-3`}>{msg.message}</p>
          </div>
        ))}
       
      </div>
      <div className='w-full  p-4'>
        <div  className='flex border h-12   '>
        <input type="text" placeholder="Type a message..." value={message} className='w-full border-none pl-4 focus:outline-none ' onChange={(e) => setMessage(e.target.value)} />
        <button onClick={()=>sendMessage()} className='bg-blue-500 w-[80px] text-white'>Send</button>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Chat
