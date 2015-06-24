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
    return (
    <div className="quarterlyPlan">
    <h1>QuarterlyPlan</h1>
    <WeekHeaders currentWeeks={this.state.chartWeeks} />
    <ProjectList projects={this.props.projects} weeks={this.state.chartWeeks} />
    </div>
    );
  }
});
