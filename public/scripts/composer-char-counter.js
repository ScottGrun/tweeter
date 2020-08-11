$(document).ready(function () {
  // --- our code goes here ---

  //New Tweet character counter
  $('#tweet-text').on('keydown', function () {
    const currentForm = $(this).parent();
    const charCounter = $(currentForm).find('div').find('output');
    const numOfChars = $(this).val().length;
    if (numOfChars > 140) {
      charCounter.toggleClass('danger');
      charCounter.text(140 - numOfChars);
    }else {
      charCounter.text(numOfChars);
    }

  });
});
