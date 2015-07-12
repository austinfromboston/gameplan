var ProjectWeekAssignment = React.createClass({
  componentDidMount: function() {
    if(this.props.updateable == false) {
      return;
    }
    var self = this;
    interact(React.findDOMNode(this))
      .draggable({
        onmove: self.dragMoveListener,
        onend: function(event) {
          $('.schedule-drop').removeClass('schedule-drop');
          $('.current-drop').removeClass('current-drop');

          self.resetPosition(event.target);
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
  },

  resetPosition: function(el) {
    this.dragPlaceholder.remove();
    delete(this.dragPlaceholder);
  },

  dragMoveListener: function (event) {
    var self = this;
    if(self.dragPlaceholder == undefined) {
      var dragDiv = document.createElement('div');
      dragDiv.style.position = "absolute";
      dragDiv.textContent = $(event.target).text();
      self.dragPlaceholder = document.body.appendChild(dragDiv);
    }
    self.dragPlaceholder.style.top = (event.clientY + $(window).scrollTop()) + "px";
    self.dragPlaceholder.style.left = event.clientX0 + "px";
  },

  render: function() {
    return (
      <li
        className="assigned-slot"
        title={this.props.name}
        data-timeslot={this.props.week}
        data-person={this.props.person}>
        {this.props.abbrev}</li>
    );
  }
});
