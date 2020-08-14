$(document).ready(function () {
  // Opens mobile tweet composer
  $('#open-tweet-composer').click(() => {
    $('#mobile-tweet-composer').addClass('show-mobile-composer');
    $('#mobile-form-container').removeClass('hide');
  });

  // Closes mobile tweet composer
  $('.secondary-btn').click((e) => {
    e.preventDefault();
    $('#mobile-tweet-composer').removeClass('show-mobile-composer');
    $('#mobile-form-container').addClass('hide');
  });

  // Submits tweet to server on mobile
  $('#mobile-new-tweet').submit(function (e) {
    e.preventDefault();
    const formData = $(this).serialize();
    const messageLength = $(this).children('textarea')[0].value.length;
    const errorMessage = $('#mobile-alert');
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
    $('#mobile').css('display', 'none');

    $.ajax({
      type: 'POST',
      url: 'tweets',
      success: () => {
        $('#tweets-container').empty();
        loadTweets();
        $('#mobile-tweet-composer').removeClass('show-mobile-composer ');
        $('textarea').val('');
        $('#mobile-counter').val(140);
      },
      data: formData
    });
  });
});
