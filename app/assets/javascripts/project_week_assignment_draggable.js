function ProjectWeekAssignmentDraggable(assignment) {
  this.assignment = assignment;
  this.setupDraggable(React.findDOMNode(assignment))
}

ProjectWeekAssignmentDraggable.prototype = {
  setupDraggable: function(draggableNode) {
    interact(draggableNode)
      .draggable({
        onmove: this.dragMoveListener.bind(this),
        onend: this.dragEnd.bind(this),
        onstart: function(event) {
          $('.accept-' + $(event.target).data('timeslot')).addClass('schedule-drop');
        }
      }
    );
  },

  dragEnd: function() {
    $('.schedule-drop').removeClass('schedule-drop');
    $('.current-drop').removeClass('current-drop');

    this.resetPosition();
  },

  resetPosition: function() {
    this.dragPlaceholder.remove();
    delete(this.dragPlaceholder);
  },

  dragMoveListener: function (event) {
    if(this.dragPlaceholder == undefined) {
      var dragDiv = document.createElement('div');
      dragDiv.style.position = "absolute";
      dragDiv.textContent = $(event.target).text();
      this.dragPlaceholder = document.body.appendChild(dragDiv);
    }
    this.dragPlaceholder.style.top = (event.clientY + $(window).scrollTop()) + "px";
    this.dragPlaceholder.style.left = event.clientX0 + "px";
  }
};
