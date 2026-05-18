import { useEffect, useState } from "react"
import { useFilter } from "./FilterContext"
import { useFetch } from "./useFetch"
interface Product {
    category: string
}

interface FerchReponse {
    products: Product[]
}
export const SideBard = () => {

    const { data, loading, error } = useFetch('https://dummyjson.com/products');
    const { searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        minPrice,
        setMinPrice,
        maxPrice,
        setMaxPrice,
        keyword,
        setKeyword, } = useFilter()

    const [time, setTime] = useState(new Date())
    const [categories, setCategories] = useState<string[]>([]);
    const [keywords] = useState<string[]>([
        "apple",
        "watch",
        "fashion",
        "trend",
        "shoes",
        "shirt"
    ]);

    useEffect(() => {

        console.error('sfkjghsk')
        const fetcgCategories = async () => {
            try {
                const response = await fetch('https://dummyjson.com/products');
                const data: FerchReponse = await response.json();
                const categories = [...new Set(data.products.map(val => val.category))]
                setCategories(categories)
            } catch (error) {
                throw new Error('Error API' + error)
            }
        }
        fetcgCategories()

        const interval = setInterval(() => {
            setTime(new Date())
        }, 1000);

        return () => clearInterval(interval)
    }, [])

    const handleMaxPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMaxPrice(parseInt(e.target.value))
    }

    const handlecategory = (category: string) => {
        setSelectedCategory(category)
    }

    const handleKeyWordClick = (keyword: string) => {
        setKeyword(keyword)
    }

    const handleReset = () => {
        setSearchQuery('')
        setSelectedCategory('')
        setMinPrice(undefined)
        setMinPrice(undefined)
        setMaxPrice(undefined)
        setKeyword('')
    }
    // if (!loading) {
    //     return <h1>...loading</h1>
    // }
    // if (error) {
    //     return <h1>{error}</h1>
    // }

    return (
        <aside className="w-72 h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 shadow-2xl flex flex-col">
            {/* Header */}
            <div className="flex flex-col items-center px-6 pt-8 pb-6 border-b border-white/10">
                <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center mb-3">
                    <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                </div>
                <h1 className="text-xl font-bold tracking-wide text-white">React Store</h1>
                <span className="text-slate-400 text-xs mt-1 font-mono">{time.toLocaleTimeString()}</span>
            </div>

            {/* Scrollable body */}
            <section className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-7 scrollbar-thin scrollbar-thumb-slate-600">

                {/* Search */}
                <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">Search</p>
                    <div className="relative">
                        <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
                        </svg>
                        <input
                            id="search"
                            onChange={e => setSearchQuery(e.target.value)}
                            value={searchQuery}
                            placeholder="Search products..."
                            type="text"
                            className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition"
                        />
                    </div>
                </div>

                {/* Price Range */}
                <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2">Price Range</p>
                    <div className="flex gap-2">
                        <div className="relative w-1/2">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">$</span>
                            <input
                                value={minPrice ?? ""}
                                onChange={e => setMinPrice(parseInt(e.target.value))}
                                placeholder="Min"
                                className="w-full bg-white/5 border border-white/10 rounded-xl pl-6 pr-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition"
                                type="number"
                                min={0}
                            />
                        </div>
                        <div className="relative w-1/2">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-sm">$</span>
                            <input
                                value={maxPrice ?? ""}
                                onChange={handleMaxPrice}
                                placeholder="Max"
                                className="w-full bg-white/5 border border-white/10 rounded-xl pl-6 pr-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition"
                                type="number"
                                min={0}
                            />
                        </div>
                    </div>
                </div>

                {/* Categories */}
                <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">Categories</p>
                    <div className="flex flex-col gap-1">
                        {categories.map((category, index) => (
                            <button
                                key={index}
                                onClick={() => handlecategory(category)}
                                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${
                                    category === selectedCategory
                                        ? "bg-indigo-500 text-white shadow-lg shadow-indigo-500/25"
                                        : "text-slate-300 hover:bg-white/8 hover:text-white"
                                }`}
                            >
                                {category.charAt(0).toUpperCase() + category.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Keywords */}
                <div>
                    <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">Keywords</p>
                    <div className="flex flex-wrap gap-2">
                        {keywords.map((kw, index) => (
                            <button
                                key={index}
                                onClick={() => handleKeyWordClick(kw)}
                                className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all duration-150 ${
                                    keyword === kw
                                        ? "bg-indigo-500 border-indigo-400 text-white shadow-md shadow-indigo-500/30"
                                        : "bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:text-white"
                                }`}
                            >
                                #{kw}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Reset */}
            <div className="px-6 py-5 border-t border-white/10">
                <button
                    onClick={handleReset}
                    className="w-full py-2.5 rounded-xl text-sm font-semibold bg-white/5 border border-white/10 text-slate-300 hover:bg-red-500/20 hover:border-red-400/40 hover:text-red-300 transition-all duration-200"
                >
                    Reset Filters
                </button>
            </div>
        </aside>
    )
}
