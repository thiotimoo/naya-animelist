import {
    getAnimeResponse,
    getAnimeType,
    getNestedAnimeResponse,
    getScoreColor,
} from "@/app/libs/api-libs";
import { authUserSession } from "@/app/libs/auth-libs";
import prisma from "@/app/libs/prisma";
import AnimeList from "@/components/AnimeList";
import CollectionButton from "@/components/AnimeList/CollectionButton";
import CommentBox from "@/components/AnimeList/CommentBox";
import CommentInput from "@/components/AnimeList/CommentInput";
import Header from "@/components/AnimeList/Header";
import { HeartStraight, PlayCircle } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";

const Page = async ({ params: { id } }) => {
    const anime = await getAnimeResponse(`anime/${id}`);
    const recommendData = await getNestedAnimeResponse(
        `anime/${id}/recommendations`,
    );
    const user = await authUserSession();
    let collectionDatabase;
    let collectionError = "Tolong sign-in agar dapat menyimpan anime.";
    try {
        collectionDatabase = await prisma.collection.findFirst({
            where: {
                user_email: user?.email,
                anime_mal_id: anime.data?.mal_id?.toString(),
            },
        });
        if (user) {
            collectionError = null;
        }
    } catch (error) {
        collectionError =
            "Error connecting to the database: " + error.message.toString();
    }

    return (
        <div className="flex min-w-full flex-col gap-2 md:flex-row ">
            <div className="m-auto flex w-full flex-col gap-4 md:m-0 md:w-72 md:px-0  px-6">
                <div className="flex items-center justify-center">
                    <Image
                        className="max-h-full max-w-full rounded-2xl object-contain"
                        loading="lazy"
                        alt={anime.data.title}
                        src={anime.data.images.webp.large_image_url}
                        width={288}
                        height={384}
                    />
                </div>
                {anime.data.trailer.url && (
                    <Link
                        href={anime.data.trailer.url}
                        type="button"
                        className="flex w-full flex-row items-center justify-center gap-2 rounded-2xl bg-blue-700 px-5 py-2.5 text-lg font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        <PlayCircle size={32} weight="bold" /> Watch Trailer
                    </Link>
                )}
                {!collectionError && user ? (
                    <CollectionButton
                        anime_mal_id={anime.data.mal_id.toString()}
                        user_email={user.email}
                        anime_image={anime.data.images.webp.large_image_url}
                        anime_title={anime.data.title}
                        initial={collectionDatabase}
                    />
                ) : (
                    <p className="rounded-2xl bg-primary text-black px-4 py-2 italic">
                        {collectionError}
                    </p>
                )}
            </div>
            <div className="flex flex-1 flex-col ">
                <div className="flex flex-col gap-4 px-8 py-6 md:py-0 md:pb-6">
                    <h3 className="text-4xl font-bold">
                        {!anime.data?.title_english ||
                        !anime.data?.title_japanese ? (
                            <span>
                                {anime.data.title}
                                {anime.data?.rank ? (
                                    <span className="ms-2 rounded-md font-extrabold text-secondary">
                                        #{anime.data?.rank}
                                    </span>
                                ) : null}
                            </span>
                        ) : (
                            <span>
                                {anime.data.title_english}
                                <br />
                                {anime.data.title_japanese}
                                {anime.data?.rank ? (
                                    <span className="ms-2 rounded-md font-extrabold text-secondary">
                                        #{anime.data?.rank}
                                    </span>
                                ) : null}
                            </span>
                        )}
                    </h3>

                    <div className="flex flex-wrap items-center gap-3">
                        <span
                            className={`rounded-full border px-2.5 py-0.5 text-sm font-medium ${
                                getAnimeType(anime.data).color
                            }`}
                        >
                            {getAnimeType(anime.data).label}
                        </span>
                        <span
                            className={`flex flex-row items-center justify-center gap-1 rounded-full px-2.5 py-0.5 text-sm font-medium ${getScoreColor(
                                anime.data?.score,
                            )}`}
                        >
                            <HeartStraight weight="fill" size="0.875rem" />
                            {anime.data?.score}
                        </span>
                        <h3 className="text-xl">
                            <b>{anime.data?.status}</b>
                            {anime.data?.year ? ` • ${anime.data?.year}` : null}
                        </h3>
                    </div>

                    <div className="text-xl">
                        <b>Genre: </b>
                        {anime.data?.genres.map((genre, index) => {
                            if (index == anime.data?.genres?.length - 1)
                                return (
                                        <Link
                                            className="duration-y text-body transition-all hover:text-primary"
                                            href={genre.url}
                                            key={genre.mal_id}
                                        >
                                            {genre.name}
                                        </Link>
                                );
                            return (
                                    <Link
                                        className="duration-y text-body transition-all hover:text-primary"
                                        href={genre.url}
                                        key={genre.mal_id}
                                    >
                                        {genre.name}
                                        <span>, </span>
                                    </Link>
                            );
                        })}
                    </div>

                    <div className="text-xl">
                        {anime.data?.synopsis
                            .split("\n")
                            .map((paragraph, index) => {
                                if (index == 0)
                                    return <p key={index} className="mt-0">{paragraph}</p>;
                                return <p key={index} className="mt-6">{paragraph}</p>;
                            })}
                    </div>
                </div>
                {recommendData?.length ? (
                    <>
                        <hr className="my-8 h-px border-0 bg-gray-200 dark:bg-gray-700"></hr>
                        <section>
                            <Header title="Comments" />
                            <div className="px-8">
                                {user ? (
                                    <CommentInput
                                        anime_mal_id={anime?.data?.mal_id.toString()}
                                        user_email={user?.email}
                                        username={user?.name}
                                        anime_title={anime?.data?.title}
                                    />
                                ) : (
                                    <p className="my-4 rounded-xl bg-orange-600 px-4 py-2 italic">
                                        Tolong sign-in untuk dapat memposting
                                        komentar.
                                    </p>
                                )}

                                <CommentBox
                                    anime_mal_id={anime?.data?.mal_id.toString()}
                                />
                            </div>
                        </section>
                        <hr className="my-8 h-px border-0 bg-gray-200 dark:bg-gray-700"></hr>
                        <section>
                            <Header title="Recommendations" />
                            <div className="md:px-8">
                                <AnimeList items={recommendData} cols={"3"} />
                            </div>
                        </section>
                    </>
                ) : null}
            </div>
        </div>
    );
};

export default Page;
