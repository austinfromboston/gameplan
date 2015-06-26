var ProjectWeek = React.createClass({
  getInitialState: function() {
    return { data: []}
  },

  componentDidMount: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  handleDrop: function() {
    console.log('dropped!');
  },

  render: function() {
    var self=this;
    var assignments = this.state.data.map(function(assignment) {
      return (
        <ProjectWeekAssignment key={assignment.id} week={self.props.week} name={assignment.person_name} abbrev={assignment.person_abbreviation} person_id={assignment.person_id}/>
      );
    });

    return (
      <li>
        <ul onDrop={this.handleDrop} className={"assignment-list capacity-plan accept-" + this.props.week}>
          {assignments}
        </ul>
      </li>
    )
  }
});

var ProjectWeekAssignment = React.createClass({
  render: function() {
    return (
      <li
        className="assigned-slot"
        title={this.props.name}
        data-timeslot={this.props.week}
        data-person-id={this.props.person_id}>
        {this.props.abbrev}</li>
    );
  }
});
