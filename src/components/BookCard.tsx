import { useEffect } from "react"
import { Link } from "react-router-dom"

type Props = {
    id: string
    title: string
    price: number,
    images: string[]
}

const BookCard: React.FC<Props> = ({ id, title, price, images }) => {

    return (
        <div className="border p-4 rounded">
            <Link to={`/products/${id}`}>
                <img src={images[0]} alt={title} className="w-full h-32 object-cover mb-2" />
                <h2 className="font-bold">{title}</h2>
                <p>{price}</p>
            </Link>
        </div>
    )
}

export default BookCard