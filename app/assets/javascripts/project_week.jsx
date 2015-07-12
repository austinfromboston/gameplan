var ProjectWeek = React.createClass({
  componentDidMount: function() {
    if(this.props.updateable) {
      this.setupDropzone(React.findDOMNode(this))
    }
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
        <ProjectWeekAssignment key={assignment.id} updateable={self.props.updateable} week={self.props.week} person={JSON.stringify(assignment)} name={assignment.person_name} abbrev={assignment.person_abbreviation} person_id={assignment.person_id}/>
      );
    });
    var placeholderClass = '';
    if(this.props.assignments.length == 0) {
      placeholderClass = " empty-droplist";
    }
    var monthlyBoundaryClass= '';

    if(this.props.week.month() < this.props.week.clone().add(1, 'week').month()) {
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


