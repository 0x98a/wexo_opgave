import { useEffect, useState } from 'react';
import { IconArrowRight } from '@tabler/icons-react';
import { useRouter } from 'next/router';
import path from 'path';
import fs from 'fs';
import { Grid } from '@mantine/core';
import NavBar from 'components/Navbar';

type Genre = "action" | "comedy" | "thriller" | "war" | "romance" | "drama" | "crime" | "documentary" | "horror";

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
    const router = useRouter();
    const { pathname, query, asPath } = router;

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

                <Grid grow gutter="sm" className='h-[10rem]'>
                    {genres.map((genre: Genre) => 
                        <Grid.Col span={2.4}>
                            <a href={`http://localhost:3000/${locale}/series?genre=${genre}`} className='w-full hover:scale-[103%] transition-all h-[6rem] rounded-md border-2 border-[#353535] bg-[#292929] hover:border-[#616161] hover:bg-[#3f3f3f] flex justify-center items-center'>
                                <span className='text-white text-4xl font-semibold'>{localeData[genre]}</span>
                            </a>
                        </Grid.Col>
                    )}
                </Grid>

                </div>
            </div>
        </>
    );
}


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