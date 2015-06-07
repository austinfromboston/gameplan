var QuarterlyPlan = React.createClass({
  sequenceStart: moment().startOf('isoWeek'),
  sequenceSize: 12,

  chartWeeks: function() {
    if (this.currentWeeks) {
      return this.currentWeeks;
    } else {
      return this.calculateChartWeeks();
    }
  },

  calculateChartWeeks: function() {
    this.currentWeeks = Array(this.sequenceSize);
    for (var j = 0; j < this.sequenceSize; j++) {
      this.currentWeeks[j] = this.sequenceStart.clone().add(j, 'weeks');
    }
    return this.currentWeeks;
  },

  render: function() {
    return (
    <div className="quarterlyPlan">
    <h1>QuarterlyPlan</h1>
    <WeekHeaders currentWeeks={this.chartWeeks()} />
    <ProjectList projects={this.props.projects} weeks={this.chartWeeks()} />
    </div>
    );
  }
});
