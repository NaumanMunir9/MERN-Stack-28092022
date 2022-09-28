// libraries
const asyncHandler = require("express-async-handler");
// models
const GoalModel = require("../models/goalModel");

// @desc    Get Goals
// @route   GET /api/goals
// access   Private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await GoalModel.find();

  res.status(200).json(goals);
});

// @desc    Set Goals
// @route   POST /api/goals
// access   Private
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Please add a text field");
  }

  const goal = await GoalModel.create({
    text: req.body.text,
  });

  res.status(200).json(goal);
});

// @desc    Update Goals
// @route   PUT /api/goals/:id
// access   Private
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await GoalModel.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error(`Couldn't find the specified goal: ${req.params.id}`);
  }

  const goalUpdated = await GoalModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(goalUpdated);
});

// @desc    Delete Goals
// @route   DELETE /api/goals:id
// access   Private
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await GoalModel.findById(req.params.id);
  if (!goal) {
    res.status(400);
    throw new Error(`Couldn't find the specified goal: ${req.params.id}`);
  }

  await GoalModel.findByIdAndDelete(req.params.id);

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
