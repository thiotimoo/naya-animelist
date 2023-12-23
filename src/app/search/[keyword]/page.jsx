import { getAnimeResponse } from "@/app/libs/api-libs";
import AnimeList from "@/components/AnimeList";
import Header from "@/components/AnimeList/Header";

const Page = async ({ params }) => {
    const { keyword } = params;
    const decodedKeyword = decodeURI(keyword);
    // const response = await fetch(
    //     `${process.env.NEXT_PUBLIC_API_BASE_URL}/anime?q=${keyword}&sfw=true`
    // )
    // const topAnime = await response.json()

    const searchAnime = await getAnimeResponse("anime", `q=${decodedKeyword}`);

    return (
        <>
            <section>
                <Header title="Pencarian untuk" query={decodedKeyword} />
                {searchAnime.data?.length ? (
                    <AnimeList items={searchAnime.data} />
                ) : (
                    <p className="my-4 mx-6 rounded-xl bg-zinc-800 px-4 py-2 italic">
                        Hasil tidak ditemukan.
                    </p>
                )}
            </section>
        </>
    );
};

export default Page;
