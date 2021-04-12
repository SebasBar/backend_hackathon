const client = require("../config/db");

exports.getAllWishes = async (req, res, next) => {
  try {
    const wishes = await client.wish.findMany({ include: { employee: true } });
    res.status(200).json(wishes);
  } catch (err) {
    next(err);
  }
};

exports.getWish = async (req, res, next) => {
  try {
    const wishId = Number(req.params.wishId);
    const wish = await client.wish.findUnique({
      where: { id: wishId },
      include: { employee: true },
    });
    res.status(200).json(wish);
  } catch (err) {
    next(err);
  }
};

exports.createWish = async (req, res, next) => {
  try {
    const { project, industry, further_education } = req.body;
    const createdWish = await client.wish.create({
      data: { project, industry, further_education },
    });
    res.status(200).json(createdWish);
  } catch (err) {
    next(err);
  }
};

exports.updateWish = async (req, res, next) => {
  try {
    const wishId = Number(req.params.wishId);
    const { project, industry, further_education } = req.body;
    const updatedWish = await client.wish.update({
      where: { id: wishId },
      data: { project, industry, further_education },
      include: { employee: true },
    });
    res.status(200).json(updatedWish);
  } catch (err) {
    next(err);
  }
};

exports.deleteWish = async (req, res, next) => {
  try {
    const wishId = Number(req.params.wishId);
    const deletedWish = await client.wish.delete({
      where: { id: wishId },
    });
    res.status(200).json(deletedWish);
  } catch (err) {
    next(err);
  }
};
