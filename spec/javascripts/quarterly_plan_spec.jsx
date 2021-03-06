//= require 'spec_helper'

describe("QuarterlyPlan", function() {
  beforeEach(function() {
    this.shallowRenderer = React.addons.TestUtils.createRenderer();
    this.projectData = [{"id":20,"name":"Aut"},{"id":18,"name":"Cumque"}];
    this.template = <QuarterlyPlan projects={this.projectData}/>;
    this.qp = React.addons.TestUtils.renderIntoDocument(this.template);

  });

  describe("#getInitialState", function() {
    it("starts at the beginning of the current week", function() {
      this.qp.state.chartWeeks[0].isSame(moment().startOf('isoWeek')).should.equal(true);
    });
    it("includes 12 weeks", function() {
      this.qp.state.chartWeeks.length.should.equal(12)
    });
    it("has a firstWeek", function() {
      expect(this.qp.state.firstWeek.isSame(moment().startOf('isoWeek'))).to.equal(true);
    });
    it("has a lastWeek", function() {
      expect(this.qp.state.lastWeek.isSame(moment().startOf('isoWeek').add({weeks: 11}))).to.equal(true);
    });
  });

  describe("#calculateChartWeeks", function() {
    it("accepts a passed start date", function() {
      this.template = <QuarterlyPlan projects={this.projectData} start="2013-10-01"/>;
      this.qp = React.addons.TestUtils.renderIntoDocument(this.template);
      var weekStart = moment(new Date(2013, 8, 30));
      var result = this.qp.calculateChartWeeks(moment("2013-10-01"), 12);
      result[0].isSame(weekStart).should.equal(true)
    });


  });

  describe("#renderProjects", function() {
    it("renders each project", function() {
      expect(this.qp.renderProjects()).to.have.lengthOf(2)
      expect(this.qp.renderProjects()[0].type.displayName).to.equal('Project')
    });
  });

  describe("#projectUrl", function() {
    beforeEach(function() {
      this.template = <QuarterlyPlan projects={this.projectData} start="2013-10-01"/>;
      this.qp = React.addons.TestUtils.renderIntoDocument(this.template);
    });
    it("returns a url with a time scope", function() {
      expect(this.qp.projectUrl({id: 5})).to.equal("/projects/5/project_weeks?start_date=2013-09-30&end_date=2013-12-16")
    });
  });

  describe("#render", function() {
    beforeEach(function() {
      this.shallowRenderer.render(<QuarterlyPlan projects={this.projectData} start="2013-10-01"/>);
      this.qpOutput = this.shallowRenderer.getRenderOutput();
    });
    it("displays a title", function() {
      this.qpOutput.props.children[0].type.should.equal('h1');
    });

    it("passes the weeks", function() {
      this.qpOutput.props.children[1][1].props.weeks[0].format("YY-MM-DD").should.equal('13-09-30');
      this.qpOutput.props.children[1][1].props.weeks.length.should.equal(12);
    });

    it("passes the project data", function() {
      this.qpOutput.props.children[1][0].props.name.should.equal('Aut')
      this.qpOutput.props.children[1][0].props.project_id.should.equal(20)
    });

  });
});
