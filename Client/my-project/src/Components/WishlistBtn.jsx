// wishlist Service
import {
    useGetWishlistQuery,
    useAddWishlistMutation,
    useRemoveWishlistMutation
} from "../Pages/Wishlist/wishlistAPI";

// React Icons
import { FaRegHeart, FaHeart } from "react-icons/fa";

const WishlistBtn = ({ product, position }) => {

    const { data: wishlist = [] } = useGetWishlistQuery();

    const [addWishlist] = useAddWishlistMutation();
    const [removeWishlist] = useRemoveWishlistMutation();

    const checkIsInWishlist = wishlist.some(
        (item) => item._id === product._id
    );

    const handleWishlist = async () => {
        try {
            if (checkIsInWishlist) {
                await removeWishlist(product._id).unwrap();
            } else {
                await addWishlist(product).unwrap();
            }
        } catch (error) {
            console.error("Wishlist error:", error);
        }
    };

    return (
        <button
            className={`${position} top-2 right-2 bg-white p-2 rounded-full hover:scale-105 transition-transform duration-200`}
            onClick={handleWishlist}
        >
            {checkIsInWishlist
                ? <FaHeart className="text-lg md:text-xl" />
                : <FaRegHeart className="text-lg md:text-xl" />
            }
        </button>
    );
};

export default WishlistBtn;