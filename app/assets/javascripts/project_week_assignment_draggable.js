function ProjectWeekAssignmentDraggable(assignment) {
  this.assignment = assignment;
  this.setupDraggable(React.findDOMNode(assignment))
}

ProjectWeekAssignmentDraggable.prototype = {
  setupDraggable: function(draggableNode) {
    interact(draggableNode)
      .draggable({
        onmove: this.dragMoveListener.bind(this),
        onend: this.resetPosition.bind(this),
      }
    );
  },


  resetPosition: function() {
    this.dragPlaceholder.remove();
    delete(this.dragPlaceholder);
  },

  dragMoveListener: function (event) {
    this.dragPlaceholder = this.dragPlaceholder || this.createDragPlaceholder();
    this.dragPlaceholder.style.top = (event.clientY + $(window).scrollTop()) + "px";
    this.dragPlaceholder.style.left = event.clientX0 + "px";
  },

  createDragPlaceholder: function() {
    var dragDiv = document.createElement('div');
    dragDiv.style.position = "absolute";
    dragDiv.textContent = $(event.target).text();
    return document.body.appendChild(dragDiv);
  }
};
