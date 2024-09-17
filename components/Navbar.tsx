import React from 'react';
import { useRouter } from 'next/router'; // Import Next.js router

type NavbarProps = {
    localeData: any;
};

const NavBar: React.FC<NavbarProps> = ({ localeData }) => {
    const router = useRouter();

    const changeLocale = (locale: string) => {
        //Brug af regex til at finde den nuværende locale som er sat som 2 bogstaver som første path i linket.
        const newAsPath = router.asPath.replace(/^\/[a-zA-Z]{2}/, `/${locale}`);
      
        //Sæt nyt link med ny locale.
        router.push(newAsPath);
      };
    return (
        <div className='w-full h-20 px-4 border-b-2 border-[#353535] bg-[#292929] flex justify-between items-center'>
            <div className=''>
                <span className='text-4xl font-semibold text-white'>{localeData.title}</span>
            </div>
            <div className='flex flex-row gap-2'>
                <button className='w-14 h-8' onClick={() => changeLocale('en')}>
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
                <button className='w-14 h-8 rounded-md' onClick={() => changeLocale('da')}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 18">
                        <path fill="#c8102e" d="M0,0H37V28H0Z" />
                        <path stroke="#fff" strokeWidth="2" d="M0,10h30M10,0v18" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default NavBar;
