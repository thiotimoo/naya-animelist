
export const getAnimeResponse = async (resource, query) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${resource}?${query}`)
    const anime = await response.json()
    return anime;
}
const animeTypes = {
    ep: (episodes) => ({
        label: `EP ${episodes}`,
        color: 'bg-black text-white'
    }),

    other: (type) => {
        let typeData = {
            label: type,
            color: 'bg-green-800 text-white'
        }
        switch (type) {
            case 'Movie':
                typeData.color = 'bg-blue-900 text-white';
                break;
            case 'Music':
                typeData.color = 'bg-red-900 text-white';
                break;
        }

        return typeData;
    }
}

export const getScoreColor = (score) => {
    if (score >= 8) {
        return 'bg-green-300 text-black'
    } else if (score >= 6) {
        return 'bg-blue-300 text-black'
    } else if (score >= 2) {
        return 'bg-yellow-300 text-black'
    } else if (score >= 0) {
        return 'bg-red-300 text-black'
    }
}

export const getAnimeType = (data) => {
    if (data?.episodes) {
        if (data?.episodes == 1)
            return animeTypes.other(data?.type)
        return animeTypes.ep(data?.episodes)
    }
    return animeTypes.other(data?.type)
}

export const getNestedAnimeResponse = async (resource, query, objectProperty) => {
    const response = await getAnimeResponse(resource, query)
    return response.data.flatMap(item => item.entry)
}

export const reproduce = (data, gap) => {
    const random1 = ~~(Math.random() * (data?.length - gap) + 1)
    const random2 = random1 + gap

    return data?.slice(random1, random2)
}

export const isExplicit = (data) => {
    return Boolean(data?.rating == 'Rx - Hentai' || data?.explicit_genres?.length);
}