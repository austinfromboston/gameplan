var ProjectWeek = React.createClass({
  componentDidMount: function() {
    this.setupDropzone(React.findDOMNode(this))
  },


  setupDropzone: function(el) {
    var self = this;

    interact($('.assignment-list', el)[0]).dropzone({
      accept: '.assigned-slot',
      ondragenter: function(event) {
        $(event.target).addClass('current-drop');
      },
      ondragleave: function(event) {
        $(event.target).removeClass('current-drop');
      },
      ondrop: function(event) {
        self.handleDrop(event);
      }
    });
  },

  handleDrop: function(ev) {
    var droppedPerson = $(ev.relatedTarget).data('person');
    this.notifyServer(droppedPerson, ev.relatedTarget, ev.target);
  },

  notifyServer: function(droppedPerson, sourceProject, targetProject) {
    $.post('/assignments',
      {person_id: droppedPerson.person_id, timeslot: this.props.week.toString(), project_id: this.props.project_id }

    ).done(function(data) {
        $(sourceProject).trigger('update');
        $(targetProject).trigger('update');
      }.bind(this)
    ).fail(function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    );
  },

  render: function() {
    var self=this;
    var assignments = this.props.assignments.map(function(assignment) {
      return (
        <ProjectWeekAssignment key={assignment.id} week={self.props.week} person={JSON.stringify(assignment)} name={assignment.person_name} abbrev={assignment.person_abbreviation} person_id={assignment.person_id}/>
      );
    });
    var placeholderClass = '';
    if(this.props.assignments.length == 0) {
      placeholderClass = " empty-droplist";
    }
    var monthlyBoundaryClass= '';

    if(this.props.week.month() < this.props.week.clone().add(1, 'week').month()) {
      console.log('found it')
      monthlyBoundaryClass = " monthly-boundary"
    }

    return (
      <li>
        <ul onDrop={this.handleDrop} className={"assignment-list accept-" + this.props.week + placeholderClass + monthlyBoundaryClass}>
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
    this.dragPlaceholder.remove();
    delete(this.dragPlaceholder);
  },

  dragMoveListener: function (event) {
    var self = this;
    if(self.dragPlaceholder == undefined) {
      var dragDiv = document.createElement('div');
      dragDiv.style.position = "absolute";
      dragDiv.textContent = $(event.target).text();
      self.dragPlaceholder = document.body.appendChild(dragDiv);
    }
    self.dragPlaceholder.style.top = event.clientY + "px";
    self.dragPlaceholder.style.left = event.clientX0 + "px";
  },

  render: function() {
    return (
      <li
        className="assigned-slot"
        title={this.props.name}
        data-timeslot={this.props.week}
        data-person={this.props.person}>
        {this.props.abbrev}</li>
    );
  }
});
