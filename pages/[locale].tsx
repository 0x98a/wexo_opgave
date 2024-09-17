import { useEffect, useState } from 'react';
import { IconArrowRight } from '@tabler/icons-react';
import path from 'path';
import fs from 'fs';
import { Grid } from '@mantine/core';
import NavBar from 'components/Navbar';
import MovieGenre from 'components/MovieGenre';
import { useWishlist } from 'lib/wishlist';


const genres: Genre[] = [
    "action",
    "comedy",
    "thriller",
    "war",
    "romance",
    "drama",
    "crime",
    "documentary",
    "horror"
]


export default function IndexPage({ localeData, locale }: { localeData: LocaleData, locale: string }) {
    const [genresToShow, setGenresToShow] = useState(3); //Viser 3 genre af film standart
    const { wishlist } = useWishlist(); //Brug wishlist som vi bruger til navbar

    return (
        <>


            <NavBar locale={locale} localeData={localeData} wishlist={wishlist}/>
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

                <Grid grow gutter="sm" className='h-[10rem]'>
                    {genres.map((genre: Genre) => 
                        <Grid.Col span={2.4}>
                            <a href={`http://localhost:3000/${locale}/series?genre=${genre}`} className='w-full hover:scale-[103%] transition-all h-[6rem] rounded-md border-2 border-[#353535] bg-[#292929] hover:border-[#616161] hover:bg-[#3f3f3f] flex justify-center items-center'>
                                <span className='text-white text-4xl font-semibold'>{localeData[genre]}</span>
                            </a>
                        </Grid.Col>
                    )}
                </Grid>

                <div className='w-full h-[8rem]'></div>
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
                    <a href={`http://localhost:3000/${locale}/movies?genre=action`}  className='w-1/4 h-full rounded-md hover:scale-[103%] transition-all border-2 border-[#353535] bg-[#292929] hover:border-[#616161] hover:bg-[#3f3f3f] flex justify-center items-center font-bold text-white/[0.5] hover:text-white text-7xl '>ACTION</a>
                    <a href={`http://localhost:3000/${locale}/movies?genre=war`} className='w-1/4 h-full rounded-md hover:scale-[103%] transition-all border-2 border-[#353535] bg-[#292929] hover:border-[#616161] hover:bg-[#3f3f3f] flex justify-center items-center font-bold text-white/[0.5] hover:text-white text-7xl '>WAR</a>
                    <a href={`http://localhost:3000/${locale}/movies?genre=crime`} className='w-1/4 h-full rounded-md hover:scale-[103%] transition-all border-2 border-[#353535] bg-[#292929] hover:border-[#616161] hover:bg-[#3f3f3f] flex justify-center items-center font-bold text-white/[0.5] hover:text-white text-7xl '>CRIME</a>
                    <a href={`http://localhost:3000/${locale}/movies?genre=drama`} className='w-1/4 h-full rounded-md hover:scale-[103%] transition-all border-2 border-[#353535] bg-[#292929] hover:border-[#616161] hover:bg-[#3f3f3f] flex justify-center items-center font-bold text-white/[0.5] hover:text-white text-7xl '>DRAMA</a>
                </div>

                <div className='w-full h-[3rem]'></div>


                {genres.slice(0, genresToShow).map((genre: Genre) => (
                    <MovieGenre locale={locale} title={localeData[genre]} genre={genre} href={genre} />
                ))}

                <div className='w-full h-[3rem]'></div>

                {genresToShow < genres.length &&  
                    <div className='w-full h-[3rem] flex justify-center items-center'>
                        <div onClick={() => setGenresToShow(genresToShow + 1)} className='w-56 h-12 rounded-md hover:scale-[103%] font-semibold transition-all text-2xl text-white flex justify-center items-center '>
                            {localeData.seeMore}
                        </div>
                    </div>
                }

                <div className='w-full h-[5rem]'></div>

                </div>
            </div>
        </>
    );
}


export async function getServerSideProps({ params, query }: any) {
    let locale = query.locale || 'da';  // Sæt default til at være da hvis der ikke er en locale sat.

    if (locale.toString() !== "en" && locale.toString() !== "da") {
        return {
            redirect: {
                destination: '/da',
                permanent: false,
            },
        };
    }

    const filePath = path.join(process.cwd(), 'locals', `${locale}.json`); //Load locale data fra json filer
    const fileContent = fs.readFileSync(filePath, 'utf8'); //Læs filen
    const localeData: LocaleData = JSON.parse(fileContent); //Parse JSON data og send til client da dette er serverside

    return {
        props: {
            localeData,
            locale
        },
    };
}