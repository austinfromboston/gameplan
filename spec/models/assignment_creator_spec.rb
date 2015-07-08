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
      expect {subject}.to change { source_assignment.reload.end_date }.to(Date.new(2014,10,13))
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
    it "should be a timestamp" do
      expect(subject).to eq(Time.mktime(2014, 10, 13))
    end
  end
end
