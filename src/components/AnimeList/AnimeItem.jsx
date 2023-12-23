import Link from "next/link";
import React from "react";
import AnimeImage from "./AnimeImage";

const AnimeItem = ({data}) => {
  return (
    <Link
      href={`/anime/${data.mal_id}`}
      className="grid h-auto w-full justify-items-center"
      key={data.mal_id}
    >
      <AnimeImage
        data={data}
        className={"max-h-64 w-full transform transition hover:scale-105"}
        imageClass={"max-h-64"}
      />
      <h3 className="pt-1 text-center text-xl font-medium">{data.title}</h3>
    </Link>
  );
};

export default AnimeItem;
