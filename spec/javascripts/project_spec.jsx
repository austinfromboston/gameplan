//=require 'spec_helper'

describe("Project", function() {
  Spec.stubServer();

  beforeEach(function() {
    this.template = <Project weeks={[moment('2013-10-01')]} url="/fake/data/url" name="Fake Project" project_id={5}/>;
    this.serverResponse = [200, { "Content-Type": "application/json" },
      '{"2013-10-01": [{ "id": 12, "person_id": 6, "person_name":"Paris", "person_abbreviation":"Perry" }]}']
  });

  describe("#fetchAssignments", function() {
    beforeEach(function() {
      this.project = Spec.render(this.template);
    });

    it("starts with empty data", function() {
      expect(this.project.state.data).to.be.empty;
    });

    it("updates the state with the server data", function() {
      expect(this.requests).to.have.lengthOf(1);
      this.requests[0].respond(...this.serverResponse);
      expect(this.project.state.data["2013-10-01"]).to.deep.equal([{ "id": 12, "person_id": 6, "person_name":"Paris", "person_abbreviation":"Perry" }])
    });
  });

  describe("#renderWeekNodes", function() {
    describe("by default", function() {
      beforeEach(function() {
        this.project = Spec.render(this.template);
        this.requests[0].respond(...this.serverResponse);
      });

      it("creates a projectWeek for each week", function() {
        expect(this.project.renderWeekNodes()).to.have.lengthOf(1);
        expect(this.project.renderWeekNodes()[0].type.displayName).to.equal('ProjectWeek')
        expect(this.project.renderWeekNodes()[0].props.week.isSame(moment('2013-10-01'))).to.equal(true)
      });
      it("creates non-updateable children", function() {
        expect(this.project.renderWeekNodes()[0].props.updateable).to.not.equal(true)
      });
      it("assigns a its own project id", function() {
        expect(this.project.renderWeekNodes()[0].props.project_id).to.equal(5)
      });
    });

    describe("when the item is updateable", function() {
      beforeEach(function() {
        this.template = <Project weeks={[moment('2013-10-01')]} url="/fake/data/url" name="Fake Project" updateable={true}/>;
        this.project = Spec.render(this.template);
        this.requests[0].respond(...this.serverResponse);
      })
      it("passes this on to the children", function() {
        expect(this.project.renderWeekNodes()[0].props.updateable).to.equal(true)
      });
    })
  });
});
