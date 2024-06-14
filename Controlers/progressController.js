const Progress = require('../models/progressModel');
const User = require('../models/videoModel');
const Video = require('../models/userModel');


exports.getAllProgress = async (req, res) => {
  try {
    const progress = await Progress.find().populate('Video').populate('user');
    return res.json(progress);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.createProgress = async (req, res) => {
  const { user_id, video_id } = req.body;
  try {
    const existingVideo = await Video.findById(video_id);

    if (!existingVideo) {
      return res.status(404).json({ error: "Video Not Found" });
    }

    const existingUser = await User.findById(user_id);

    if (!existingUser) {
      return res.status(404).json({ error: "User Not Found" });
    }

    const existingProgress = await Progress.findOne({
      user: user_id,
      Video: video_id
    });

    if (existingProgress) {
      return res.status(404).json({ error: "Video Progress Already available" });
    }

    const progress = new Progress({
      user: user_id,
      Video: video_id
    });
    await progress.save();
    return res.json(progress);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getProgress = async (req, res) => {
  const { progress_id } = req.params;

  try {
    const existingProgress = await Progress.findById(progress_id).populate('Video').populate('user');

    if (!existingProgress) {
      return res.status(404).json({ error: "Video Progress Not Found" });
    }

    return res.json(existingProgress);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateProgress = async (req, res) => {
  const { progress_id } = req.params;
  const { progress_time } = req.body;

  try {
    const existingProgress = await Progress.findById(progress_id);

    if (!existingProgress) {
      return res.status(404).json({ error: "Video Progress Not Found" });
    }

    existingProgress.progress_time = progress_time;
    await existingProgress.save();

    return res.json({ message: "Updated" });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getUserProgress = async (req, res) => {
  const { user_id, video_id } = req.params;

  try {
    const existingProgress = await Progress.findOne({
      user: user_id,
      Video: video_id
    }).populate('Video').populate('user');

    if (!existingProgress) {
      return res.status(404).json({ error: "Video Progress Not Found" });
    }

    return res.json(existingProgress);
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.deleteProgress = async (req, res) => {
  const { progress_id } = req.params;

  try {
    const existingProgress = await Progress.findById(progress_id);

    if (!existingProgress) {
      return res.status(404).json({ error: "Video Progress Not Found" });
    }

    await existingProgress.deleteOne();

    return res.json({ message: "Deleted" });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
