document.querySelectorAll('.block-projects').forEach( block => (
    function( 
        $,
        container, 
        button, 
        pageManager, 
        progressManager,
        loadMoreComponent, 
        { createGetRequest }, 
        { ajaxUrl, nonce }
    ) 
    {
        /* 
         * html elements
         */
        const projectFiltersForm = container.querySelector('form.filters');
        const projects = container.querySelector('.projects'); // HtmlElement
        const $projects = $(projects); // jQuery object
        const loadMoreProjectsButtonElement = container.querySelector('button.load_more_projects');
        const masonryArgs = {
            itemSelector: '.grid-item',
            columnWidth: '.grid-sizer',
            percentPosition: true,
            gutter: '.gutter-sizer',
            transitionDuration: 0,
           // fitWidth: true
        };
    


        /* 
         * state
         */
        const initialPage = Number( projects.getAttribute('data-initial_page') );
        const totalPages = Number( projects.getAttribute('data-total_pages') );
            
    
    
        /* 
         * helper functions
         */
        function htmlToElement(html)
        {
            const template = document.createElement('template');
            template.innerHTML = html.trim();
    
            return template.content.firstChild;
        }
    
    
    
        /* 
         * callbacks
         */
        function filterInsert( projects )
        {
            $projects.empty().masonry('destroy');
    
            const elements = projects.map( item => htmlToElement(item) );
    
            const extra = '<div class="grid-sizer"></div><div class="gutter-sizer"></div>';
    
            $projects.append(extra);
            $projects.append(elements).masonry(masonryArgs);
        };
    
        function loadMoreProjects( projects )
        {
            const append = projects.map( item => htmlToElement(item) );
    
            $projects.append(append).masonry('appended', append);
        }
    
        function addActionForWordPress( {formData} )
        {
            formData.append('action', 'get_projects'); 
            formData.append('_ajax_nonce', nonce);
        }
    
        function removeNullOptions( {formData} )
        {
            ['status[]', 'categories[]'].forEach(
                function(field)
                {
                    if ( formData.get(field) == 'remove-via-js' || formData.get(field) == '' )
                    {
                        formData.delete(field);
                    }
                }
            );
        }
    
    
    
        /* 
         * get event handlers from loadMoreComponent
         */
        const { filterOnChangeHandler, loadMoreOnClickHandler } = loadMoreComponent( {
            button: button(loadMoreProjectsButtonElement, 'd-none'), 
            pageManager: pageManager(initialPage, totalPages), 
            progressManager: progressManager(), 
            getRequest: createGetRequest, 
            url: ajaxUrl, 
            form: projectFiltersForm, 
            insertAfterFilterItemsFunction: filterInsert,
            insertAfterLoadMoreItemsFunction: loadMoreProjects
        }) ;
        
    
    
        /* 
         * add them to the elements
         */
        $projects.masonry( masonryArgs );
    
        $( projectFiltersForm.querySelector('.filter.sectors') )
            .on( 'change', filterOnChangeHandler )
            .select2( {
                minimumResultsForSearch: Infinity 
            } );
        
        $( projectFiltersForm.querySelector('.filter.categories') )
            .on( 'change', filterOnChangeHandler )
            .select2( {
                minimumResultsForSearch: -1
            } );
        
        $( projectFiltersForm.querySelector('.filter.status') )
            .on( 'change', filterOnChangeHandler )
            .select2( {
                minimumResultsForSearch: Infinity 
            } );
        
        loadMoreProjectsButtonElement.addEventListener( 'click', loadMoreOnClickHandler );
    
        /* 
         * intercept the formdata creation and add anything else necessary
         */
        projectFiltersForm.addEventListener('formdata', addActionForWordPress);
        projectFiltersForm.addEventListener('formdata', removeNullOptions);
    } )( jQuery, block, button, pageManager, progressManager, loadMoreComponent, requestHandler, dataForBlocksThatGetMore )
);