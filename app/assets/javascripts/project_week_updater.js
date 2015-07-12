function ProjectWeekUpdater(projectWeek){
  this.projectWeek = projectWeek;
  this.setupDropzone(React.findDOMNode(projectWeek));
}

ProjectWeekUpdater.prototype = {
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
      {person_id: droppedPerson.person_id, timeslot: this.projectWeek.props.week.toString(), project_id: this.projectWeek.props.project_id }

    ).done(function(data) {
        $(sourceProject).trigger('update');
        $(targetProject).trigger('update');
      }.bind(this)
    ).fail(function(xhr, status, err) {
        console.error('assignments', status, err.toString());
      }.bind(this)
    );
  }
};
