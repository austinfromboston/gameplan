//= require spec_helper

describe("ProjectWeekAssignments#render", function() {
  it("returns 0 when the Array is empty", function() {
    React.render(React.createElement('ProjectWeekAssignments'), document.getElementById('konacha'));
    $('#konacha').html().should.equal('')
  });
});
