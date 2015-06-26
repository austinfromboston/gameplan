var QuarterlyPlan = React.createClass({
  getInitialState: function() {
    var sequenceSize = 12;
    var weeks = this.calculateChartWeeks(this.props.start, sequenceSize)
    return {
      chartWeeks: weeks
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
    var self = this;
    var projects = this.props.projects.map(function(project) {
      return (<Project name={project.name} weeks={self.state.chartWeeks} project_id={project.id} key={project.id}/>);
    });
    return (
    <div className="quarterlyPlan gp-table alternating">
    <h1 className="plan-header">QuarterlyPlan</h1>
    <WeekHeaders currentWeeks={this.state.chartWeeks} />
    {projects}
    </div>
    );
  }
});
