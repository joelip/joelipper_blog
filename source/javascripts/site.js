(function() {
  'use strict';

  const FOOTNOTE_CLASS_STRING = 'FootNote';
  const FOOTNOTE_TEXT_BOX_CLASS_STRING = 'FootNoteTextBox';
  var $footNoteElms = document.getElementsByClassName(FOOTNOTE_CLASS_STRING);

  // Monitor hover for footnotes on desktop
  window.addEventListener('mouseover', function(event) {
    if (event.target.classList.contains(FOOTNOTE_CLASS_STRING)) {
      let $parentElm = event.target.parentElement;
      let $footNoteTextBox = document.createElement('div');
      let footNoteHtmlString = event.target.dataset.footNoteContent;
      let heightOfNewElm, lineHeightRatioOfText, parentLineHeightStr, textOffset;

      $footNoteTextBox.classList.add(FOOTNOTE_TEXT_BOX_CLASS_STRING);
      $footNoteTextBox.style.zIndex = `${+$parentElm.style.zIndex + 1}`;
      $footNoteTextBox.style.top = `${event.offsetY}px`;
      $footNoteTextBox.insertAdjacentHTML('beforeend', footNoteHtmlString);
      $parentElm.appendChild($footNoteTextBox);

      heightOfNewElm = window.getComputedStyle($footNoteTextBox).height;
      parentLineHeightStr = window.getComputedStyle($parentElm).lineHeight;
      textOffset = getNumberFromPixelString(parentLineHeightStr) / 2;

      $footNoteTextBox.style.left = `${event.offsetX}px`;
      $footNoteTextBox.style.top = `${event.offsetY - getNumberFromPixelString(heightOfNewElm) - textOffset}px`;
      $footNoteTextBox.style.visibility = 'visible';

      event.target.addEventListener('mouseout', function (event) {
        if (event.target.classList.contains(FOOTNOTE_CLASS_STRING)) {
          $footNoteTextBox.remove();
        }

        event.target.removeEventListener('mouseout', event.target, false);
      }, false);
    }

    window.removeEventListener('mouseover', window, false);
  }, false);

  function getNumberFromPixelString(str) {
    return +str.replace(/px/i, '');
  }
})();
