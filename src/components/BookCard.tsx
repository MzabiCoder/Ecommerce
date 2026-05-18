import { Link } from "react-router-dom"

type Props = {
    id: string
    title: string
    price: number
    images: string[]
    rating: number
    category: string
    isFeatured?: boolean
}

const BookCard: React.FC<Props> = ({ id, title, price, images, rating, category, isFeatured }) => {
    return (
        <div className={`group relative bg-slate-800/40 border border-white/[0.07] rounded-2xl overflow-hidden hover:-translate-y-1.5 hover:border-indigo-500/30 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 cursor-pointer h-full`}>
            <Link to={`/products/${id}`} className="flex flex-col h-full">
                {/* Image */}
                <div className={`relative overflow-hidden bg-slate-900 ${isFeatured ? 'h-72' : 'h-52'}`}>
                    <img
                        src={images[0]}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/10 to-transparent" />

                    {/* Category badge */}
                    <span className="absolute top-3 left-3 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md text-slate-300 border border-white/10">
                        {category}
                    </span>

                    {/* Rating badge */}
                    <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10">
                        <svg className="w-3 h-3 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-xs font-bold text-amber-400">{rating.toFixed(1)}</span>
                    </div>

                    {isFeatured && (
                        <span className="absolute bottom-3 left-3 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-indigo-500/80 backdrop-blur-md text-white">
                            Featured
                        </span>
                    )}
                </div>

                {/* Info */}
                <div className={`flex flex-col justify-between flex-1 p-4 gap-3 ${isFeatured ? 'p-5' : ''}`}>
                    <h2 className={`font-semibold text-slate-100 line-clamp-2 leading-snug ${isFeatured ? 'text-base' : 'text-sm'}`}>
                        {title}
                    </h2>
                    <div className="flex items-center justify-between">
                        <span className={`font-bold text-white ${isFeatured ? 'text-xl' : 'text-base'}`}>
                            ${price.toFixed(2)}
                        </span>
                        <span className="flex items-center gap-1 text-xs font-semibold text-indigo-400 group-hover:text-indigo-300 transition-colors">
                            View
                            <svg className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                        </span>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default BookCard