// Asynchronous Flickr Search
//
// Flickr reveals a searchable JSON Feed you can access via jQuery's $.getJSON()
// method. Use this to allow users to search for a tag or comma-separated list
// of tags and view the images that are found.
//
// Allow users to click the images to see a larger version with more information.
$(document).on('ready', function(){
    // Place your code here, inside the document ready handler.

    // Create a function called `searchImages()`. This function will handle the
    // process of taking a user's search terms and sending them to Flickr for a
    // response.

var searchImages = function(tags){
  
 
  
  (function() {
    
  var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
  $.getJSON( flickerAPI, {
    tags: tags,
    tagmode: "any",
    format: "json"
  })
  
  
  
    .done(function( data ) {
    

    $('#images').empty();
    
      $.each( data.items, function( i, item ) {
        
     var newItem = $('<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 new-item">');  
     var newP = $('<p class="">');   
  
      var newImage = $( "<img class='img-thumbnail avatar'>" ).attr( "src", item.media.m );
 
      
      var moreInfoButton = $("<button>").text("More Info"); 
      $(moreInfoButton).addClass("btn btn-primary btn-lg more-info");
     
        $(moreInfoButton).attr({'data-toggle': 'modal',
                               'data-target' : '#infoModal',
                                'data-title' : item.title, 
                                'data-author' : item.author,
                                'data-imgsrc' : item.media.m,
                                'data-description': item.description,
                               });
       
      
     
        
        
      newImage.appendTo(newItem); 
      newP.appendTo(newItem); 
      moreInfoButton.appendTo(newItem);   
      $('#images').append(newItem);
        
        
        
        if ( i === 10 ) {
          return false;
        }
      });
    });  
  })();
    
  
};


  
  
    // Inside the `searchImages()` function, the following things should happen:

        // 1.   Accept a string value called `tags` as an argument. Example:
        //      `var searchPhotos = function(tags){`

        //
        // 2.   Define the location of the Flickr API like this:
        //      `var flickrAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";`
        //
        // 3.   Construct a `$.getJSON()` call where you send a request object
        //      including the tags the user submitted, and a `done()` handler
        //      that displays and refreshes the content appropriately.
        //
        // 4.   Update the display to add the images to the list with the id
        //      `#images`.

    // Attach an event to the search button (`button.search`) to execute the
    // search when clicked.

  
  $('button.search').click(function(){
    
     
    event.preventDefault();
    
 var searchTags = $("input:text").val();  
   searchImages(searchTags);
    
  });
  
$('#infoModal').on('show.bs.modal', function (event) {
  var button = $(event.relatedTarget) // Button that triggered the modal
  var imageTitle = button.data('title'); // Extract info from data-* attributes
  var imageAuthor = button.data('author');
  var imageDescription = button.data('description');
  console.log(imageTitle)
  // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
  // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
  var modal = $(this);
  
  modal.find('.modal-title').empty();
  modal.find('.modal-body').empty();

  modal.find('.modal-title').html('<h2>Image Title</h2>' + imageTitle);

  modal.find('.modal-body').html('<h3>Image Author</h3>' + imageAuthor + '<br>' + '<h3>Image Description</h3>' + imageDescription );
  
  

})

        // When the Search button is clicked, the following should happen:
        //
        // 1.   Prevent the default event execution so the browser doesn't
        //      Example: `event.preventDefault();`
        //
        // 2.   Get the value of the 'input[name="searchText"]' and use that
        //      as the `tags` value you send to `searchImages()`.
        //
        // 3.   Execute the `searchImages()` function to fetch images for the
        //      user.

    // STRETCH GOAL: Add a "more info" popup using the technique shown on the
    // Bootstrap Modal documentation: http://getbootstrap.com/javascript/#modals-related-target



});
