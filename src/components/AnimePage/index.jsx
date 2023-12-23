"use client";

import AnimeList from "@/components/AnimeList";
import HeaderMenu from "@/components/Utilities/HeaderMenu";
import Pagination from "@/components/Utilities/Pagination";
import React, { useEffect, useState } from "react";
import Loading from "@/app/loading";
import { getAnimeResponse } from "@/app/libs/api-libs";

const AnimePage = ({ title, extraQuery }) => {
    const [page, setPage] = useState(1);
    const [api, setAPI] = useState(null);

    const clearData = () => {
        setAPI(null);
    };

    const fetchData = async () => {
        setAPI(
            await getAnimeResponse(
                "top/anime",
                `page=${page}&sfw=true&${extraQuery ?? ""}`,
            ),
        );
    };

    useEffect(() => {
        fetchData();
    }, [page]);

    return api ? (
        <>
            <section>
                <HeaderMenu
                    title={title}
                    page={page}
                />
                <Pagination
                    page={page}
                    lastPage={api?.pagination?.last_visible_page}
                    setPage={setPage}
                    clearData={clearData}
                />
                <AnimeList items={api.data} />
                <Pagination
                    page={page}
                    lastPage={api?.pagination?.last_visible_page}
                    setPage={setPage}
                    clearData={clearData}
                />
            </section>
        </>
    ) : (
        <Loading />
    );
};

export default AnimePage;
