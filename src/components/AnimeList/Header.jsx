import Link from "next/link";

const Header = ({ title, linkHref, linkTitle, query, className }) => {
    return (
        <div className={"flex flex-row justify-between items-center px-8 " + className}>
            <h2 className="font-bold text-2xl">{title}
                {
                    query
                        ?
                        <span className="text-secondary"> "{query}"</span>
                        : null
                }
            </h2>
            {
                linkHref && linkTitle
                    ?
                    <Link href={linkHref} className="font-medium text-secondary hover:underline">{linkTitle}</Link>
                    : null
            }
        </div>
    )
}

export default Header;