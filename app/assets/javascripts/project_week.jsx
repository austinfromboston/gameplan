var ProjectWeek = React.createClass({
  getInitialState: function() {
    return {};
  },
  componentDidMount: function() {
    if(this.props.updateable) {
      this.updater = new ProjectWeekUpdater(this);
    }
  },

  renderAssignments: function() {
    var self=this;
    return this.props.assignments.map(function(assignment) {
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
  },

  render: function() {
    var classList = ["project-row-item", "accept-" + this.props.week];

    if(this.props.assignments.length == 0) {
      classList.push("empty-droplist");
    }
    if(this.props.week.month() < this.props.week.clone().add(1, 'week').month()) {
      classList.push("monthly-boundary");
    }

    if(this.state.activeDrop) {
      classList.push('current-drop');
    }

    if(this.state.possibleDrop) {
      classList.push('schedule-drop');
    }

    return (
      <li className={classList.join(" ")}>
        <ul className="assignment-list">
          {this.renderAssignments()}
        </ul>
      </li>
    )
  }
});


