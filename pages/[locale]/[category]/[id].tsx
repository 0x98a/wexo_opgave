import { GetServerSideProps } from 'next';
import { fetchProgramById, fetchSeasonsBySeriesId } from '../../../lib/service';
import { IconArrowLeft } from '@tabler/icons-react';
import fs from 'fs';
import path from 'path';
import { useState, useEffect } from 'react';
import { Loader } from '@mantine/core';
import NavBar from '../../../components/Navbar';
import { useWishlist } from 'lib/wishlist';

function formatRuntime(runtimeInSeconds: number, locale: string): string {
    if (!runtimeInSeconds) return locale === 'da' ? 'Ikke tilgængelig' : 'Unavailable';

    const hours = Math.floor(runtimeInSeconds / 3600);
    const minutes = Math.floor((runtimeInSeconds % 3600) / 60);

    return locale === 'da' ? `${hours} time${hours !== 1 ? 'r' : ''} og ${minutes} minut${minutes !== 1 ? 'ter' : ''}` : `${hours} hour${hours !== 1 ? 's' : ''} and ${minutes} minute${minutes !== 1 ? 's' : ''}`;
}

function formatProgramData(programData: any, locale: string) {
    if (programData.isException) {
        return null;
    }

    

    const directors = programData.plprogram$credits.filter((credit: any) => credit.plprogram$creditType === 'director').map((director: any) => director.plprogram$personName);
    const actors = programData.plprogram$credits.filter((credit: any) => credit.plprogram$creditType === 'actor').map((actor: any) => actor.plprogram$personName);

    const genres = programData.plprogram$tags.filter((tag: any) => tag.plprogram$scheme === 'genre').map((tag: any) => locale === 'da' ? tag.plprogram$titleLocalized?.da : tag.plprogram$title);

    const programId = programData.id.split('/').pop(); //Få id'et fordi serie.id er et link.

    const cover = programData.plprogram$thumbnails?.["orig-2100x1400"]?.plprogram$url || '';
    const backdrop = programData.plprogram$thumbnails?.["orig-720x1280"]?.plprogram$url || '';

    const youtubeTrailer = programData.tdc$youtubeTrailer !== "" ? programData.tdc$youtubeTrailer : null

    const runtime = formatRuntime(programData.plprogram$runtime, locale);

    return {
        id: programId,
        title: programData.title || 'Unknown Title',
        description: programData.description || 'No description available',
        releaseYear: programData.plprogram$year || 0,
        cover,
        backdrop,
        genres,
        directors,
        actors,
        runtime,
        youtubeTrailer,
    };
}

