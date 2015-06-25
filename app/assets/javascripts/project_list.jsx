var ProjectList = React.createClass({
  render: function() {
    var self = this;
    var projectNodes = this.props.projects.map(function(project) {
      return (
        <Project name={project.name} weeks={self.props.weeks} project_id={project.id} key={project.id}/>
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
        <ProjectWeeksList weeks={this.props.weeks} project_id={this.props.project_id} />
      </div>
    )
  }
})
