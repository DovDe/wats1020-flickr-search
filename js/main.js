
$(document).on('ready', function(){
    
  
  
// this function searches for flicker images 
var searchImages = function(tags){
  
 
  // this goes to the flickr data base and gets the data
  (function() {
    
  var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
  $.getJSON( flickerAPI, {
    tags: tags,
    tagmode: "any",
    format: "json"
  })
  
  
  
    .done(function( data ) {
    
// this empties out the older search content 
    $('#images').empty();
    
    
      $.each( data.items, function( i, item ) {
        
        // these next lines I am creating the bootstrap divs to place my content in 
      
       var newItem = $('<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3 new-item">');
        
        
        
        
       var imageRowDiv  =  $('<div class="row">');
       var imageColDiv = $('<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">');        
       var newImage = $( "<img class='img-thumbnail img-responsive image'>" ).attr( "src", item.media.m );
        
 
      var buttonsRowDiv = $('<div class="row ">'); 
      var buttonsColDiv = $('<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">');  
  
        
       var descriptionInfoButton =  $("<button type='button' class='btn btn-primary btn-block descriptionInfo ' data-toggle='modal' data-target='#infoModal' data-whatever='@description'>Open modal for @mdo>").text("Description");
       var authorInfoButton =  $("<button type='button' class='btn btn-primary btn-block authorInfo' data-toggle='modal' data-target='#infoModal' data-whatever='@author'>Open modal for @mdo>").text("Author Info");
       var sourceInfoButton =  $("<button type='button' class='btn btn-primary btn-block sourceInfo' data-toggle='modal' data-target='#infoModal' data-whatever='@mdo'>Open modal for @mdo>").text("Source Info");
 

        // these next lines are the button data for my modals
        
        $(descriptionInfoButton).attr({'data-toggle': 'modal',
                                'data-target' : '#infoModal',
                                'data-title' : item.title,              
                                'data-description': item.description,                                
                                'data-button' : descriptionInfoButton,
                                 'type' : 'button'                                  
                               });
       
      
        $(authorInfoButton).attr({
                        'data-toggle': 'modal',
                        'data-target' : '#infoModal',
                        'data-author' : item.author,
                        'data-title' : item.title, 
                        'data-description': item.description,
                        'data-button' : authorInfoButton,
                        'type' : 'button'
                          });
        
        $(sourceInfoButton).attr({
                        'data-toggle': 'modal',
                        'data-target' : '#infoModal',
                        'data-title' : item.title, 
                        'data-imgsrc' : item.media.m,
                        'data-description': item.description,
                        'data-button' : sourceInfoButton,
                        'type' : 'button'           
                          });
     
      
       // these are the variables I am using to fill the divs into the correct containers
       // currently I do not actually need to write the code this way but I am trying to come uo with 
       // some function the will enable me to account for the bootstrap row and columns and fill them acording to the
        //break points. 
        
   var addImage =      newImage.appendTo(imageColDiv).appendTo(imageRowDiv).appendTo(newItem);
   var addButton =      buttonsColDiv.appendTo(buttonsRowDiv).appendTo(newItem);
   var descriptionButton   =   descriptionInfoButton.appendTo(buttonsColDiv);
    var authorButton  =    authorInfoButton.appendTo(buttonsColDiv);
    var sourceButton =    sourceInfoButton.appendTo(buttonsColDiv);   
         
    
       // here I am actually appending the items into their correct divs  
        
    var newRow = $('<div class="row new-Row">');
           
       
    addImage; addButton; descriptionButton; authorButton; sourceButton;
    newItem.appendTo(newRow);   
    
    $('#images').append(newRow);
        
        if ( i === 16 ) {
          return false;
        }
        
        
        
      });

    });  
  })();
   
  
};


  
// this is to activate the search button
  
  $('button.search').click(function(){
    
     // this prevents any defaults that would happen apoun clicking on the button
    
    event.preventDefault();
   
    
  // this finds the text input and names it searchtags
    //then calls the function using the searchimages function
 var searchTags = $("input:text").val();  
   searchImages(searchTags);
    
  });
  
  
  // this function is to create the modals 
$('#infoModal').on('show.bs.modal', function (event) {
  
  
  var button = $(event.relatedTarget) // Button that triggered the modal
  var imageTitle = button.data('title'); // Extract info from data-* attributes
  var imageAuthor = button.data('author');
  var imageDescription = button.data('description');
  var imageSource = button.data('imgsrc');
  console.log(imageTitle)
  
  
  var modal = $(this);
  
  // here I am emptying out the modals
  modal.find('.modal-title').empty();
  modal.find('.modal-body').empty();
  
   modal.find('.modal-title').html(imageTitle);
  
  
// here I am finding the correct button and activating it and filling it 
  // with the correct data
  
if ($(button).hasClass('descriptionInfo')){
  console.log('this rocks');
   modal.find('.modal-body').html('<h3>Image Description</h3>' + imageDescription );
} else if ($(button).hasClass('authorInfo')) {
  modal.find('.modal-body').html('<h3>Author</h3>' + imageAuthor );
}else {
    modal.find('.modal-body').html('<h3>Source</h3>' + imageSource );
}


});




});