export default function ProgramDetail({ program, seasons, locale, localizedData }: ProgramDetailProps) {
    if (!program) {
        return (
            <div className='w-full h-screen p-16 flex justify-center items-center'>
                <span className='text-5xl text-white'>{localizedData.notfound}</span>
            </div>
        );
    }

    const { wishlist, toggleMovie } = useWishlist();

    const formattedProgram = formatProgramData(program, locale);

    if (formattedProgram == null) {
        return (
            <div className='w-full h-screen p-16 flex justify-center items-center'>
                <span className='text-5xl text-white'>{localizedData.notfound}</span>
            </div>
        );
    }

    const isInWishlist = wishlist.some(movie => movie.movieId === formattedProgram.id);

    return (
        <>
            <NavBar locale={locale} localeData={localizedData} wishlist={wishlist}/>
            <div className='w-full h-screen p-16'>
                <div className='w-full h-[4rem] bg-[#353535] px-8 rounded-t-xl'>
                    <div className='flex flex-row gap-2 justify-start items-center h-full'>
                        <a href={`/${locale}/${program.plprogram$programType}${program.plprogram$programType == "movie" ? "s" : ""}`}>
                            <IconArrowLeft size="2rem" color="#fff" />
                        </a>
                        <span className='text-2xl text-white font-bold'>{formattedProgram.title}</span>
                        <div onClick={() => {toggleMovie(formattedProgram.id, formattedProgram.title, formattedProgram.releaseYear)}} className={`w-6 mt-1 ml-2 h-6 flex justify-center items-center ${isInWishlist ? "text-orange-500" : ""} transition-all duration-300 hover:scale-125`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width={36} height={36} viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-star">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" />
                            </svg>
                        </div>
                    </div>
                </div>

                <div className='w-full h-[3rem] bg-[#353535] rounded-b-xl'>
                    <div className='flex flex-row gap-2 justify-start items-center h-full'>
                        <div className='w-full px-6 h-full flex flex-row justify-start items-center'>
                            <div className='flex w-full flex-row gap-4'>
                                <div className='px-2 h-full flex justify-center items-center'>
                                    <p className='text-lg font-semibold text-white/[0.8]'>{formattedProgram.releaseYear}</p>
                                </div>
                                {program.plprogram$programType === 'series' ?
                                    seasons && seasons.length > 0 ?
                                        <>
                                            <div className='min-w-[14rem] px-2 h-full flex justify-center items-center flex-row'>
                                                <span className='text-lg break-keep font-semibold text-white/[0.8]'>{seasons.length} {seasons.length > 1 ? localizedData.seasons : localizedData.season}</span>
                                            </div>
                                        </>
                                        :
                                        <>
                                            <div className='break-keep min-w-[14rem] px-2 h-full flex justify-center items-center'>
                                                <span className='text-lg break-keep font-semibold text-white/[0.8]'>0 {localizedData.seasons}</span>
                                            </div>
                                        </>
                                    :
                                    <>
                                        <div className='break-keep min-w-[14rem] px-2 h-full flex justify-center items-center'>
                                            <span className='text-lg break-keep font-semibold text-white/[0.8]'>{formattedProgram.runtime}</span>
                                        </div>
                                    </>
                                }
                                <div className='px-4 h-full w-full flex flex-row justify-start items-center'>
                                    <p className='text-lg font-semibold text-white/[0.8]'>{formattedProgram.genres.join(', ')}</p>
                                </div>
                            </div>
                            <div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='w-full h-[1rem]'></div>
                <div className='w-full h-[25rem] flex flex-row gap-4'>
                    {program.plprogram$programType === 'series' && seasons && seasons.length > 0 && (
                        <div className='w-1/3 h-full bg-[#353535] rounded-md p-6'>
                            <h2 className='text-3xl text-white mb-2'>{localizedData.seasons}</h2>
                            <div className='w-full h-[19rem] overflow-y-auto'>
                                {seasons.map((season) => (
                                    <>
                                        <div key={season.id} className='w-full min-h-[5rem] bg-[#2d2d2d] p-2 rounded-md border-2 border-[#505050] flex flex-col'>
                                            <span className='text-xl font-semibold text-white'>{season.title}</span>
                                            <span className='text-md font-normal text-white/[0.7]'>{season.description}</span>
                                        </div>
                                        <div className='w-full h-[1rem]'></div>
                                    </>
                                ))}
                            </div>
                        </div>
                    )}

                    {formattedProgram.youtubeTrailer != null && (
                        <div className='w-1/3 h-full bg-[#353535] rounded-md p-6'>
                            <h2 className='text-3xl font-semibold text-white mb-2'>{localizedData.trailer}:</h2>
                            <div className='w-full h-[19rem]'>
                                <iframe width="560" height="315" src={`https://www.youtube.com/embed/${formattedProgram.youtubeTrailer}`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share">
                                </iframe>
                            </div>
                        </div>
                    )}

                    <div className={`${program.plprogram$programType === 'series' && seasons && seasons.length || formattedProgram.youtubeTrailer == null ? "w-full" : "w-2/3"} h-full bg-[#353535] rounded-md p-4 flex flex-col gap-4`}>
                        <div className='w-full h-1/3 '>
                            <span className='text-2xl text-white font-semibold'>{formattedProgram.directors.length > 1 ? localizedData.directors : localizedData.director}</span>
                            <div className='w-full h-[5.5rem] text-xl overflow-y-auto'>
                                <span>{formattedProgram.directors.join(', ')}</span>
                            </div>
                        </div>
                        <div className='w-full h-2/3'>
                            <span className='text-2xl text-white font-semibold'>{formattedProgram.actors.length > 1 ? localizedData.actors : localizedData.actor}</span>
                            <div className='w-full h-[12.5rem] text-xl overflow-y-auto'>
                                <span>{formattedProgram.actors.join(', ')}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}



export const getServerSideProps: GetServerSideProps = async (context) => {
    const { locale, category, id } = context.params!;
    const selectedLocale = locale || 'da';

    if (selectedLocale.toString() !== "en" && selectedLocale.toString() !== "da") {
        return {
            redirect: {
                destination: `/da/${category}/${id}`,
                permanent: false,
            },
        };
    }

    // Load locals data i form af de json filer der ligger i /locals mappen, bliver gjort serverside
    const filePath = path.join(process.cwd(), 'locals', `${selectedLocale}.json`);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const localizedData = JSON.parse(fileContent);

    try {
        const program = await fetchProgramById(id as string);
        let seasons = [];

        if (program == null) {
            return {
                props: {
                    program: null,
                    seasons: null,
                    locale: selectedLocale,
                    localizedData,
                },
            };
        }

        // Hvis programmet ikke er en film men en serie med sæsonner så fetch sæsonnerne
        if (program.plprogram$programType === 'series') {
            const fetchedSeasons = await fetchSeasonsBySeriesId(id as string);
            seasons = fetchedSeasons.entries || [];
        }

        return {
            props: {
                program: program || null,
                seasons,
                locale: selectedLocale,
                localizedData,
            },
        };
    } catch (error) {
        console.error('Error fetching program details:', error);
        return {
            props: {
                program: null,
                seasons: null,
                locale: selectedLocale,
                localizedData,
            },
        };
    }
};
