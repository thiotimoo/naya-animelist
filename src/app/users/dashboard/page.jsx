import React from "react";
import { authUserSession } from "@/app/libs/auth-libs";
import { DoorOpen } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/AnimeList/Header";
import AnimeList from "@/components/AnimeList";
import prisma from "@/app/libs/prisma";

const Page = async () => {
    const user = await authUserSession();

    let collectionDatabase;
    let collectionData;
    let collectionError = "Tolong sign-in agar dapat menyimpan anime.";
    try {
        collectionDatabase = await prisma.collection.findMany({
            where: { user_email: user.email },
        });
        if (user) {
            collectionError = null;
            collectionData = collectionDatabase.map((item) => {
                return {
                    mal_id: item.anime_mal_id,
                    title: item.anime_title,
                    images: {
                        webp: {
                            large_image_url: item.anime_image,
                        },
                    },
                };
            });
        }
    } catch (error) {
        collectionError =
            "Error connecting to the database: " + error.message.toString();
    }

    return user ? (
        <div className="flex min-w-full flex-col gap-2 p-6 md:flex-row ">
            <div className="m-auto flex aspect-square h-72 w-72 flex-col gap-4 rounded-2xl bg-zinc-900 md:m-0">
                <div className="flex items-center justify-center">
                    <Image
                        className="bg aspect-square w-full rounded-2xl object-contain"
                        unoptimized
                        alt={user.name}
                        src={user.image}
                        width={288}
                        height={384}
                    />
                </div>
            </div>
            <div className="flex flex-1 flex-col">
                <div className="flex flex-col gap-4 px-8 py-6 md:py-0">
                    <h3 className="text-4xl font-bold">{user.name}</h3>
                    <div className="text-xl">{user.email}</div>
                    <Link
                        className="mb-2 me-2 rounded-lg border border-gray-800 px-5 py-2.5 text-center text-lg font-medium text-gray-900 hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-gray-300 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-800"
                        href="/api/auth/signout"
                    >
                        Sign Out
                    </Link>
                </div>
                <hr className="my-8 h-px border-0 bg-gray-200 dark:bg-gray-700"></hr>
                <section>
                    <Header title="My Collection" />
                    {!collectionError && user ? (
                        collectionData.length ? (
                            <AnimeList items={collectionData} cols={"3"} />
                        ) : (
                            <p className="mx-6 my-4 rounded-2xl bg-primary px-4 py-2 italic text-black">
                                Belum ada apa-apa disini. Ayo coba tambahkan
                                Koleksimu!
                            </p>
                        )
                    ) : (
                        <p className="mx-6 my-4 rounded-2xl bg-primary px-4 py-2 italic text-black">
                            {collectionError}
                        </p>
                    )}
                </section>
            </div>
        </div>
    ) : (
        <div className="m-auto flex flex-col items-center justify-center gap-6">
            <DoorOpen size={128} />
            <h3 className="text-5xl font-bold">You're signed out</h3>
            <Link
                className="mb-2 me-2 rounded-lg border border-gray-800 px-5 py-2.5 text-center text-sm font-medium text-gray-900 hover:bg-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-gray-300 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-800"
                href="/api/auth/signin"
            >
                Sign In
            </Link>
        </div>
    );
};

export default Page;
