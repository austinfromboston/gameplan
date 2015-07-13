var Project = React.createClass({
  getInitialState: function() {
    return { data: []}
  },

  componentDidMount: function() {
    this.fetchAssignments();
    $(React.findDOMNode(this)).on('refresh', function() {
      this.fetchAssignments();
    }.bind(this));
  },

  fetchAssignments: function(){
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
    return (
      <div className="project-row">
        <WeekHeaders currentWeeks={this.props.weeks} />
        <ul className="project-row-list">
          <li className="project-row-header"><div className="project-name">{this.props.name}</div></li>
          {this.renderWeekNodes()}
        </ul>
      </div>
    )
  },

  renderWeekNodes: function() {
    var self = this;
    return this.props.weeks.map(function(week) {
      return (
        <ProjectWeek
          week={week}
          updateable={self.props.updateable}
          assignments={self.state.data[week.format('YYYY-MM-DD')] || []}
          project_id={self.props.project_id}
          key={week.format("YYYY-MM-DD")} />
      )
    });
  }
});
