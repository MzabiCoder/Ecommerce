
import { useEffect, useState } from "react";
import { useFilter } from "./FilterContext"
import { Tally3 } from "lucide-react";
import axios from "axios";
import BookCard from "./BookCard";
import { Spinner } from "./spinner";

interface Product {
    id: number
    category: string
    description: string
    price: number
    title: string
    rating: number
    images: string[]
}
export const MainContent = () => {
    const { setSearchQuery,
        searchQuery,
        selectedCategory,
        setSelectedCategory,
        minPrice,
        setMinPrice,
        maxPrice,
        setMaxPrice,
        keyword } = useFilter();

    const [products, setProducts] = useState<Product[]>([])
    const [filter, setFilter] = useState('all')
    const [currentpage, setCurrentpage] = useState(1)
    const [dropdownOpen, setDropdownOpen] = useState(true);
    const itemsPerPage = 12;

    useEffect(() => {


        let url = `https://dummyjson.com/products?limit=${itemsPerPage}&skip=${(currentpage - 1) * itemsPerPage}`;

        if (keyword) {

            url = `https://dummyjson.com/products/search?q=${keyword}`;
        }

        axios(url).then(res => {
            setProducts(res.data.products);
        }).catch(err => {
            throw new Error('API ERROR!!' + err)
        })
    }, []);

    let filterdProducts = products

    const totlaProduct = 100
    const totlaPage = Math.ceil(totlaProduct / itemsPerPage);
    const handlepageChang = (page: number) => {
        if (page > 0 && page <= totlaPage) {
            setCurrentpage(page)
        }
    }
    const getFiltredProducts = () => {

        if (selectedCategory) {
            filterdProducts = filterdProducts.filter(product => product.category === selectedCategory);

        }


        if (minPrice !== undefined) {
            filterdProducts = filterdProducts.filter(product => product.price >= minPrice)
        }
        if (maxPrice !== undefined) {
            filterdProducts = filterdProducts.filter(product => product.price <= maxPrice)
        }

        if (searchQuery) {
            filterdProducts = filterdProducts.filter(product => product.title.toLocaleLowerCase().includes(searchQuery.toLocaleLowerCase()))
        }

        if (filter === "expensive") {
            return filterdProducts.sort((a, b) => b.price - a.price);
        }
        if (filter === "cheap") {
            return filterdProducts.sort((a, b) => a.price - b.price);
        }
        if (filter === "popular") {
            return filterdProducts.sort((a, b) => b.rating - a.rating);
        }



    }
    getFiltredProducts()
    const sortOptions = [
        {
            value: 'cheap',
            label: 'Price: Low to High',
            sub: 'Cheapest first',
            icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h13M3 8h9M3 12h5m10 4V8m0 0l-3 3m3-3l3 3" />
                </svg>
            ),
        },
        {
            value: 'expensive',
            label: 'Price: High to Low',
            sub: 'Most expensive first',
            icon: (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h13M3 8h9M3 12h5m10 0V4m0 0l-3 3m3-3l3 3" />
                </svg>
            ),
        },
        {
            value: 'popular',
            label: 'Most Popular',
            sub: 'Highest rated',
            icon: (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            ),
        },
    ]
    const activeOption = sortOptions.find(o => o.value === filter)

    return (
        <section className="min-h-screen bg-slate-950" aria-label="Product catalog">

            {/* Page header */}
            <div className="border-b border-white/[0.06] px-8 pt-8 pb-6">
                <div className="flex items-end justify-between">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-widest text-indigo-400 mb-1">Catalog</p>
                        <h2 className="text-2xl font-bold text-white">All Products</h2>
                    </div>

                    {/* Sort dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => setDropdownOpen(!dropdownOpen)}
                            aria-haspopup="true"
                            aria-expanded={dropdownOpen}
                            className={`group flex items-center gap-3 pl-3 pr-4 py-2 rounded-xl border text-sm font-medium transition-all duration-200 ${
                                dropdownOpen
                                    ? 'bg-indigo-500/10 border-indigo-500/40 text-white'
                                    : 'bg-slate-800/80 border-white/10 text-slate-300 hover:bg-slate-700/60 hover:border-white/20 hover:text-white'
                            }`}
                        >
                            <span className={`p-1 rounded-lg transition-colors duration-200 ${dropdownOpen ? 'bg-indigo-500/20 text-indigo-400' : 'bg-white/5 text-slate-400 group-hover:text-slate-300'}`}>
                                <Tally3 className="w-3.5 h-3.5" aria-hidden="true" />
                            </span>
                            <span className="min-w-[72px]">
                                {activeOption ? activeOption.label.split(':')[0] : 'Sort by'}
                            </span>
                            <svg
                                className={`w-3.5 h-3.5 text-slate-500 transition-transform duration-200 ${dropdownOpen ? 'rotate-180 text-indigo-400' : ''}`}
                                fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>

                        {dropdownOpen && (
                            <div
                                className="absolute z-20 right-0 mt-2 w-56 rounded-2xl border border-white/10 bg-slate-900/95 backdrop-blur-xl shadow-2xl shadow-black/60 overflow-hidden"
                                role="menu"
                            >
                                {/* Panel header */}
                                <div className="px-4 pt-3 pb-2 border-b border-white/[0.06]">
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Sort products</p>
                                </div>

                                {/* Options */}
                                <div className="p-1.5 flex flex-col gap-0.5">
                                    {sortOptions.map(opt => {
                                        const active = filter === opt.value
                                        return (
                                            <button
                                                key={opt.value}
                                                onClick={() => { setFilter(opt.value); setDropdownOpen(false); }}
                                                className={`relative flex items-center gap-3 w-full text-left px-3 py-2.5 rounded-xl transition-all duration-150 ${
                                                    active
                                                        ? 'bg-indigo-500/15 text-white'
                                                        : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                                                }`}
                                                role="menuitem"
                                            >
                                                {/* Active accent bar */}
                                                {active && <span className="absolute left-0 top-2 bottom-2 w-0.5 rounded-full bg-indigo-400" />}

                                                {/* Icon */}
                                                <span className={`flex-shrink-0 p-1.5 rounded-lg ${active ? 'bg-indigo-500/20 text-indigo-400' : 'bg-white/5 text-slate-500'}`}>
                                                    {opt.icon}
                                                </span>

                                                {/* Text */}
                                                <span className="flex flex-col">
                                                    <span className="text-sm font-medium leading-tight">{opt.label}</span>
                                                    <span className={`text-[11px] leading-tight mt-0.5 ${active ? 'text-indigo-400/70' : 'text-slate-600'}`}>{opt.sub}</span>
                                                </span>

                                                {/* Checkmark */}
                                                {active && (
                                                    <svg className="ml-auto w-4 h-4 text-indigo-400 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                    </svg>
                                                )}
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Result count strip */}
                <p className="text-slate-500 text-xs mt-3">
                    Showing <span className="text-slate-300 font-medium">{filterdProducts?.length ?? 0}</span> items — page {currentpage} of {totlaPage}
                </p>
            </div>

            {/* Grid */}
            <div className="px-8 py-8">
                {!filterdProducts ? (
                    <Spinner />
                ) : (
                    <div
                        className="grid gap-4"
                        style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}
                        role="grid"
                    >
                        {filterdProducts.map((product, i) => (
                            <div
                                key={product.id}
                                className={i === 0 ? 'col-span-2 row-span-2' : ''}
                            >
                                <BookCard {...product} isFeatured={i === 0} />
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Pagination */}
            <div className="border-t border-white/[0.06] px-8 py-5 flex items-center justify-between">
                <button
                    onClick={() => handlepageChang(currentpage - 1)}
                    disabled={currentpage === 1}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800/80 border border-white/10 text-slate-300 hover:text-white hover:border-white/20 text-sm font-medium transition-all disabled:opacity-25 disabled:cursor-not-allowed"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                    Previous
                </button>

                <div className="flex items-center gap-1">
                    {Array.from({ length: totlaPage }, (_, i) => i + 1).map(page => {
                        const near = Math.abs(page - currentpage) <= 1 || page === 1 || page === totlaPage
                        const ellipsisBefore = page === currentpage - 2 && currentpage > 3
                        const ellipsisAfter = page === currentpage + 2 && currentpage < totlaPage - 2
                        if (ellipsisBefore || ellipsisAfter) return <span key={page} className="w-8 text-center text-slate-600 text-sm">…</span>
                        if (!near) return null
                        return (
                            <button
                                key={page}
                                onClick={() => handlepageChang(page)}
                                className={`w-8 h-8 rounded-lg text-sm font-semibold transition-all ${
                                    page === currentpage
                                        ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/30'
                                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                                }`}
                            >
                                {page}
                            </button>
                        )
                    })}
                </div>

                <button
                    onClick={() => handlepageChang(currentpage + 1)}
                    disabled={currentpage === totlaPage}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800/80 border border-white/10 text-slate-300 hover:text-white hover:border-white/20 text-sm font-medium transition-all disabled:opacity-25 disabled:cursor-not-allowed"
                >
                    Next
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </section>
    )
}