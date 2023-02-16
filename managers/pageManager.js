const pageManager = function( 
    initialPage,
    _totalPages ) 
{
    /* 
     * state
     */
    let currentPage = initialPage;
    let totalPages = _totalPages;

    
    /* 
     * methods
     */
    function getCurrentpage()
    {
        if ( currentPage > totalPages )
        {
            setCurrentPage( totalPages );
            return totalPages;
        }

        return currentPage;
    }
    


    function setCurrentPage( _currentPage )
    {
        if ( _currentPage > totalPages )
        {
            currentPage = totalPages;
        }

        currentPage = _currentPage;
    }
    


    function setTotalPages( _totalPages )
    {
        totalPages = _totalPages;
    }
    


    function getNextPage()
    {
        const currentPage = getCurrentpage();

        if ( currentPage >= totalPages )
        {
            return totalPages;
        }

        return currentPage + 1;
    }
    


    function hasMorePages()
    {
        const currentPage = getCurrentpage();

        return currentPage < totalPages;
    }
    


    /* 
     * run it
     */
    if ( ! Number.isInteger(currentPage) )
    {
        throw new TypeError('currentPage is not a number');
    }

    if ( ! Number.isInteger(totalPages) )
    {
        throw new TypeError('totalPages is not a number');
    }
    


    /* 
     * interface
     */
    return {
        setCurrentPage,
        setTotalPages,
        getNextPage,
        hasMorePages
    }
};