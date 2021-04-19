import React from "react";

export default ({
                    currentPage,
                    nextPageHandler,
                    prevPageHandler,
                    firstPageHandler,
                    lastPageHandler,
                    lastPage
                }) => {
    return <div className="row mt-5">
        <div className="col text-right">
            <div className="d-flex w-100 justify-content-end">

                <a className={`btn extra-thin green-transparent mr-2 ${currentPage === 1 ? 'disabled' : ''}`}
                   onClick={firstPageHandler}>{"<<"}</a>

                <a className={`btn extra-thin green-transparent mr-2 ${currentPage === 1 ? 'disabled' : ''}`}
                   onClick={prevPageHandler}>{"<"}</a>

                <span className="mr-2">{currentPage} of {lastPage}</span>

                <a className={`btn extra-thin green-transparent mr-2 ${currentPage === lastPage ? 'disabled' : ''}`}
                   onClick={nextPageHandler}>{">"}</a>

                <a className={`btn extra-thin green-transparent ${currentPage === lastPage ? 'disabled' : ''}`}
                   onClick={lastPageHandler}>{">>"}</a>
            </div>
        </div>
    </div>
}
