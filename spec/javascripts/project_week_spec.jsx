//= require spec_helper

describe("ProjectWeekAssignment#render", function() {
  it("renders the element correctly", function() {
    React.render(<ProjectWeekAssignment />, document.getElementById('konacha'));
    $('#konacha li.assigned-slot').should.not.be.empty;
  });
});
