const HeaderMenu = ({title, page}) => {
    return (
        <div className="p-8">
            <h3 className="font-extrabold text-center text-3xl text-primary">
            {title} <span className="text-body">#{page}</span>
            </h3>
        </div>
    )
}

export default HeaderMenu;