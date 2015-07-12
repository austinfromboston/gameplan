function ProjectWeekUpdater(projectWeek){
  this.projectWeek = projectWeek;
  this.setupDropzone(React.findDOMNode(projectWeek));
}

ProjectWeekUpdater.prototype = {
  setupDropzone: function(el) {
    var self = this;

    interact(el).dropzone({
      accept: '.assigned-' + this.projectWeek.props.week,
      ondropactivate: function(event) {
        self.projectWeek.setState({possibleDrop: true});
      },
      ondropdeactivate: function(event) {
        self.projectWeek.setState({possibleDrop: false, activeDrop: false});
      },
      ondragenter: function(event) {
        self.projectWeek.setState({activeDrop: true});
      },
      ondragleave: function(event) {
        self.projectWeek.setState({activeDrop: false});
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
      {person_id: droppedPerson.person_id, timeslot: this.projectWeek.props.week.toString(), project_id: this.projectWeek.props.project_id }

    ).done(function(data) {
        $([sourceProject, targetProject]).trigger('refresh');
      }.bind(this)
    ).fail(function(xhr, status, err) {
        console.error('assignments', status, err.toString());
      }.bind(this)
    );
  }
};
