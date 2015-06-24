var ProjectWeeksList = React.createClass({
  render: function() {
    var weekNodes = [];
    //  this.props.weeks.map(function(week) {
    //  return (
    //    <ProjectWeek week={week} />
    //  )
    //});
    return(
      <ul>
        {weekNodes}
      </ul>
    )
  }
});

var ProjectWeek = React.createClass({
  render: function() {
    return (
      <li><ProjectWeekAssignments /></li>
    )
  }
});

var ProjectWeekAssignments = React.createClass({
  render: function() {
    return (
      <ul><li>open</li></ul>

      )
  }
})
