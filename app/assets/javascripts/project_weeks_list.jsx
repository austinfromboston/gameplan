var ProjectWeeksList = React.createClass({
  render: function() {
    var self = this;
    var weekNodes = this.props.weeks.map(function(week) {
      var url = "/projects/" + self.props.project_id + "/project_weeks/" + week.format("YYYY-MM-DD");
      return (
        <ProjectWeek
          url={url}
          week={week}
          project_id={self.props.project_id}
          key={url} />
      )
    });
    return(
      <ul>
        {weekNodes}
      </ul>
    )
  }
});

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
    var assignments= (
      <ProjectWeekAssignmentList data={this.state.data} />
    );

    return (
      <li>{assignments}</li>
    )
  }
});

var ProjectWeekAssignmentList = React.createClass({
  render: function() {
    var assignments = this.props.data.map(function(assignment) {
        return (
          <ProjectWeekAssignment name={assignment.person_name} abbrev={assignment.person_abbreviation} person_id={assignment.person_id}/>

          );

    })
    return <ul>{assignments}</ul>;
  }
});

var ProjectWeekAssignment = React.createClass({
  render: function() {
    return (
      <li title={this.props.name} data-person-id={this.props.person_id}>{this.props.abbrev}</li>
    );
  }
});
