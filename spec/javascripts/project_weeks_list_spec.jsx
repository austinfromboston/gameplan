//= require spec_helper

describe("ProjectWeekAssignments#render", function() {
  it("renders the element correctly", function() {
    React.render(<ProjectWeekAssignments />, document.getElementById('konacha'));
    $('#konacha ul li').text().should.equal('open')
  });
});
