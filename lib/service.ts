const API_BASE_URL = 'https://feed.entertainment.tv.theplatform.eu/f/jGxigC';

/**
     * Auto generated by VSCODE
    * @param {string} [tags]
    * @param {number} [year]
    * @param {string} [range]
*/
export const fetchSeries = async (tags?: string, year?: number, range?: string) => {
    let url = `${API_BASE_URL}/bb-all-pas?form=json&byProgramType=series`;

    // Add filters hvis de er sat ellers fetcher den bare default data
    if (tags) url += `&byTags=${tags}`;
    if (year) url += `&byYear=${year}`;
    if (range) url += `&range=${range}`;

    //AbortController så vi kan abort hvis requesten timeouter.
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 7500);

    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId); //Clear timeout når den er successfuld.

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        if (error instanceof Error) { 
            if (error.name === 'AbortError') {
                console.error('Fetch request timed out');
                return null;
            }

            throw error;
        } else {
            throw new Error('En ukendt fejl opstod.'); //Ukendt fejl
        }
    }
};


/**
     * Auto generated by VSCODE
     * @param {string} id
*/
export const fetchProgramById = async (id: string) => {
    let url = `${API_BASE_URL}/bb-all-pas/${id}?form=json`;

    //AbortController så vi kan abort hvis requesten timeouter.
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 7500);

    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId); //Clear timeout når den er successfuld.

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        if (error instanceof Error) { 
            if (error.name === 'AbortError') {
                console.error('Fetch request timed out');
                return null;
            }

            throw error;
        } else {
            throw new Error('En ukendt fejl opstod.'); //Ukendt fejl
        }
    }
};

/**
     * Auto generated by VSCODE
    * @param {string} [tags]
    * @param {number} [year]
    * @param {string} [range]
*/
export const fetchMovies = async (tags?: string, year?: number, range?: string) => {
    let url = `${API_BASE_URL}/bb-all-pas?form=json&byProgramType=movie`;

    // Add filters hvis de er sat ellers fetcher den bare default data
    if (tags) url += `&byTags=${tags}`;
    if (year) url += `&byYear=${year}`;
    if (range) url += `&range=${range}`;

    //AbortController så vi kan abort hvis requesten timeouter.
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 7500);

    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId); //Clear timeout når den er successfuld.

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        if (error instanceof Error) { 
            if (error.name === 'AbortError') {
                console.error('Fetch request timed out');
                return null;
            }

            throw error;
        } else {
            throw new Error('En ukendt fejl opstod.'); //Ukendt fejl
        }
    }
};

/**
     * Auto generated by VSCODE
    * @param {string} franchise
    * @param {string} [sort]
    * @param {string} [range]
*/
export const fetchProgramsByFranchise = async (franchise: string, sort?: string, range?: string) => {
    let url = `${API_BASE_URL}/bb-all-pas?form=json&byProgramType=series`;

    // Add filters hvis de er sat ellers fetcher den bare default data
    if (sort) url += `&sort=${sort}`;
    if (range) url += `&range=${range}`;

    //AbortController så vi kan abort hvis requesten timeouter.
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 7500);

    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId); //Clear timeout når den er successfuld.

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        if (error instanceof Error) { 
            if (error.name === 'AbortError') {
                console.error('Fetch request timed out');
                return null;
            }

            throw error;
        } else {
            throw new Error('En ukendt fejl opstod.'); //Ukendt fejl
        }
    }
};

/**
     * Auto generated by VSCODE
    * @param {string} scopeId
*/
export const fetchProductByScopeId = async (scopeId: string) => {
    let url = `${API_BASE_URL}/bb-da-products?form=json&fields=id,scopeIds,pricingPlan,scopes,title,productTags,offerStartDate,offerEndDate&byScopeIds=${encodeURIComponent(scopeId)}`;

    //AbortController så vi kan abort hvis requesten timeouter.
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 7500);

    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId); //Clear timeout når den er successfuld.

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        if (error instanceof Error) { 
            if (error.name === 'AbortError') {
                console.error('Fetch request timed out');
                return null;
            }

            throw error;
        } else {
            throw new Error('En ukendt fejl opstod.'); //Ukendt fejl
        }
    }
};

/**
     * Auto generated by VSCODE
    * @param {string} seriesId
*/
export const fetchSeasonsBySeriesId = async (seriesId: string) => {
    let url = `${API_BASE_URL}/bb-all-seasons?form=json&lang=da&bySeriesId=${encodeURIComponent(seriesId)}`;

    //AbortController så vi kan abort hvis requesten timeouter.
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 7500);

    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId); //Clear timeout når den er successfuld.

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        if (error instanceof Error) { 
            if (error.name === 'AbortError') {
                console.error('Fetch request timed out');
                return null;
            }

            throw error;
        } else {
            throw new Error('En ukendt fejl opstod.'); //Ukendt fejl
        }
    }
};