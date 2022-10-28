export default function( button ) 
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


    /* 
     * interface
     */
    return {
        enable,
        disable,
        click
    };
};