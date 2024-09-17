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

type Genre = "action" | "comedy" | "thriller" | "war" | "romance" | "drama" | "crime" | "documentary" | "horror";

type ProgramDetailProps = {
    program: any | null;
    seasons: any[] | null;
    locale: string;
    localizedData: any;
};

type LocalizedData = {
    [locale: string]: {
        title: string;
        descriptionTitle: string;
        actorsTitle: string;
        directorsTitle: string;
        description?: string;
    };
};