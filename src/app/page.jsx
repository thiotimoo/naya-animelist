import AnimeList from "@/components/AnimeList";
import Header from "@/components/AnimeList/Header";
import { getAnimeResponse, getNestedAnimeResponse, reproduce } from "@/app/libs/api-libs";

const Home = async () => {
  const topPopular = await getAnimeResponse("top/anime", "limit=8&sfw=true")
  const topAiring = await getAnimeResponse("top/anime", "limit=8&sfw=true&filter=airing")
  const _recomData = await getAnimeResponse("top/anime", "sfw=true&filter=favorite")
  const recommendedAnime = reproduce(_recomData.data, 4)
  
  return (
    <>
      <section>
        <Header title="Top Airing" linkHref='/airing' linkTitle="Show all..." />
        <AnimeList items={topAiring.data} />
      </section>
      <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
      <section>
        <Header title="Recommended Animes" />
        <AnimeList items={recommendedAnime} />
      </section>
      <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"></hr>
      <section>
        <Header title="Most Popular" linkHref='/popular' linkTitle="Show all..." />
        <AnimeList items={topPopular.data} />
      </section>
    </>
  );
}

export default Home;