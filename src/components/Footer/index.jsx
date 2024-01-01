import Link from "next/link";
import React from "react";

const Footer = () => {
    return (
        <div className="mx-auto flex w-full max-w-screen-lg flex-col  p-6 text-center text-xl text-body">
            <hr className="my-6 h-px border-0 bg-gray-200 dark:bg-gray-700"></hr>
            <h3>
                ✨ Created by{" "}
                <Link
                    className="bg-secondary px-2 font-bold text-black"
                    href="https://github.com/thiotimoo"
                >
                    @thiotimoo
                </Link>
            </h3>
            <h3>
                Powered by <b>Jikan.moe API</b>
            </h3>
        </div>
    );
};

export default Footer;
