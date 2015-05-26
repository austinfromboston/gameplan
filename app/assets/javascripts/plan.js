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
      swapSlots(relatedTarget, event.target)
      var followingSlots = $('[data-person=' + $(relatedTarget).data('person')+ ']' );
      followingSlots.each(function() {
        console.log($(this).closest('.capacity-plan').data('timeslot'), $().data('accept'));
        if($(this).data('timeslot')<$(relatedTarget).data('timeslot')) {
          return;
        }
        var followTarget = $('[data-project=' + $(event.target).data('project')+ '][data-accept=' + $(this).data('timeslot') + ']');
        swapSlots(this, followTarget);
      });

    }
    $(relatedTarget).show();
  }
});

function swapSlots(inbound, target) {
  $(inbound).parent().append($('.open-slot', target).first());
  $('.insert-here', target).before(inbound);
}

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
