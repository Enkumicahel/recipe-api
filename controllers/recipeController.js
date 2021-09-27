const Recipe = require("../model/recipe");
// const jwt = require("jsonwebtoken");

// get a recipe detail
exports.list = async function (req, res) {
  try {
    const recipes = await Recipe.find({}).limit(20);
    return res.status(200).json(recipes);
  } catch (error) {
    return res.status(401).json(error);
  }
};

// get a recipe detail
exports.detail = async function (req, res) {
  try {
    const _id = req.body;
    const recipe = await Recipe.findOne({ _id });
    console.log(recipe);
    return res.status(200).json(recipe);
  } catch (error) {
    return res.status(401).json(error);
  }
};

// get a recipe detail
exports.create = async function (req, res) {
  try {
    const { name, description } = req.body;
    // const oldRecipe = await Recipe.findOne({ _id });
    // if (oldRecipe) {
    //   return res.status(409).send("Recipe Already Exist.");
    // }
    // Create user in our database
    const recipe = await Recipe.create({
      name,
      user_id: req.user.user_id,
      description,
    });

    recipe.save();
    return res.status(201).json(recipe);
  } catch (error) {
    console.log(error);
  }
};

// get a recipe detail
exports.update = async function (req, res) {
  try {
    const _id = req.body;
    const recipe = await Recipe.findOneAndUpdate({ _id });
    console.log(recipe);
    res.status(200).json(recipe);
  } catch (error) {
    res.status(401).json(error);
  }
};

// get a recipe detail
exports.delete = async function (req, res) {
  try {
    const _id = req.body;
    const recipe = await Recipe.findOneAndDelete({ _id });
    console.log(recipe);
    res.status(200).json(recipe);
  } catch (error) {
    res.status(401).json(error);
  }
};
