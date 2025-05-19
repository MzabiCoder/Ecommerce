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
        <div className="w-64 p5 h-screen p-4">
            {/* {<h1>{JSON.stringify(data)}</h1>} */}
            <h1>{time.toLocaleDateString()}</h1>
            <h1 className="text-2xl font-bold mb-10 mt-40">React Store</h1>
            <section>
                <input onChange={e => setSearchQuery(e.target.value)} value={searchQuery} placeholder="Search Product" type="text" className="border-2 rounded px-2 sm:mb-0" />
                <div className="flex justify-center items-center">
                    <input value={minPrice} onChange={e => setMinPrice(parseInt(e.target.value))} placeholder="Min" className="border-2 mr-2 px-5 py-3 mb-3 w-full" type="number" />
                    <input value={maxPrice} onChange={handleMaxPrice} placeholder="Max" className="border-2 mr-2 px-5 py-3 mb-3 w-full" type="text" />
                </div>
                <div className="mb-5">
                    <h2 className="text-xl font-semibold mb-3">Categories</h2>
                </div>
                {categories.map((category, index) => (
                    <label key={index} className="block mb-2">
                        <input value={category} onChange={() => handlecategory(category)} className="mr-2 w-[16px] h-[16px]" type="radio" name="category" />
                        {category.toUpperCase()}
                    </label>
                ))}
                <div className="mb-5 mt-4">
                    <h2 className="text-xl font-semibold mb-3">KeyWords</h2>
                    <div>
                        {keywords.map((keyword, index) => (
                            <button onClick={() => handleKeyWordClick(keyword)} className="hover:bg-gray-200 mb-2 inline-block px-4 py-2 w-full text-left border-rounded" key={index}>
                                {keyword.toLocaleUpperCase()}
                            </button>
                        ))}
                    </div>
                </div>
                <button onClick={handleReset} className="w-full mb-[4rem] py-2 bg-black text-white rounded mt-5">
                    Reset filter
                </button>
            </section>
        </div>
    )
}
