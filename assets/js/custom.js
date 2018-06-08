$( document ).ready( function() {
    $( "button#profilePicButton" ).click( function() {
        var imageTitle = $( "#imageTitle" ).val();
        var imageTag = $( "#imageTag" ).val();
        var imageDescription = $( "#imageDescription" ).val();
        var files = $( "#profilePic" ).get(0).files;

        if( 0 === files.length ) {
            $( '.image-holder' ).html( '<p class="alert alert-warning">Select at least one image file</p>' );
            $( '.image-holder' ).show();
        } else {
            var formData = new FormData();
            formData.append( 'imagetitle', imageTitle );
            formData.append( 'imagetag', imageTag );
            formData.append( 'imagedescription', imageDescription );
            for( var i = 0; i < files.length; i++ ) {
                var file = files[i];
                formData.append( 'imageFile', file );
            }
            var settings = {
                url: 'api/add',
                method: 'POST',
                data: formData,
                processData: false,
                contentType: false,
                success: function( data ) {
                    var imgHtml = '<p class="alert alert-success">Image has been uploaded successfully</p>';
                    /*
                    if( data.fileCount > 0 ) {
                        for( var j = 0; j < data.fileCount; j++ ) {
                            imgHtml = imgHtml + '<img class="uploaded-image" src="' + data.pathArray[j] + '" width="150" />';
                        }
                    }*/
                    $( '.image-holder' ).html( imgHtml );
                    $( '.image-holder' ).show();
                },
                error: function( jqXhr, textStatus, errorThrown ) {
                    $( '.image-holder' ).html( '<p class="alert alert-warning">Upload failed</p>' );
                    $( '.image-holder' ).show();
                }
            };
            $.ajax( settings );
        }
    } );
} );