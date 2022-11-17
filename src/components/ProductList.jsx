import React from 'react'
import {Link} from 'react-router-dom';
import axios from 'axios';
import useSWR, {useSWRConfig} from 'swr';


const ProductList = () => {

    // baseUrl API
    const baseUrl = process.env.REACT_APP_API_URL_1;
    // swrConfig
    const { mutate } = useSWRConfig();

    const fetcher = async () => {
        console.log(baseUrl);
        const response = await axios.get(`${baseUrl}s`);
        return response.data;
    }

    const {data} = useSWR('products', fetcher);
    if(!data) return <h2>Loading...</h2>;

    // DeleteProduct
    const deleteProduct = async (productId) => {
        await axios.delete(`${baseUrl}s/${productId}`);
        mutate('products');
    };

  return (
    <div className='flex flex-col mt-5'>
        <div className="w-full">
            <Link to="/add" className='bg-green-500 hover:bg-green-700 border border-slate-200 text-white font-bold py-2 px-4 rounded-lg'>Add New</Link>
            <div className="relative shadow rounded-lg mt-3">
                <table className="w-full text-sm text-left text-grey-500">
                    <thead className="text-xd text-gray-700 uppercase bg-gray-100">
                        <tr>
                            <th className='py-3 px-1 text-center'>No</th>
                            <th className='py-3 px-6'>Product</th>
                            <th className='py-3 px-6'> Price</th>
                            <th className='py-3 px-1 text-center'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((product, index) => (
                            <tr className='bg-white border-b' key={product.id}>
                                <td className='py-3 px-1 text-center'>{index+1}</td>
                                <td className='py-3 px-6 font-medium text-gray-900'>
                                    {product.name}
                                </td>
                                <td className='py-3 px-6'>{product.price}</td>
                                <td className='py-3 px-1 text-center'>
                                    <Link to={`/edit/${product.id}`} className="font-medium bg-blue-400 hover:bg-blue-500 px-3 py-1 rounded text-white mr-1">Edit</Link>
                                    <button onClick={() => deleteProduct(product.id)} className="font-medium bg-red-400 hover:bg-red-500 px-3 py-1 rounded text-white mr-1">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>
  )
}

export default ProductList