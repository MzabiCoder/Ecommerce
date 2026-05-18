import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type Product = {
    id: number
    title: string
    description: string
    price: number
    rating: number
    category: string
    images: string[]
}

type Props = {
    product: Product | null
    onClose: () => void
}

export const ProductModal = ({ product, onClose }: Props) => {
    const [activeImage, setActiveImage] = useState(0)

    useEffect(() => {
        setActiveImage(0)
    }, [product?.id])

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
        document.addEventListener('keydown', onKey)
        return () => document.removeEventListener('keydown', onKey)
    }, [onClose])

    const ratingStars = product ? Math.round(product.rating) : 0

    return (
        <AnimatePresence>
            {product && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        key="backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.22 }}
                        onClick={onClose}
                        className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md"
                    />

                    {/* Panel wrapper (centers the modal) */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 pointer-events-none">
                        <motion.div
                            key="panel"
                            initial={{ opacity: 0, scale: 0.9, y: 48 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 48 }}
                            transition={{ type: 'spring', damping: 26, stiffness: 320 }}
                            className="pointer-events-auto w-full max-w-3xl bg-slate-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl shadow-black/70"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 min-h-[460px]">

                                {/* ── Left: image panel ── */}
                                <div className="relative bg-slate-950 flex flex-col">
                                    {/* Main image */}
                                    <div className="relative flex-1 overflow-hidden min-h-[260px]">
                                        <AnimatePresence mode="wait">
                                            <motion.img
                                                key={activeImage}
                                                src={product.images[activeImage]}
                                                alt={product.title}
                                                initial={{ opacity: 0, scale: 1.06 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.96 }}
                                                transition={{ duration: 0.22 }}
                                                className="absolute inset-0 w-full h-full object-cover"
                                            />
                                        </AnimatePresence>
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 to-transparent pointer-events-none" />

                                        {/* Category badge */}
                                        <motion.span
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: 0.18 }}
                                            className="absolute top-4 left-4 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-black/55 backdrop-blur-md text-slate-300 border border-white/10"
                                        >
                                            {product.category}
                                        </motion.span>
                                    </div>

                                    {/* Thumbnail strip */}
                                    {product.images.length > 1 && (
                                        <div className="flex gap-2 p-3 border-t border-white/[0.06] bg-slate-950">
                                            {product.images.slice(0, 5).map((img, i) => (
                                                <motion.button
                                                    key={i}
                                                    onClick={() => setActiveImage(i)}
                                                    whileHover={{ scale: 1.08 }}
                                                    whileTap={{ scale: 0.94 }}
                                                    className={`relative w-11 h-11 rounded-lg overflow-hidden flex-shrink-0 transition-all duration-150 ${
                                                        i === activeImage
                                                            ? 'ring-2 ring-indigo-500 shadow-md shadow-indigo-500/30'
                                                            : 'opacity-45 hover:opacity-75'
                                                    }`}
                                                >
                                                    <img src={img} alt="" className="w-full h-full object-cover" />
                                                </motion.button>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* ── Right: details panel ── */}
                                <div className="flex flex-col p-6">
                                    {/* Close button */}
                                    <div className="flex justify-end mb-2">
                                        <motion.button
                                            onClick={onClose}
                                            whileHover={{ scale: 1.12, rotate: 90 }}
                                            whileTap={{ scale: 0.9 }}
                                            transition={{ duration: 0.18 }}
                                            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </motion.button>
                                    </div>

                                    {/* Staggered content */}
                                    <motion.div
                                        className="flex flex-col gap-4 flex-1"
                                        initial="hidden"
                                        animate="show"
                                        variants={{
                                            hidden: {},
                                            show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
                                        }}
                                    >
                                        {/* Title */}
                                        <motion.h2
                                            variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}
                                            className="text-xl font-bold text-white leading-snug"
                                        >
                                            {product.title}
                                        </motion.h2>

                                        {/* Rating */}
                                        <motion.div
                                            variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}
                                            className="flex items-center gap-2"
                                        >
                                            <div className="flex items-center gap-0.5">
                                                {[1, 2, 3, 4, 5].map(star => (
                                                    <svg
                                                        key={star}
                                                        className={`w-4 h-4 transition-colors ${star <= ratingStars ? 'text-amber-400' : 'text-slate-700'}`}
                                                        fill="currentColor" viewBox="0 0 20 20"
                                                    >
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                ))}
                                            </div>
                                            <span className="text-xs text-slate-400 font-medium">{product.rating.toFixed(1)} / 5</span>
                                        </motion.div>

                                        {/* Description */}
                                        <motion.p
                                            variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}
                                            className="text-sm text-slate-400 leading-relaxed line-clamp-5 flex-1"
                                        >
                                            {product.description}
                                        </motion.p>

                                        {/* Divider */}
                                        <motion.div
                                            variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
                                            className="h-px bg-white/[0.06]"
                                        />

                                        {/* Price + CTA */}
                                        <motion.div
                                            variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}
                                            className="flex items-center gap-4"
                                        >
                                            <span className="text-2xl font-bold text-white">${product.price.toFixed(2)}</span>
                                            <motion.button
                                                whileHover={{ scale: 1.03 }}
                                                whileTap={{ scale: 0.97 }}
                                                className="flex-1 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white text-sm font-semibold transition-colors shadow-lg shadow-indigo-500/25"
                                            >
                                                Add to Cart
                                            </motion.button>
                                        </motion.div>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    )
}
