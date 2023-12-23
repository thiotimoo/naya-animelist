import AnimeItem from "./AnimeItem";

const AnimeList = ({ items, cols, className }) => {
    let _cols = cols ? "lg:grid-cols-" + cols : "lg:grid-cols-4 ";
    return (
        <div
            className={
                "grid grid-cols-2 gap-3 p-6 md:grid-cols-4 md:gap-6 lg:px-0" +
                _cols +
                className
            }
        >
            {items?.map((data) => (
                <AnimeItem data={data} key={data.mal_id}/>
            ))}
        </div>
    );
};

export default AnimeList;
