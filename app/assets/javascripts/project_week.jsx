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

  render: function() {
    var assignments = this.state.data.map(function(assignment) {
      return (
        <ProjectWeekAssignment key={assignment.id} name={assignment.person_name} abbrev={assignment.person_abbreviation} person_id={assignment.person_id}/>
      );
    });

    return (
      <li><ul className="assignment-list">{assignments}</ul></li>
    )
  }
});

var ProjectWeekAssignment = React.createClass({
  render: function() {
    return (
      <li title={this.props.name} data-person-id={this.props.person_id}>{this.props.abbrev}</li>
    );
  }
});
