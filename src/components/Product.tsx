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
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <Spinner />
            </div>
        )
    }
    return (
        <div className="min-h-screen bg-slate-950 p-8">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors mb-8 group"
            >
                <svg className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Back to catalog
            </button>

            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Image */}
                <div className="bg-slate-800/60 border border-white/8 rounded-2xl flex items-center justify-center p-8 aspect-square">
                    <img
                        src={product.images[0]}
                        alt={product.title}
                        className="object-contain w-full h-full"
                    />
                </div>

                {/* Details */}
                <div className="flex flex-col justify-center gap-6">
                    <h1 className="text-2xl font-bold text-white leading-snug">{product.title}</h1>
                    <p className="text-slate-400 text-sm leading-relaxed">{product.description}</p>

                    <div className="flex items-center gap-4">
                        <span className="text-3xl font-bold text-white">${product.price.toFixed(2)}</span>
                        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/25">
                            <svg className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="text-amber-400 text-xs font-semibold">{product.rating.toFixed(1)}</span>
                        </div>
                    </div>

                    <button className="mt-2 w-full py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-semibold text-sm transition-all shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    )
}