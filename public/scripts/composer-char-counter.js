$(document).ready(function () {
  // --- our code goes here ---

  //New Tweet character counter
  $('#tweet-text').on('keyup', function () {
    const currentForm = $(this).parent();
    const charCounter = $(currentForm).find('div').find('output');
    const numOfChars = $(this).val().length;
    if (140 - numOfChars < 0) {
      charCounter.addClass('danger');
    } else{
      charCounter.removeClass('danger');

    }

    charCounter.text(140 - numOfChars);
  });
});
