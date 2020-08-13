// $(document).ready(function () {
//   // --- our code goes here ---

//   //New Tweet character counter
//   $('#tweet-text').on('keyup', function () {
//     const currentForm = $(this).parent();
//     const charCounter = $(currentForm).find('div').find('output');
//     const numOfChars = $(this).val().length;
//     if (140 - numOfChars < 0) {
//       charCounter.addClass('danger');
//     } else{
//       charCounter.removeClass('danger');

//     }

//     charCounter.text(140 - numOfChars);
//   });
// });

// Same implementation as above just done in vanilla js
const counter = document.querySelector('#counter');
const tweetTextArea = document.querySelector('textarea');

tweetTextArea.addEventListener('keydown', () => {
  const characterCount = 140 - tweetTextArea.value.length;
  if (characterCount < 0) {
    counter.classList.add('danger');
  } else {
    counter.classList.remove('danger');
  }
  counter.innerHTML = characterCount;
});

const mobileCounter = document.querySelector('#mobile-counter');
const mobileTweetTextArea = document.querySelector('#mobile-textarea');

mobileTweetTextArea.addEventListener('keydown', () => {
  const characterCount = 140 - mobileTweetTextArea.value.length;
  if (characterCount < 0) {
    mobileCounter.classList.add('danger');
  } else {
    mobileCounter.classList.remove('danger');
  }
  mobileCounter.innerHTML = characterCount;
});
