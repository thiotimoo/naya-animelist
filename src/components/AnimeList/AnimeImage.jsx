import { getAnimeType, isExplicit } from "@/app/libs/api-libs";
import Image from "next/image";
import React from "react";
import Badge from "./Badge";
import { EyeSlash } from "@phosphor-icons/react/dist/ssr";

const AnimeImage = ({ data, className, imageClass }) => {
    return (
        <div className="flex items-center justify-center">
            <div className={`${className}`}>
                <Image
                    unoptimized
                    className={`h-full w-full rounded-2xl bg-zinc-800 object-contain ${
                        isExplicit(data) && "blur-lg"
                    } ${imageClass}`}
                    alt={data?.title}
                    src={data?.images?.webp.large_image_url}
                    width={200}
                    height={256}
                />
                {isExplicit(data) && (
                    <EyeSlash className="absolute bottom-0 left-0 right-0 top-0 m-auto w-1/3" />
                )}
                {data?.type && (
                    <Badge
                        label={getAnimeType(data).label}
                        className={
                            "absolute bottom-0 right-0 " +
                            getAnimeType(data).color
                        }
                    />
                )}
            </div>
        </div>
    );
};

export default AnimeImage;
