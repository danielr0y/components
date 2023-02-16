const loadMoreComponent = function( {
    button: { enable: enableButton, disable: disableButton, show: showButton, hide: hideButton }, 
    pageManager: { setCurrentPage, setTotalPages, getNextPage, hasMorePages }, 
    progressManager: { getInProgress, setInProgress }, 
    getRequest, 
    url,
    form,
    insertAfterFilterItemsFunction,
    insertAfterLoadMoreItemsFunction
}) 
{
    /* 
     * helper functions
     */
    function loadMoreComponentGetRequest( formData, insertFunction )
    {
        const queryString = new URLSearchParams(formData).toString();

        getRequest( {
            url: url + '?' + queryString,
            inProgress: getInProgress(), 
            setInProgress: function(inProgress)
            {
                setInProgress(inProgress);
        
                if ( hasMorePages() )
                {
                    inProgress  ? disableButton()
                                : enableButton();

                    showButton();
                } else
                {
                    disableButton();
                    hideButton();
                }
            },
            success: function( { currentPage, totalPages, items } )
            {
                insertFunction(items);
        
                setCurrentPage(currentPage);
                setTotalPages(totalPages);
            },
            failure: function( error )
            {
                console.log( error );
            }});
    }   
    
    
    
    /* 
     * methods
     */
    function filterOnChangeHandler()
    {
        const formData = new FormData(form);
        formData.append('paged', 1);

        loadMoreComponentGetRequest( formData, insertAfterFilterItemsFunction );
    }

    function loadMoreOnClickHandler()
    {
        const formData = new FormData(form);
        formData.append('paged', getNextPage());

        loadMoreComponentGetRequest( formData, insertAfterLoadMoreItemsFunction );
    }
    

    
    /* 
     * interface
     */
    return {
        filterOnChangeHandler,
        loadMoreOnClickHandler
    }
};