import { ChatBubbleLeftEllipsisIcon } from '@heroicons/react/16/solid';
import React, { useEffect, useState } from 'react';
import Navbar from '../Componets/Navbar';
import SendMessageModal from '../model/SendMessage';

const ProductPage = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then(json => setProducts(json))
            .catch(err => console.error('Error fetching products:', err));
    }, []);

    if (products.length === 0) return <div>Loading...</div>;

    return (
        <>
        <Navbar />
        <div className="flex flex-wrap justify-center mt-12 items-center">
            {products.map((product:any) => (
                <div key={product.id} className="max-w-sm rounded-md  overflow-hidden shadow-lg bg-white m-4">
                    <div className='flex justify-center items-center '>
                    <img className=" w-[300px] h-[300px] " src={product.image} alt={product.title} />
                    </div>
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">{product.title}</div>
                        <p className="text-gray-700 text-base">
              {product.description.length > 100 ? `${product.description.substring(0, 100)}...` : product.description}
            </p>
                    </div>
                    <div className='flex justify-between items-center'>
                    <div className="px-6 pt-4 pb-2">
                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">${product.price}</span>
                    </div>
                  
                    <SendMessageModal product={product} />
                    </div>
                </div>
            ))}
        </div>
        </>
    );
};

export default ProductPage;
