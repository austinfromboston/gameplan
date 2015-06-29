var ProjectWeek = React.createClass({
  getInitialState: function() {
    return { data: []}
  },

  componentDidMount: function() {
    this.setupDropzone(React.findDOMNode(this))

    this.fetchAssignments();
  },

  fetchAssignments: function(){
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  setupDropzone: function(el) {
    var self = this;

    interact(el).dropzone({
      accept: '.assigned-slot',
      ondragenter: function(event) {
        $(event.target).addClass('current-drop');
      },
      ondragleave: function(event) {
        $(event.target).removeClass('current-drop');
      },
      ondrop: function(event) {
        //var drop = new React.SyntheticEvent({type: 'drop'}, event.target, event)
        console.log(event.target);
        self.handleDrop();
      }
    });
  },

  handleDrop: function() {
    console.log('dropped!');
  },

  render: function() {
    var self=this;
    var assignments = this.state.data.map(function(assignment) {
      return (
        <ProjectWeekAssignment key={assignment.id} week={self.props.week} name={assignment.person_name} abbrev={assignment.person_abbreviation} person_id={assignment.person_id}/>
      );
    });

    return (
      <li>
        <ul onDrop={this.handleDrop} className={"assignment-list accept-" + this.props.week}>
          {assignments}
        </ul>
      </li>
    )
  }
});

var ProjectWeekAssignment = React.createClass({
  componentDidMount: function() {
    var self = this;
    interact(React.findDOMNode(this))
      .draggable({
        onmove: self.dragMoveListener,
        onend: function(event) {
          $('.schedule-drop').removeClass('schedule-drop');
          $('.current-drop').removeClass('current-drop');

          self.resetPosition(event.target);
        },
        onstart: function(event) {
          $('.accept-' + $(event.target).data('timeslot')).addClass('schedule-drop');
        },
        restrict: {
          elementRect: {
            left: 0,
            right: 0
          }
        }
      }
    );
  },
  resetPosition: function(el) {
    el.style.webkitTransform = el.style.transform = '';
  },
  dragMoveListener: function (event) {
    var target = event.target;

    // translate the element
    target.style.webkitTransform =
      target.style.transform =
        'translate(0px, ' + (event.clientY - event.clientY0) + 'px)';

  },
  render: function() {
    return (
      <li
        title={this.props.name}
        data-timeslot={this.props.week}
        data-person-id={this.props.person_id}>
        {this.props.abbrev}</li>
    );
  }
});
