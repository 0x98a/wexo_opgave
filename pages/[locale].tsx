import { useEffect, useState } from 'react';
import { Movie } from '../interfaces';
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
import { Button, Grid, Loader, Space } from '@mantine/core';
import MovieGenre from '../components/MovieGenre';
import { useRouter } from 'next/router';
import path from 'path';
import fs from 'fs';
import NavBar from '../components/Navbar';

type LocaleData = {
    title: string;
    series: string;
    movies: string;
    seeAll: string;
    seeMore: string;    
    action: string;
    comedy: string;
    thriller: string;
    war: string;
    romance: string;
    drama: string;
    crime: string;
    documentary: string;
    horror: string;
};

export async function getServerSideProps({ params, query }: any) {
    const locale = query.locale || 'en';  // Default to 'en' if no locale is specified

    const filePath = path.join(process.cwd(), 'locals', `${locale}.json`);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const localeData: LocaleData = JSON.parse(fileContent);

    return {
        props: {
        localeData,
        locale
        },
    };
}


export default function IndexPage({ localeData, locale }: { localeData: LocaleData, locale: any }) {
    const [movieGenresToShow, setMovieGenresToShow] = useState(3); //Viser 16 film som standart
    const router = useRouter();
    const { pathname, query, asPath } = router;

    const changeLocale = (locale: string) => {
        router.push({ pathname, query }, asPath, { locale });
    };

    const moviesGenres = [
        { title: localeData.horror, href: "horror", genre: "horror" },
        { title: localeData.romance, href: "romance", genre: "romance" },
        { title: localeData.action, href: "action", genre: "action" },
        { title: localeData.comedy, href: "comedy", genre: "comedy" },
        { title: localeData.thriller, href: "thriller", genre: "thriller" },
        { title: localeData.war, href: "war", genre: "war" },
        { title: localeData.drama, href: "drama", genre: "drama" },
        { title: localeData.crime, href: "crime", genre: "crime" },
        { title: localeData.documentary, href: "documentary", genre: "documentary" },
    ];

    return (
        <>
            <NavBar localeData={localeData}/>
            <div className='w-full h-screen p-16 overflow-x-hidden'>
                <div className='w-full h-full pb-4'>
                <div className='w-full h-[3.5rem] flex justify-between items-center'>
                    <a href={`http://localhost:3000/${locale}/series`} className='flex flex-row gap-1 justify-center items-center'>
                        <span className='text-4xl text-white font-semibold'>{localeData.series}</span>
                    </a>
                    <a href={`http://localhost:3000/${locale}/series?genre=all`} className='flex flex-row text-white/[0.7] hover:text-white transition-all gap-1 justify-center items-center'>
                        <span className='text-xl font-semibold'>{localeData.seeAll}</span>
                        <IconArrowRight size="1.5rem" />
                    </a>
                </div>
                {/* <div className='w-full h-[20rem] grid grid-cols-5 gap-3'>
                    {genres.map((genre: any) =>
                        <div className='w-full h-full rounded-md hover:scale-[103%] transition-all border-2 border-[#353535] bg-[#292929] hover:border-[#616161] hover:bg-[#3f3f3f]  grow'></div>
                    )}
                </div> */}  

                <div className='w-full h-[10rem] flex flex-row gap-3'>
                    <a href={`http://localhost:3000/${locale}/series?genre=action`} className='w-1/5 hover:scale-[103%] transition-all h-full rounded-md border-2 border-[#353535] bg-[#292929] hover:border-[#616161] hover:bg-[#3f3f3f] flex justify-center items-center'>
                        <span className='text-white text-5xl font-semibold'>Action</span>
                    </a>
                    <a href={`http://localhost:3000/${locale}/series?genre=comedy`} className='w-1/5 hover:scale-[103%] transition-all h-full rounded-md border-2 border-[#353535] bg-[#292929] hover:border-[#616161] hover:bg-[#3f3f3f] flex justify-center items-center'>
                        <span className='text-white text-5xl font-semibold'>Comedy</span>
                    </a>
                    <a href={`http://localhost:3000/${locale}/series?genre=thriller`} className='w-1/5 hover:scale-[103%] transition-all h-full rounded-md border-2 border-[#353535] bg-[#292929] hover:border-[#616161] hover:bg-[#3f3f3f] flex justify-center items-center'>
                        <span className='text-white text-5xl font-semibold'>Thriller</span>
                    </a>
                    <a href={`http://localhost:3000/${locale}/series?genre=war`} className='w-1/5 hover:scale-[103%] transition-all h-full rounded-md border-2 border-[#353535] bg-[#292929] hover:border-[#616161] hover:bg-[#3f3f3f] flex justify-center items-center'>
                        <span className='text-white text-5xl font-semibold'>War</span>
                    </a>
                    <a href={`http://localhost:3000/${locale}/series?genre=romance`} className='w-1/5 hover:scale-[103%] transition-all h-full rounded-md border-2 border-[#353535] bg-[#292929] hover:border-[#616161] hover:bg-[#3f3f3f] flex justify-center items-center'>
                        <span className='text-white text-5xl font-semibold'>Romance</span>
                    </a>
                </div>
                <div className='w-full h-[1rem]'></div>
                <div className='w-full h-[10rem] flex flex-row gap-3'>
                    <a href={`http://localhost:3000/${locale}/series?genre=drama`} className='w-1/4 hover:scale-[103%] transition-all h-full rounded-md border-2 border-[#353535] bg-[#292929] hover:border-[#616161] hover:bg-[#3f3f3f] flex justify-center items-center'>
                        <span className='text-white text-5xl font-semibold'>Drama</span>
                    </a>
                    <a href={`http://localhost:3000/${locale}/series?genre=crime`} className='w-1/4 hover:scale-[103%] transition-all h-full rounded-md border-2 border-[#353535] bg-[#292929] hover:border-[#616161] hover:bg-[#3f3f3f] flex justify-center items-center'>
                        <span className='text-white text-5xl font-semibold'>Crime</span>
                    </a>
                    <a href={`http://localhost:3000/${locale}/series?genre=documentary`} className='w-1/4 hover:scale-[103%] transition-all h-full rounded-md border-2 border-[#353535] bg-[#292929] hover:border-[#616161] hover:bg-[#3f3f3f] flex justify-center items-center'>
                        <span className='text-white text-5xl font-semibold'>Documentary</span>
                    </a>
                    <a href={`http://localhost:3000/${locale}/series?genre=horror`} className='w-1/4 hover:scale-[103%] transition-all h-full rounded-md border-2 border-[#353535] bg-[#292929] hover:border-[#616161] hover:bg-[#3f3f3f] flex justify-center items-center'>
                        <span className='text-white text-5xl font-semibold'>Horror</span>
                    </a>
                </div>
                <div className='w-full h-[2rem]'></div>

                <div className='w-full h-[3.5rem] flex justify-between items-center'>
                    <a href={`http://localhost:3000/${locale}/movies`} className='flex flex-row gap-1 justify-center items-center'>
                        <span className='text-4xl text-white font-semibold'>{localeData.movies}</span>
                    </a>
                    <a href={`http://localhost:3000/${locale}/movies`} className='flex flex-row text-white/[0.7] hover:text-white transition-all gap-1 justify-center items-center'>
                        <span className='text-xl font-semibold'>{localeData.seeAll}</span>
                        <IconArrowRight size="1.5rem" />
                    </a>
                </div>
                <div className='w-full h-[25rem] flex flex-row justify-between gap-8'>
                    <div className='w-1/4 h-full rounded-md hover:scale-[103%] transition-all border-2 border-[#353535] bg-[#292929] hover:border-[#616161] hover:bg-[#3f3f3f] '></div>
                    <div className='w-1/4 h-full rounded-md hover:scale-[103%] transition-all border-2 border-[#353535] bg-[#292929] hover:border-[#616161] hover:bg-[#3f3f3f] '></div>
                    <div className='w-1/4 h-full rounded-md hover:scale-[103%] transition-all border-2 border-[#353535] bg-[#292929] hover:border-[#616161] hover:bg-[#3f3f3f] '></div>
                    <div className='w-1/4 h-full rounded-md hover:scale-[103%] transition-all border-2 border-[#353535] bg-[#292929] hover:border-[#616161] hover:bg-[#3f3f3f] '></div>
                </div>
                <div className='w-full h-[2rem]'></div>

        

                {moviesGenres.slice(0, movieGenresToShow).map((movie: any) => (
                    <MovieGenre locale={locale} title={movie.title} genre={movie.genre} href={movie.href} />
                ))}

                {movieGenresToShow < moviesGenres.length &&  
                    <div className='w-full h-[3rem] flex justify-center items-center'>
                        <div onClick={() => setMovieGenresToShow(movieGenresToShow + 1)} className='w-56 h-12 rounded-md hover:scale-[103%] font-semibold transition-all text-2xl text-white flex justify-center items-center '>
                            {localeData.seeMore}
                        </div>
                    </div>
                }
                <div className='w-full h-[2rem]'></div>





                    {/* <div className='w-full h-[4rem] px-4 flex justify-between items-start flex-col'>
                        <div className='flex flex-row gap-2 justify-center items-center h-full'>
                            <span className='text-3xl text-white font-bold'>Film</span>
                        </div>
                    </div>

                    <div className='w-full h-[21.5rem] bg-[#1C1C1C] rounded-md hover:scale-[103%] transition-all border-2 border-[#353535] bg-[#292929] hover:border-[#616161] hover:bg-[#3f3f3f] -2 border-[#353535] overflow-y-auto'>
                        {isLoadingMovies ? (
                            <div className='w-full h-full flex justify-center items-center flex-col'>
                                <Loader color="gray" size="10rem" />
                                <Space h="xl"/>
                                <span className='text-3xl text-white/[0.8] font-bold'>Indlæser...</span>
                                <span className='text-xl text-white/[0.3]'>Vent venligst...</span>

                            </div>
                        ) : (
                            <div className='flex flex-row overflow-x-auto gap-4 p-4'>
                                {movies.slice(0, 30).map((movie: any) => {
                                    const movieId = movie.id.split('/').pop();

                                    return (
                                        <a key={movieId} href={`/movies/${movieId}`} className='max-w-48 min-w-48 w-48 h-72 border-2 rounded-md bg-[#333333] border-[#3F3F3F] flex flex-col'>
                                            <div className='w-full h-[80%] rounded-t-md'>
                                                <div className='w-full h-full flex justify-center items-center text-center'>
                                                    <img src={movie.cover} alt={movie.title} />
                                                </div>
                                            </div>
                                            <div className='w-full h-[20%] text-xs border-[#3F3F3F] rounded-b-md bg-[#2a2a2a] border-t-2 flex justify-center items-center'>
                                                <span className='text-white text-xs text-center'>{movie.title}</span>
                                            </div>
                                        </a>
                                    );
                                })}
                            </div>
                        )}
                    </div> */}



                    {/* <div className='w-full h-[4rem] px-4 flex justify-between items-start flex-col'>
                        <div className='flex flex-row gap-2 justify-between items-center h-full w-full'>
                        <span className='text-3xl text-white font-bold'>Serier</span>
                            <div className='flex flex-row'>
                                <a href="http://localhost:3000/series" className='flex flex-row gap-1 justify-center items-center'>
                                    <span className='text-xl text-white font-bold'>Se alle</span>
                                    <IconArrowRight size="2rem" color="#fff" />
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className='w-full h-[21.5rem] bg-[#1C1C1C] rounded-md hover:scale-[103%] transition-all border-2 border-[#353535] bg-[#292929] hover:border-[#616161] hover:bg-[#3f3f3f] -2 border-[#353535] overflow-y-auto'>
                        {isLoadingSeries ? (
                            <div className='w-full h-full flex justify-center items-center flex-col'>
                                <Loader color="gray" size="10rem" />
                                <Space h="xl"/>
                                <span className='text-3xl text-white/[0.8] font-bold'>Indlæser...</span>
                                <span className='text-xl text-white/[0.3]'>Vent venligst...</span>

                            </div>
                        ) : (
                            <div className='flex flex-row overflow-x-auto gap-4 p-4'>
                                {series.slice(0, 30).map((serie: any) => {
                                    const serieId = serie.id.split('/').pop();

                                    return (
                                        <a key={serieId} href={`/series/${serieId}`} className='max-w-48 min-w-48 w-48 h-72 border-2 rounded-md bg-[#333333] border-[#3F3F3F] flex flex-col'>
                                            <div className='w-full h-[80%] rounded-t-md'>
                                                <div className='w-full h-full flex justify-center items-center text-center'>
                                                    <img src={serie.cover} alt={serie.title} />
                                                </div>
                                            </div>
                                            <div className='w-full h-[20%] text-xs border-[#3F3F3F] rounded-b-md bg-[#2a2a2a] border-t-2 flex justify-center items-center'>
                                                <span className='text-white text-xs text-center'>{serie.title}</span>
                                            </div>
                                        </a>
                                    );
                                })}
                            </div>
                        )}
                    </div> */}
                </div>
            </div>
        </>
    );
}
