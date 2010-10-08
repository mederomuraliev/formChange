(function($){

    $.fn.formChange = function( opts ) {
        return this.each(function(i,o) {

            var options = {
            reset: function(){},
            change: function(){}
            }

            opts = $.extend( options, opts );

            var defaultEls = {
                'textboxes': {selector:'textarea,input:text', events:'blur'},
                'checkboxes' : {selector:':checkbox', events:'click'},
                'dropdowns' : {selector:'select', events:'change'}
            };

            var serialized = $(this).serialize();

            $(this).data('storage', serialized);

            for ( var e in defaultEls ) {
            if ( defaultEls.hasOwnProperty( e ) ) {
                var els = $( defaultEls[e].selector )
                , event = defaultEls[e].events;

                els.bind( event , function() {

                // need a delay because sometimes its necessary to manually trigger a 'click' on say
                // a hidden checkbox that's triggered by an anchor, otherwise without the delay 
                // the functions run concurrently and the serialized value is the same.

                setTimeout(function() {
                    var s = $(o).serialize()
                    , changed = (s !== serialized);

                    if ( changed ) {
                        opts.change.apply( o, arguments )
                    } else {
                        opts.reset.apply( o, arguments )
                    }
                }, 100 );
                })
            }
            }


        });
    }
})(jQuery);
