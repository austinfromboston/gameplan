var WeekHeaders = React.createClass({
  getInitialState: function() {
    return {active: false};
  },

  componentDidMount: function() {
    window.addEventListener('scroll', this.handleScroll);
    this.setState({active: this.isActiveHeader()});
  },

  isActiveHeader: function() {
    var windowTop = $(window).scrollTop();
    var rowTop = $(React.findDOMNode(this)).closest('.project-row')[0];
    var visibleHeader = $('.project-row').filter(function(idx, header) {
      return $(header).offset().top > windowTop;
    });
    return visibleHeader[0] == rowTop;
  },

  handleScroll: function() {
    this.setState({active: this.isActiveHeader()});
  },

  render: function() {
    var weekNodes = this.props.currentWeeks.map(function(weekStart) {
      return (
        <WeekHeader week={weekStart} key={weekStart}/>
      )
    });
    var activeState = this.state.active ? " active" : "";
    return (
      <ul className={"week-headers" + activeState}>
        <li></li>
        {weekNodes}
      </ul>
    )
  }
});

var WeekHeader = React.createClass({
    render: function() {
      return (
      <li className='week-header'>
        {this.props.week.format('MM/DD') }
      </li>
      )
    }
});
