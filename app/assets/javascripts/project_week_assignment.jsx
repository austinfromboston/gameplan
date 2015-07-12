var ProjectWeekAssignment = React.createClass({
  componentDidMount: function() {
    if (this.props.updateable) {
      new ProjectWeekAssignmentDraggable(this);
    }
  },
  render: function() {
    return (
      <li
        className={"assigned-slot assigned-"+this.props.week}
        title={this.props.name}
        data-timeslot={this.props.week}
        data-person={this.props.person}>
        {this.props.abbrev}</li>
    );
  }
});
