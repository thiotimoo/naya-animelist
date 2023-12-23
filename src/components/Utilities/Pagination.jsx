import { CaretLeft, CaretRight } from "@phosphor-icons/react/dist/ssr"

const Pagination = ({ page, lastPage, setPage, clearData }) => {
    const scrollTop = () => {
        scrollTo({
            behavior: "smooth",
            top: 0
        })
    }

    const handleNextState = () => {
        setPage((oldState) => {
            if (oldState < lastPage) {
                scrollTop();
                clearData();
                return oldState + 1
            }
            return oldState;
        })
    }

    const handlePrevState = () => {
        setPage((oldState) => {
            if ((oldState - 1) > 0) {
                scrollTop()
                clearData();
                return oldState - 1
            }
            return oldState;
        })
    }
    return (
        <div>
            <div className="flex flex-row gap-2 items-center justify-center">
                {
                    page <= 1 ? <CaretLeft alt="Previous" size={32} weight="bold" className="transition-all duration-y opacity-50" />
                        :
                        <CaretLeft alt="Previous" size={32} weight="bold" className="hover:fill-secondary transition-all duration-y active:fill-primary cursor-pointer" onClick={handlePrevState} />
                }
                <span className="text-lg text-gray-700 dark:text-gray-400"><span className="font-semibold text-gray-900 dark:text-white">{page}</span> of <span className="font-semibold text-gray-900 dark:text-white">{lastPage}</span>
                </span>
                {page >= lastPage ?
                    <CaretRight alt="Next" size={32} weight="bold" className="transition-all duration-y opacity-50" />
                    :
                    <CaretRight alt="Next" size={32} weight="bold" className="hover:fill-secondary transition-all duration-y active:fill-primary cursor-pointer" onClick={handleNextState} />}
            </div>
        </div>
    )
}

export default Pagination