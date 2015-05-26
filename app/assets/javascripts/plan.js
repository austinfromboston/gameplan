interact('.assigned-slot')
  .draggable({
    onmove: dragMoveListener,
    onend: function(event) {
      $('.schedule-drop').removeClass('schedule-drop');
      $('.current-drop').removeClass('current-drop');

      resetPosition(event.target);
    },
    onstart: function(event) {
      $('.accept-' + $(event.target).data('timeslot')).addClass('schedule-drop');
    },
    restrict: {
      elementRect: {
        left: 0,
        right: 0
      }
    }
  }
);
interact('.capacity-plan').dropzone({
  accept: '.assigned-slot',
  ondragenter: function(event) {
    $(event.target).addClass('current-drop');
  },
  ondragleave: function(event) {
    $(event.target).removeClass('current-drop');
  },
  ondrop: function(event) {
    var relatedTarget = event.relatedTarget;
    $(relatedTarget).hide();
    resetPosition(event.relatedTarget);
    if($(relatedTarget).data('timeslot') == $(event.target).data('accept')) {
      $(relatedTarget).parent().append($('.open-slot', event.target).first());
      $('.insert-here', event.target).before(relatedTarget);
    }
    $(relatedTarget).show();
  }
});

function resetPosition(el) {
  el.style.webkitTransform = el.style.transform = '';
}
function dragMoveListener (event) {
  var target = event.target

  // translate the element
  target.style.webkitTransform =
    target.style.transform =
      'translate(0px, ' + (event.clientY - event.clientY0) + 'px)';

}
