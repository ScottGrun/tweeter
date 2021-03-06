/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function () {
  // Submits tweets to server on desktop
  $('#new-tweet-form').submit(function (e) {
    e.preventDefault();

    const formData = $(this).serialize();

    const messageLength = $(this).children('textarea')[0].value.length;

    const errorMessage = $('#desk-alert');
    // Error handling for bad tweep inputs
    if (messageLength < 1) {
      errorMessage.css('display', 'flex');
      $('.alert-text').text('Message must be more than 0 chars');
      return;
    }

    if (messageLength > 140) {
      errorMessage.css('display', 'flex');
      $('.alert-text').text('Message must be less than 140 chars');
      return;
    }
    
    $('.alert-container').css('display', 'none');

    $.ajax({
      type: 'POST',
      url: 'tweets',
      success: () => {
        $('#tweets-container').empty();
        loadTweets();
        $('#mobile-tweet-composer').removeClass('show-mobile-composer ');
        $('textarea').val('');
        $('#counter').val(140);
      },
      data: formData
    });
  });

  loadTweets();
});
