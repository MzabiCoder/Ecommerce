import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Spinner } from './spinner'

interface Product {
    id: number
    title: string
    description: string
    images: string[]
    price: number
    rating: number
}

export const Product: React.FC<Product> = (props) => {

    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    const [product, steProduct] = useState<Product | null>(null)

    useEffect(() => {
        const fetchProduct = async () => {
            if (id) {
                try {
                    const { data } = await axios(`https://dummyjson.com/products/${id}`)

                    setTimeout(() => {
                        steProduct(data)
                    }, 200)

                } catch (error) {
                    throw new Error(`API error ${error}`)
                }

            }
        }
        fetchProduct()
    }, [product])
    if (!product) {
        return <Spinner />
    }
    return (
        <div className='p-5 w-[60%]'>
            <button onClick={() => navigate(-1)} className='rounded mb-5 px-4 py-2 bg-black text-white '>
                Back
            </button>
            <img className="w-[70%] h-[70%]" src={product.images[0]} alt={product.title} />
            <h1 className='text-2xl mb-4 font-bold'>{product.title}</h1>
            <p className="mb-4 text-gray-700 w-[70%]">{product.description}</p>
            <div className="flex">
                <p>Price : {product.price}</p>
                <p className="ml-10">Rating : {product.rating}</p>
            </div>
        </div>
    )
}