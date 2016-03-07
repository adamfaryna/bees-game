'use strict';

export default function ($compile) {
  'ngInject';

  let parentElement = $('#content');
  let bodyElement = $('body');
  let popupElement = null;
  let popupScope = null;
  let callback = null;

  this.show = (content, scope, closeCallback) => {
    callback = closeCallback;
    let element = $('<sn-popup>' + content + '</sn-popup>');

    popupScope = scope.$new(false);

    popupElement = $compile(element)(popupScope, (newElement) => {
      parentElement.append(newElement);
    });

    bodyElement.addClass('stop-scrolling');
  };

  this.close = () => {
    if (popupScope != null) {
      popupScope.$destroy();
      popupScope = null;
    }

    popupElement.remove();
    bodyElement.removeClass('stop-scrolling');
    popupElement = null;

    if (callback) {
      callback();
      callback = null;
    }
  };
}
