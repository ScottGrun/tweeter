// $(document).ready(function () {
// --- our code goes here ---

//New Tweet character counter
//   $('#tweet-text').on('input', function () {
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

// Character counter done in vanilla js rather than jquery see above for jquery version
const counter = document.querySelector('#counter');
const tweetTextArea = document.querySelector('textarea');

tweetTextArea.addEventListener('input', () => {
  const characterCount = 140 - tweetTextArea.value.length;
  if (characterCount < 0) {
    counter.classList.add('danger');
  } else {
    counter.classList.remove('danger');
  }
  counter.innerHTML = characterCount;
});
