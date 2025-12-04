const API_URL = import.meta.env.VITE_API_URL;
import Tag from "./Tag";
import { Link } from "react-router-dom";

export default function ProductoLanding({
  id,
  title,
  pictures,
  price,
  category,
  description,
  tags,
}) {
  return (
    <div className="flex justify-center mx-2">
      <Link to={`/producto/${id}`} key={id}>
        <div
          className="
        block bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition
        max-h-150 md:max-h-110
      "
        >
          <img
            src={API_URL + pictures[0]}
            alt={title}
            className=" w-full h-70 md:h-70 sm:object-contain object-cover p-2  "
          />
          <div className="p-2">
            <h3 className="text-lg sm:text-xl font-semibold text-white">
              {title}
            </h3>
            <p id="producto-precio" className="text-yellow-400 font-semibold">
              ${price}
            </p>
            <p className="text-gray-300 text-xs sm:text-sm line-clamp-3">
              {description}
            </p>
            <p className="text-sm text-gray-400 mb-1">{category.title}</p>
            <div className="flex flex-wrap mb-2">
              {tags.map((tag) => (
                <Tag key={tag.id} label={tag.title} />
              ))}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
