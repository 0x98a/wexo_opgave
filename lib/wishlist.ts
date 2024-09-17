import { useEffect, useState } from 'react';

type WishlistItem = {
    movieId: string;
    movieTitle: string;
    movieReleaseDate: string;
    addedAt: string;
};

export function useWishlist() {
    const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

    // Load wishlist fra localstorage ved init call
    useEffect(() => {
        const savedWishlist = localStorage.getItem('wishlist');
        if (savedWishlist) {
            setWishlist(JSON.parse(savedWishlist));
        }
    }, []);

    //Når wishlist skifter så opdater vi localstorage
    useEffect(() => {
        if (wishlist.length > 0) {
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
        }
    }, [wishlist]);

    // Function til at add en film til wishlist
    const addToWishlist = (movieId: string, movieTitle: string, movieReleaseDate: string) => {
        const movieExists = wishlist.find((item) => item.movieId === movieId);

        if (!movieExists) {
            const newMovie = {
                movieId,
                movieTitle,
                movieReleaseDate,
                addedAt: new Date().toISOString(),
            };

            const updatedWishlist = [...wishlist, newMovie];
            setWishlist(updatedWishlist); // Update wishlist state også
            localStorage.setItem('wishlist', JSON.stringify(updatedWishlist)); //Update localstorage
        }
    };

    //Function til at fjerne en film fra wishlist
    const removeFromWishlist = (movieId: string) => {
        const updatedWishlist = wishlist.filter((item) => item.movieId !== movieId);
        setWishlist(updatedWishlist); // Update wishlist state også
        localStorage.setItem('wishlist', JSON.stringify(updatedWishlist)); //Update localstorage
    };

    // En toggle function som gør at hvis filmen allerede er added så bliver den fjernet.
    const toggleMovie = (movieId: string, movieTitle: string, movieReleaseDate: string) => {
        const movieExists = wishlist.find((item) => item.movieId === movieId);

        if (movieExists) {
            removeFromWishlist(movieId);
        } else {
            addToWishlist(movieId, movieTitle, movieReleaseDate);
        }
    };

    return { wishlist, addToWishlist, removeFromWishlist, toggleMovie };
}
