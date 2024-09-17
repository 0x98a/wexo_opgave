import { GetServerSideProps } from 'next';
import { fetchProgramById, fetchSeasonsBySeriesId } from '../../../lib/service';
import { IconArrowLeft } from '@tabler/icons-react';
import fs from 'fs';
import path from 'path';
import { useState, useEffect } from 'react';
import { Loader } from '@mantine/core';
import NavBar from '../../../components/Navbar';

function formatRuntime(runtimeInSeconds: number, locale: string): string {
    if (!runtimeInSeconds) return locale === 'da' ? 'Ikke tilgængelig' : 'Unavailable';

    const hours = Math.floor(runtimeInSeconds / 3600);
    const minutes = Math.floor((runtimeInSeconds % 3600) / 60);

    return locale === 'da' ? `${hours} time${hours !== 1 ? 'r' : ''} og ${minutes} minut${minutes !== 1 ? 'ter' : ''}` : `${hours} hour${hours !== 1 ? 's' : ''} and ${minutes} minute${minutes !== 1 ? 's' : ''}`;
}

function formatProgramData(programData: any, locale: string) {
    const directors = programData.plprogram$credits.filter((credit: any) => credit.plprogram$creditType === 'director').map((director: any) => director.plprogram$personName);
    const actors = programData.plprogram$credits.filter((credit: any) => credit.plprogram$creditType === 'actor').map((actor: any) => actor.plprogram$personName);

    const genres = programData.plprogram$tags.filter((tag: any) => tag.plprogram$scheme === 'genre').map((tag: any) => locale === 'da' ? tag.plprogram$titleLocalized?.da : tag.plprogram$title);

    const cover = programData.plprogram$thumbnails?.["orig-2100x1400"]?.plprogram$url || '';
    const backdrop = programData.plprogram$thumbnails?.["orig-720x1280"]?.plprogram$url || '';

    const youtubeTrailer = programData.tdc$youtubeTrailer.length > 0 ? programData.tdc$youtubeTrailer : null

    const runtime = formatRuntime(programData.plprogram$runtime, locale);

    return {
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

    const formattedProgram = formatProgramData(program, locale);

    return (
        <>
            <NavBar localeData={localizedData}/>
            <div className='w-full h-screen p-16'>
                <div className='w-full h-[4rem] bg-[#353535] px-8 rounded-t-xl'>
                    <div className='flex flex-row gap-2 justify-start items-center h-full'>
                        <a href={`/${locale}/${program.plprogram$programType}${program.plprogram$programType == "movie" ? "s" : ""}`}>
                            <IconArrowLeft size="2rem" color="#fff" />
                        </a>
                        <span className='text-2xl text-white font-bold'>{formattedProgram.title}</span>
                    </div>
                </div>

                <div className='w-full h-[3rem] bg-[#353535] rounded-b-xl'>
                    <div className='flex flex-row gap-2 justify-start items-center h-full'>
                        <div className='w-1/3 h-full flex flex-row'>
                            <div className='w-1/6 h-full flex justify-center items-center'>
                                <p className='text-lg font-semibold text-white/[0.8]'>{formattedProgram.releaseYear}</p>
                            </div>
                            {program.plprogram$programType === 'series' ?
                                seasons && seasons.length > 0 ?
                                    <>
                                        <div className='w-1/3 h-full flex justify-center items-center'>
                                            <p className='text-lg font-semibold text-white/[0.8]'>{seasons.length} {seasons.length > 1 ? localizedData.seasons : localizedData.season}</p>
                                        </div>
                                    </>
                                    :
                                    <>
                                        <div className='w-1/3 h-full flex justify-center items-center'>
                                            <p className='text-lg font-semibold text-white/[0.8]'>0 {localizedData.seasons}</p>
                                        </div>
                                    </>
                                :
                                <>
                                    <div className='w-1/3 h-full flex justify-center items-center'>
                                        <p className='text-lg font-semibold text-white/[0.8]'>{formattedProgram.runtime}</p>
                                    </div>
                                </>
                            }
                            <div className='w-1/2 h-full flex justify-center items-center'>
                                <p className='text-lg font-semibold text-white/[0.8]'>{formattedProgram.genres.join(', ')}</p>
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

                    {formattedProgram.youtubeTrailer !== null && (
                        <div className='w-1/3 h-full bg-[#353535] rounded-md p-6'>
                            <h2 className='text-3xl font-semibold text-white mb-2'>{localizedData.trailer}:</h2>
                            <div className='w-full h-[19rem]'>
                                <iframe width="560" height="315" src={`https://www.youtube.com/embed/${formattedProgram.youtubeTrailer}`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share">
                                </iframe>
                            </div>
                        </div>
                    )}

                    <div className='w-2/3 h-full bg-[#353535] rounded-md p-4 flex flex-col gap-4'>
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

                {program.plprogram$programType === 'series' && seasons && seasons.length > 0 && (
                    <div className='mt-8'>
                        <h2 className='text-3xl text-white'>{localizedData.seasons}</h2>
                        <ul>
                            {seasons.map((season) => (
                                <li key={season.id} className='text-lg text-white'>
                                    {season.title}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { id, locale } = context.params!;
    const selectedLocale = locale || 'da';

    // Load locals data i form af de json filer der ligger i /locals mappen, bliver gjort serverside
    const filePath = path.join(process.cwd(), 'locals', `${selectedLocale}.json`);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const localizedData = JSON.parse(fileContent);

    try {
        const program = await fetchProgramById(id as string);
        let seasons = [];

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
