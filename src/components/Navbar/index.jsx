import InputSearch from "./InputSearch";
import Logo from "./Logo";
import UserActionButton from "./UserActionButton";

const Navbar = () => {
    return (
        <nav className=" border-gray-200">
            <div className="max-w-screen-xl flex md:flex-row flex-col items-center justify-between mx-auto p-8">
                <div className="flex flex-row justify-center items-center md:w-auto w-full gap-4 " >
                    <Logo />
                    <div className="md:hidden block ">
                        <UserActionButton />
                    </div>
                </div>

                <div className="flex flex-row justify-center items-center md:w-auto w-full gap-4" >
                    <InputSearch />
                    <div className="md:block hidden ">
                        <UserActionButton />
                    </div>

                </div>
            </div>
        </nav>

    )
}

export default Navbar;