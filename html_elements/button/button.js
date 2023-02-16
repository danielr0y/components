const button = function( 
    button,
    hideClassName 
) 
{
    /* 
     * methods
     */
    function enable()
    {
        button.disabled = false;
    }
    


    function disable()
    {
        button.disabled = true;
    }
    


    function hide()
    {
        button.classList.add(hideClassName);
    }
    


    function show()
    {
        button.classList.remove(hideClassName);
    }
    


    function click()
    {
        button.dispatchEvent( new Event('click') );
    }
    


    /* 
     * run it
     */
    if ( ! button instanceof HTMLButtonElement)
    {
        throw new TypeError('element is not a button');
    }
    
    if ( typeof hideClassName !== 'string')
    {
        throw new TypeError('hideClassName is not a string');
    }
    


    /* 
     * interface
     */
    return {
        enable,
        disable,
        show,
        hide,
        click
    };
};