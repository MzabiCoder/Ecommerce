
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
    const [dropdownOpen, ssetDropdownOpen] = useState(true);
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
    return (
        <section className="xl:w-[55rem] lg:w-[55rem] sm:w-[40rem] xs:w-[20rem] p-5">
            <div className="mb-5">
                <div className="flex flex-col sm:flex-row justify-between items-center">
                    <div className="relative mb-5 mt-5">
                        <button className="border px-4 py-2 rounded-full flex items-center">
                            <Tally3 className="mr-2" />
                            {filter === 'alt' ? 'Filter' : filter.charAt(0).toLocaleLowerCase() + filter.slice(1)}
                        </button>

                        {dropdownOpen && (
                            <div className="absolute bg-white border border-gray-300 rounded mt-2 w-full sm:w-40">
                                <button onClick={() => setFilter('cheap')} className="block px-4 py-2 w-full text-left hover:bg-gray-200">
                                    cheap
                                </button>
                                <button onClick={() => setFilter('expensive')} className="block px-4 py-2 w-full text-left hover:bg-gray-200">
                                    expensive
                                </button>
                                <button onClick={() => setFilter('popular')} className="block px-4 py-2 w-full text-left hover:bg-gray-200">
                                    popular
                                </button>
                                {/* <button onClick={() => setFilter('cheap')} className="block px-4 py-2 w-full text-left hover:bg-gray-200">
                                    pupular
                                </button> */}
                            </div>
                        )}


                    </div>
                </div>
                {!filterdProducts ? (
                    <Spinner />
                ) : (
                    <div className="grid grid-cols-4 sm:grid-cols-3 md:grid-cols-4 gap-5">
                        {filterdProducts.map(product => (
                            <BookCard key={product.id} {...product} />
                        ))}
                    </div>
                )}

                <div className="flex flex-col sm:flex-row justify-between items-center mt-5">
                    <button onClick={() => handlepageChang(currentpage - 1)} disabled={currentpage === 1} className="border px-4 py-2 mx-2 rounded-full">
                        Previous
                    </button>
                    <button disabled={currentpage === totlaPage} onClick={() => handlepageChang(currentpage - 1)} className="border px-4 py-2 mx-2 rounded-full">
                        Next
                    </button>
                </div>

            </div>
        </section>
    )
}