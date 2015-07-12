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
      var firstWeek = self.state.chartWeeks[0].format("YYYY-MM-DD");
      var lastWeek = self.state.chartWeeks.slice(-1)[0].format("YYYY-MM-DD");
      var url = "/projects/" + project.id + "/project_weeks?start_date=" + firstWeek + "&end_date=" + lastWeek;
      return (<Project name={project.name}
                      updateable={self.props.updateable}
                      url={url}
                      weeks={self.state.chartWeeks}
                      project_id={project.id}
                      key={project.id}/>);
    });
    return (
    <div className="quarterlyPlan gp-table alternating">
    <h1 className="plan-header">Team Allocations</h1>
    {projects}
    </div>
    );
  }
});
