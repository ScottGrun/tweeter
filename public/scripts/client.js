/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function () {
  // Test / driver code (temporary). Eventually will get this from the server.
  const tweets = [
    {
      user: {
        name: 'Newton',
        avatars: 'https://i.imgur.com/73hZDYK.png',
        handle: '@SirIsaac'
      },
      content: {
        text:
          'If I have seen further it is by standing on the shoulders of giants'
      },
      created_at: 1461116232227
    },
    {
      user: {
        name: 'Descartes',
        avatars: 'https://i.imgur.com/nlhLi3I.png',
        handle: '@rd'
      },
      content: {
        text: 'Je pense , donc je suis'
      },
      created_at: 1461113959088
    }
  ];
  const createTweetElement = (data) => {
    console.log(data);

    const parseDate = (unixDate) => {
      var t2 = new Date().getTime();
      var t1 = unixDate;
      const daysSincePost = parseInt((t2-t1)/(24*3600*1000));
      if(daysSincePost > 7){
        return `${new Date(unixDate).toLocaleDateString()}`
      }
      return `Tweeped ${daysSincePost} days ago`;

    };
    const $tweet = $(`
  <article class="tweet-card">
  <header>
    <div>
      <img class="tweet-author-pic" src=${data.user.avatars} />
      <p class="tweet-author">${data.user.name}</p>
    </div>
    <p class="tweet-author-username">${data.user.handle}</p>
  </header>
  <p class="tweet-body">${data.content.text}</p>
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

  for (let tweetData of tweets) {
    $('#main-content-container').append(createTweetElement(tweetData));
  }
});
