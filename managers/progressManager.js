const progressManager = function() 
{
    /* 
     * state
     */
    let inProgress = false;
    


    /* 
     * methods
     */
    function getInProgress()
    {
        return inProgress;
    }
    


    function setInProgress( _inProgress )
    {
        if ( inProgress == _inProgress )
        {
            return;
        }

        inProgress = _inProgress;
    }
    


    /* 
     * interface
     */
    return {
        getInProgress, 
        setInProgress
    };
};