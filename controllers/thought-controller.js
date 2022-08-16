const { Thoughts, User } = require('../models');

const thoughtController = {
  //find all thoughts
  getAllThoughts(req, res) {
    Thoughts.find({})
      .populate({
        path: 'reactions',
        select: '-__v'
      })
      .select('-__v')
      .sort({ _id: -1 })
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  // find thought by id
  getThoughtById({ params }, res) {
    Thoughts.findOne({ _id: params.id })
      .populate({
        path: 'reactions',
        select: '-__v'
      })
      .select('-__v')
      .sort({ _id: -1 })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thoughts found" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },

  //create thought
  createThought({ parms, body }, res) {
    Thoughts.create(body)
      .then(({ _id }) => {
        return User.findByOneAndUpdate(
          { _id: params.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found.' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.json(err));
  },

  // update thought by id
  updateThought({ params, body }, res) {
    Thoughts.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this id!' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.json(err));
  },

  //delete thought by id
  deleteThought({ params }, res) {
    Thoughts.findOneAndUpdate({ _id: params.id })
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => res.json(err));
  },

  // add reaction
  addReaction({ params, body }, res) {
    Thoughts.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { friends: body } },
      { new: true, runValidators: true })
      .populate({
        path: 'reactions',
        select: '-__v'
      })
      .select('-__v')

      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found' });
          return;
        }
        res.json(dbThoughtData);
      })

      .catch(err => res.json(err));
  },

  //remove reacation
  deleteReaction({ params }, res) {
    Thoughts.findOneAndUpdate(
      { _id: params.thoughtid },
      { $pull: { reaction: { reaction: params.reactionId } } },
      { new: true },
    )
      .then(dbThoughtData =>{
        if (!dbThoughtData){
          res.status(404).json({ message: "Delete"});
          return;
      }
        res.json(dbThoughtData);
    })
      .catch(err => res.json(err));
  }
};

module.exports = thoughtController;