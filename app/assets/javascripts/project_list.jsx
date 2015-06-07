var ProjectList = React.createClass({
  render: function() {
    var self = this;
    var projectNodes = this.props.projects.map(function(project) {
      return (
        <Project name={project.name} weeks={self.weeks} />
      )
    })
    return (
      <ul>{projectNodes}</ul>
      )
  }
})

var Project = React.createClass({
  render: function() {
    return (
      <div>
        <li>{this.props.name}</li>
        <ProjectWeeksList weeks={this.props.weeks} />
      </div>
    )
  }
})
