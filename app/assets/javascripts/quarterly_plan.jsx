var QuarterlyPlan = React.createClass({
  getInitialState: function() {
    var sequenceSize = 12;
    var weeks = this.calculateChartWeeks(this.props.start, sequenceSize)
    return {
      chartWeeks: weeks,
      firstWeek: weeks[0],
      lastWeek: weeks.slice(-1)[0]
    }
  },

  calculateChartWeeks: function(requestedStart, size) {
    var start = moment(requestedStart).startOf('isoWeek');
    var currentWeeks = Array(size);
    for (var j = 0; j < size; j++) {
      currentWeeks[j] = start.clone().add(j, 'weeks');
    }
    return currentWeeks;
  },

  render: function() {
    return (
    <div className="quarterlyPlan gp-table alternating">
    <h1 className="plan-header">Project Allocations</h1>
    {this.renderProjects()}
    </div>
    );
  },

  renderProjects: function() {
    var self = this;
    return this.props.projects.map(function(project) {
      return (<Project name={project.name}
              updateable={self.props.updateable}
              url={self.projectUrl(project)}
              weeks={self.state.chartWeeks}
              project_id={project.id}
              key={project.id}/>);
    });
  },

  projectUrl: function(project) {
    return "/projects/" + project.id + "/project_weeks?start_date=" + this.state.firstWeek.format("YYYY-MM-DD") + "&end_date=" + this.state.lastWeek.format("YYYY-MM-DD");
  }
});
