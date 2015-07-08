var ProjectWeek = React.createClass({
  getInitialState: function() {
    return { data: []}
  },

  componentDidMount: function() {
    this.setupDropzone(React.findDOMNode(this))

    this.fetchAssignments();
    this.removeDropped();
  },

  removeDropped: function() {
    var self = this;
    $(React.findDOMNode(this)).on('dropped', function(ev, droppedData) {
      self.setState(function(previousState, currentProps) {
        var dup = previousState.data.filter(function(el, idx, array) {
          return el.id != droppedData.id;
        });
        return {data: dup};
      });
    });
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
    this.setState(function(previousState, currentProps) {
      var dup = previousState.data.slice(0);
      dup.push(droppedPerson);
      return {data: dup};
    });
    $(ev.relatedTarget).trigger('dropped', droppedPerson);
    console.log(this.props.week);
    this.notifyServer(droppedPerson);
  },

  notifyServer: function(droppedPerson) {
    $.post('/assignments',
      {person_id: droppedPerson.id, timeslot: this.props.week.toString(), project_id: this.props.project_id }

    ).done(function(data) {
        console.log('success');
      }.bind(this)
    ).fail(function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    );
  },

  render: function() {
    var self=this;
    var assignments = this.state.data.map(function(assignment) {
      return (
        <ProjectWeekAssignment key={assignment.id} week={self.props.week} person={JSON.stringify(assignment)} name={assignment.person_name} abbrev={assignment.person_abbreviation} person_id={assignment.person_id}/>
      );
    });
    var placeholderClass = '';
    if(this.state.data.length == 0) {
      placeholderClass = " empty-droplist";
    }

    return (
      <li>
        <ul onDrop={this.handleDrop} className={"assignment-list accept-" + this.props.week + placeholderClass}>
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
