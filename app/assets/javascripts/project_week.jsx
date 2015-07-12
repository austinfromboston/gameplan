var ProjectWeek = React.createClass({
  getInitialState: function() {
    return {};
  },
  componentDidMount: function() {
    if(this.props.updateable) {
      this.updater = new ProjectWeekUpdater(this);
    }
  },
  render: function() {
    var self=this;
    var assignments = this.props.assignments.map(function(assignment) {
      return (
        <ProjectWeekAssignment
          key={assignment.id}
          updateable={self.props.updateable}
          week={self.props.week}
          person={JSON.stringify(assignment)}
          name={assignment.person_name}
          abbrev={assignment.person_abbreviation}
          person_id={assignment.person_id} />
      );
    });
    var placeholderClass = '';
    if(this.props.assignments.length == 0) {
      placeholderClass = " empty-droplist";
    }
    var monthlyBoundaryClass= '';

    if(this.props.week.month() < this.props.week.clone().add(1, 'week').month()) {
      monthlyBoundaryClass = " monthly-boundary"
    }

    var activeDropClass= this.state.activeDrop ? ' current-drop' : '';
    var possibleDropClass= this.state.possibleDrop ? ' schedule-drop' : '';

    return (
      <li className={monthlyBoundaryClass + "accept-" + this.props.week + placeholderClass + activeDropClass + possibleDropClass}>
        <ul className="assignment-list">
          {assignments}
        </ul>
      </li>
    )
  }
});


