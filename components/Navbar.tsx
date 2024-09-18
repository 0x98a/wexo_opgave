import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Drawer } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useWishlist } from 'lib/wishlist';

const NavBar: React.FC<NavbarProps> = ({ locale, localeData, wishlist }) => {
    const router = useRouter();
    const { toggleMovie } = useWishlist();
    
    const changeLocale = (locale: string) => {
        //Brug af regex til at finde den nuværende locale som er sat som 2 bogstaver som første path i linket.
        const validLocales = ['da', 'en'];
        const currentLocale = router.asPath.split('/')[1];

        if (validLocales.includes(currentLocale)) {
                const newAsPath = router.asPath.replace(/^\/[a-zA-Z]{2}/, `/${locale}`);
                router.push(newAsPath);
          } else {
                const newAsPath = `/${locale}`; //Sæt locale til at være det valgte hvis linket ikk matcher altså fx et ugyldigt sprog er sat fx /testtest og ikke /da eller /en
                router.push(newAsPath);
          }
    };

    

    const [opened, { open, close }] = useDisclosure(false);


    return (
        <>
            <Drawer opened={opened} position="right" onClose={close} title="Wishlist" overlayProps={{ backgroundOpacity: 0.4, blur: 4 }}>
                {wishlist.length > 0 ?
                    wishlist.map((movie: any) => (
                        <li key={movie.movieId}>
                            {movie.movieTitle} ({movie.movieReleaseDate}) - Added on: {new Date(movie.addedAt).toLocaleString()}
                            <button onClick={() => toggleMovie(movie.movieId, movie.movieTitle, movie.movieReleaseDate)}>
                                {wishlist.find((item: any) => item.movieId === movie.movieId) ? 'Remove' : 'Add'}
                            </button>
                        </li>
                    ))
                    :
                    <div className='w-full h-[7rem] flex flex-col justify-center items-center'>
                        <span className='lg:text-2xl text-lg text-white font-semibold'>{localeData.wishlistEmptyTitle}</span>
                        <span className='lg:text-md text-sm text-white/[0.7]'>{localeData.wishlistEmptyText}</span>

                    </div>

                }
            </Drawer>
            <div className='w-full h-20 px-4 border-b-2 border-[#353535] bg-[#292929] flex justify-between items-center'>
                <div className=''>
                    <a href={`http://localhost:3000/${locale}`} className='lg:text-4xl md:text-3xl sm:text-2xl text-xl font-semibold text-white transition-all'>{localeData.title}</a>
                </div>
                <div className='flex flex-row gap-2'>
                    <div onClick={open} className='w-12 h-12 flex justify-center items-center hover:text-orange-500 transition-all duration-500 hover:scale-125'>
                        <svg xmlns="http://www.w3.org/2000/svg" width={36} height={36} viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-star">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
                        </svg>
                    </div>
                    <button className={`w-14 h-12 hover:scale-110 transition-all duration-500 ${locale == "en" ? "scale-110" : "opacity-35"}`} onClick={() => changeLocale('en')}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 30" width="56" height="32">
                            <clipPath id="t">
                                <path d="M25,15h25v15zv15h-25zh-25v-15zv-15h25z" />
                            </clipPath>
                            <path d="M0,0v30h50v-30z" fill="#012169" />
                            <path d="M0,0 50,30M50,0 0,30" stroke="#fff" strokeWidth="6" />
                            <path d="M0,0 50,30M50,0 0,30" clipPath="url(#t)" stroke="#C8102E" strokeWidth="4" />
                            <path d="M-1 11h22v-12h8v12h22v8h-22v12h-8v-12h-22z" fill="#C8102E" stroke="#FFF" strokeWidth="2" />
                        </svg>
                    </button>
                    <button className={`w-14 h-12 hover:scale-110 transition-all duration-500 ${locale == "da" ? "scale-110" : "opacity-35"}`} onClick={() => changeLocale('da')}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 18">
                            <path fill="#c8102e" d="M0,0H37V28H0Z" />
                            <path stroke="#fff" strokeWidth="2" d="M0,10h30M10,0v18" />
                        </svg>
                    </button>
                </div>
            </div>
        </>
    );
};

export default NavBar;
