var Project = React.createClass({
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
    return (
      <ul className="project-row">
        <li className="project-row-header"><div className="project-name">{this.props.name}</div></li>
        {weekNodes}
      </ul>
    )
  }
});
