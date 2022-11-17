import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const AddProduct = () => {

    const baseUrl = process.env.REACT_APP_API_URL_1+'s';

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const navigate = useNavigate();
    
    const saveProduct = async (e) => {
        e.preventDefault();
        await axios.post(baseUrl, {
            name: name,
            price: parseInt(price)
        });
        navigate('/');
    }

  return (
    <div className='max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow shadow-slate-300'>
        <form onSubmit={saveProduct} className="my10">
            <div className="flex flex-col">
                <div className="mb-5">
                    <label className="font-bold text-slate-700">
                        Product Name
                    </label>
                    <input type="text" className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"  placeholder='Product Name'
                    value={name}
                    onChange={(e)=>{setName(e.target.value)}}
                    />
                </div>
                <div className="mb-5">
                    <label className="font-bold text-slate-700">
                        Price
                    </label>
                    <input type="number" className="w-full py-3 mt-1 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"  placeholder='Price'
                    value={price}
                    onChange={(e)=>{setPrice(e.target.value)}}
                    />
                </div>
                <button type="submit" className="w-full py-3 font-bold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg border-indigo-500 hover:shadow">Save</button>
            </div>
        </form>
    </div>
  )
}


export default AddProduct;