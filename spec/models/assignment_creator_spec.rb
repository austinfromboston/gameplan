require 'rails_helper'

describe AssignmentCreator do
  let(:source_plan) do
    create :capacity_plan, :with_project, :fully_staffed
  end
  let(:source_project) { source_plan.project }
  let(:source_assignment) { source_plan.assignments.first }

  let(:person) { source_assignment.person }
  let(:start_time) { "2014/10/15" }
  let(:target_plan) { create :capacity_plan, :with_project }
  let(:target_project) { target_plan.project }

  let(:creator) do
    AssignmentCreator.new(
        person_id: person.to_param,
        project_id: target_project.to_param,
        timeslot: start_time)
  end

  describe "#save" do
    subject { creator.save }
    it "creates a new assignment on the target project" do
      expect {subject}.to change { target_plan.assignments.count }.by(1)
    end

    it "ends the prior assignment" do
      expect {subject}.to change { source_assignment.reload.end_date }.to(Date.new(2014,10,12))
    end

    context "when the target project and the source project is the same" do
      let(:target_project) { source_project }
      it "does nothing" do
        expect { subject }.to_not change { person.reload.assignments.first.end_date }
      end
    end

    context "when last weeks assignment is to the target project" do
      let!(:target_assignment) do
        AssignmentCreator.new(
          person_id: person.to_param,
          project_id: target_project.to_param,
          timeslot: "2014/10/08").save
      end
      before do
        AssignmentCreator.new(
          person_id: person.to_param,
          project_id: source_project.to_param,
          timeslot: start_time).save
      end
      it "extends last weeks assignment" do
        expect {subject}.to change { person.assignments.count }.by(-1)
        expect(target_assignment.end_date).to eq(nil)
      end
    end

    context "when restoring an interruption in source project continuity" do
      let(:creator) do
        AssignmentCreator.new(
          person_id: person.to_param,
          project_id: source_project.to_param,
          timeslot: start_time)
      end
      before do
        AssignmentCreator.new(
          person_id: person.to_param,
          project_id: target_project.to_param,
          timeslot: start_time).save
        AssignmentCreator.new(
          person_id: person.to_param,
          project_id: source_project.to_param,
          timeslot: "2014/11/15").save
      end
      it "deletes the interrupting assignment and the final assignment" do
        expect { subject }.to change { person.reload.assignments.count }.by(-2)
      end
      it "assigns the end_date of the final assignment to initial assignment" do
        expect { subject }.to change { source_assignment.reload.end_date }.to(nil)
      end
    end

    context "when a future assignment to the same project exists" do
      before do
        AssignmentCreator.new(
          person_id: person.to_param,
          project_id: target_project.to_param,
          timeslot: "2014/11/15").save
      end
      it "should change the start date and return the existing assignment" do
        expect { subject }.to_not change { person.assignments.count }
        expect(subject.start_date).to eq(Date.new(2014,10,13).beginning_of_week)
        expect(subject.end_date).to eq(nil)
      end
    end

    context "when a future assignment to another project exists" do
      let(:another_target_project) { create(:capacity_plan, :with_project).project }
      before do
        AssignmentCreator.new(
          person_id: person.to_param,
          project_id: another_target_project.to_param,
          timeslot: "2014/11/15").save
      end
      it "should end the new assignment before the future assignment starts" do
        expect(subject.end_date).to eq(Date.new(2014,11,9))
      end
    end
  end

  describe "#new_assignment_end" do
    subject { creator.new_assignment_end }
    it { should be_nil }
    context "when a future assignment exists" do
      before do
        AssignmentCreator.new(
          person_id: person.to_param,
          project_id: target_project.to_param,
          timeslot: "2014/11/15").save
      end
      it "should be prior to the future assignment starts" do
        expect(subject).to eq(Date.new(2014,11,9))
      end
    end
  end

  describe "#prior_assignment" do
    subject { creator.prior_assignment }
    it "should be connected to the source project" do
      expect(subject.capacity_plan.project).to eq(source_project)
    end
  end

  describe "#new_capacity_plan" do
    subject { creator.new_capacity_plan }
    it "should be the target plan" do
      expect(subject).to eq(target_plan)
    end
  end

  describe "#project" do
    subject { creator.project }
    it "should be the target project" do
      expect(subject).to eq(target_project)
    end
  end

  describe "#new_assignment_start" do
    subject { creator.new_assignment_start }
    it "should be a date" do
      expect(subject).to eq(Date.new(2014, 10, 13))
    end
  end
end
