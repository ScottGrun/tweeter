/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {
  // Function to prevent XSS
  const escape = function (str) {
    const div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // Function to create tweet from data obj passed by server
  const createTweetElement = (data) => {
    // Parse epoch time into readable time
    const parseDate = (unixDate) => {
      const currentTime = new Date().getTime();
      const postDate = unixDate;
      const daysSincePost = parseInt(
        (currentTime - postDate) / (24 * 3600 * 1000)
      );
      if (daysSincePost > 7) {
        return `${new Date(unixDate).toLocaleDateString()}`;
      }
      if (daysSincePost === 0) {
        return `Today at ${new Date(unixDate).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit'
        })}`;
      }
      return `Tweeped ${daysSincePost} days ago`;
    };

    // Tweet Template
    const $tweet = $(`
<article class="tweet-card">
  <header>
    <div>
      <img class="tweet-author-pic" src=${escape(data.user.avatars)} />
      <div>
      <p class="tweet-author">${escape(data.user.name)}</p> 
      <p class="tweet-author-username">${escape(data.user.handle)}</p>
      </div>
    </div>
  </header>
  <p class="tweet-body">${escape(data.content.text)}</p>
  <footer>
    <p name="date-posted" for="tweet-card">${parseDate(data.created_at)}</p>
    <div class="tweet-icons-container">
      <img src="./images/icons/flag.svg" />
      <img src="./images/icons/retweet.svg" />
      <img src="./images/icons/like.svg" />
    </div>
  </footer>
</article>
`);

    return $tweet;
  };

  // Function appends tweets to the dom in chronological order
  const renderTweets = function (tweets) {
    for (let i = tweets.length; i >= 1; i--) {
      $('#tweets-container').append(createTweetElement(tweets[i - 1]));
    }
  };

  // Get tweets from server and passes them to the render function
  const loadTweets = () => {
    $.get('tweets', function (data, status) {
      renderTweets(data);
    });
  };

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
