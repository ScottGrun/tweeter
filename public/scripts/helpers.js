// Function to prevent XSS
const escape = function (str) {
  const div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

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

// Function to create tweet from data obj passed by server
const createTweetElement = (data) => {
  // Parse epoch time into readable time

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
  <p>${parseDate(data.created_at)}</p>
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


