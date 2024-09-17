import React, { useEffect, useState } from 'react';
import { IconArrowRight } from '@tabler/icons-react';
import { Loader } from '@mantine/core';

type MovieGenreProps = {
    locale: string,
    title: string;
    genre: string;
    href: string;
};

const MovieGenre: React.FC<MovieGenreProps> = ({ locale, title, genre, href }) => {
    const [movies, setMovies] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);


    if (error) {
        return <div>{error}</div>;
    }

    return (
        <>
            <div className="w-full h-[3.5rem] flex justify-between items-center">
                <a href={`http://localhost:3000/${locale}/movies?genre=${href}`} className="flex flex-row gap-1 justify-center items-center">
                    <span className="text-4xl text-white font-semibold">{title}</span>
                </a>
                <a href={`http://localhost:3000/${locale}/movies?genre=${href}`} className="flex flex-row text-white/[0.7] hover:text-white transition-all gap-1 justify-center items-center">
                    <span className="text-xl font-semibold">See all</span>
                    <IconArrowRight size="1.5rem" />
                </a>
            </div>

            {loading ? 
                <>
                    <div className='w-full h-[20rem] border-[#353535] bg-[#292929] rounded-xl border-2 flex justify-center items-center'>
                        <Loader color="gray" size={"6rem"} />
                    </div>
                    <div className="w-full h-[2rem]"></div>
                </>
            :
                <>
                    <div className="w-full h-[20rem] flex flex-row justify-center items-center gap-4">
                        {movies.slice(0, 6).map((movie, index) => (
                            <div key={index} className="w-full min-h-[20rem] rounded-md hover:scale-[103%] transition-all border-2 border-[#353535] bg-[#292929] hover:border-[#616161] hover:bg-[#3f3f3f]">
                            </div>
                        ))}
                    </div>
                    <div className="w-full h-[2rem]"></div>
                </>
            }
        </>
    );
};

export default MovieGenre;
