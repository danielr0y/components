const requestHandler = (function() 
{
    /* 
     * helper functions
     */
    function handleErrors( response )
    {
        if ( ! response.ok ) 
        {
            throw ( response.status + ': ' + response.statusText )
        }

        return response.json();
    }
    


    /* 
     * methods
     */
    function createGetRequest( {
        url, 
        inProgress, 
        setInProgress, 
        success, 
        failure 
    } )
    {
        if ( inProgress ) 
        {
            return;
        }

        setInProgress(true);

        fetch( url ).then( response => handleErrors(response) )
                    .then( data => success(data) )
                    .catch( error => failure(error) )
                    .then( _ => setInProgress(false) );
    }
    


    function createPostRequest( {
        url, 
        form, 
        inProgress, 
        setInProgress, 
        success, 
        failure 
    } )
    {
        if ( inProgress ) 
        {
            return;
        }

        setInProgress(true);

        fetch( url, 
            {
                body : form, 
                method : 'POST' 
            } 
        ).then( response => handleErrors(response) )
         .then( data => success(data) )
         .catch( error => failure(error) )
         .then( _ => setInProgress(false) );
    }
    


    /* 
     * interface
     */
    return {
        createGetRequest,
        createPostRequest
    };
})();