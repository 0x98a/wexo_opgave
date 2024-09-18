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
        } else {
            setWishlist([]); // Ensure wishlist is an empty array if nothing is saved
        }
    }, []);
    
    // Når wishlist skifter så opdater vi localstorage
    useEffect(() => {
        const savedWishlist = localStorage.getItem('wishlist');
        // Only update localStorage if the wishlist has changed
        if (wishlist.length > 0 && savedWishlist !== JSON.stringify(wishlist)) {
            localStorage.setItem('wishlist', JSON.stringify(wishlist));
        }
    }, [wishlist]);
    

    // Function til at add en film til wishlist
    const addToWishlist = (movieId: string, movieTitle: string, movieReleaseDate: string, duration?: any, seasons?: any) => {
        const movieExists = wishlist.find((item) => item.movieId === movieId);

        console.log(duration)
        console.log(seasons)

        if (!movieExists) {
            const newMovie = {
                movieId,
                movieTitle,
                movieReleaseDate,
                "duration": duration == 0 ? null : duration,
                "seasons": seasons == undefined ? null : seasons.length,
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

    const isOnWishlist = (movieId: string) => {
        const movieExists = wishlist.find((item) => item.movieId === movieId);

        if (movieExists) {
            return true;
        }

        return false;
    };

    // En toggle function som gør at hvis filmen allerede er added så bliver den fjernet.
    const toggleMovie = (movieId: string, movieTitle: string, movieReleaseDate: string, duration?: any, seasons?: any) => {
        const movieExists = wishlist.find((item) => item.movieId === movieId);

        if (movieExists) {
            removeFromWishlist(movieId);
        } else {
            addToWishlist(movieId, movieTitle, movieReleaseDate, duration, seasons)
        }
    };

    return { wishlist, addToWishlist, removeFromWishlist, toggleMovie, isOnWishlist };
}
