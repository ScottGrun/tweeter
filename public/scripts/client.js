/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {
  // Test / driver code (temporary). Eventually will get this from the server.

  const escape = function (str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = (data) => {
    const parseDate = (unixDate) => {
      // use human readable variable names
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

  const renderTweets = function (tweets) {
    for (let i = tweets.length; i >= 1; i--) {
      $('#tweets-container').append(createTweetElement(tweets[i - 1]));
    }
  };

  const loadTweets = () => {
    $.get('tweets', function (data, status) {
      renderTweets(data);
    });
  };

  $(function () {
    const $form = $('#new-tweet-form');

    $form.submit(function (e) {
      e.preventDefault();

      const formData = $('#new-tweet-form').serialize();

      const messageLength = $form.children('textarea')[0].value.length;

      const errorMessage = $('#alert-container');
      //Error handling for bad tweep inputs
      if (messageLength < 1) {
        errorMessage.css('display', 'flex');
        $('#alert-text').text('Message must be more than 0 chars');
        return;
      }

      if (messageLength > 140) {
        errorMessage.css('display', 'flex');
        $('#alert-text').text('Message must be less than 140 chars');
        return;
      } else {
        $('#alert-container').css('display', 'none');
      }

      $.ajax({
        type: 'POST',
        url: 'tweets',
        success: () => {
          $('#tweets-container').empty();
          loadTweets();
        },
        data: formData
      });

    });
  });

  loadTweets();
});
