var WeekHeaders = React.createClass({
  render: function() {
    var weekNodes = this.props.currentWeeks.map(function(weekStart) {
      return (
        <WeekHeader week={weekStart} />
      )
    });
    return (
      <ul className="week-headers">
        {weekNodes}
      </ul>
    )
  }
});

var WeekHeader = React.createClass({
    render: function() {
      return (
      <li className='week-header'>
        {this.props.week.format('M/D') }
      </li>
      )
    }
});
