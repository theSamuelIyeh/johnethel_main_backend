const express = require("express");
const Site_data_slider = require("../models/siteData");
const router = express.Router();

// get slider data
router.get("/slider", async (req, res) => {
  let slider;
  try {
    slider = await Site_data_slider.find();
  } catch {
    slider = [];
  }
  res.json(slider);
});

// create new slider data
router.post("/new", async (req, res) => {
  const slider = new Site_data_slider({
    image: req.body.image,
    title: req.body.title,
    description:req.body.description,
    button: req.body.button,
  });
  try {
    await slider.save();
    res.status(201).json({ message: "Slider Created Successfully", slider: slider });
  } catch (e) {
    res.status(500).json(e.message);
  }
});

module.exports = router;



// //update category
// router.put("/:id", IsAuthenticated, IsAdmin, async (req, res) => {
//   let category;
//   try {
//     category = await Category.findById(req.params.id);
//     category.name = req.body.name;
//     await category.save();
//     res.status(200).json({ message: "Category Updated" });
//   } catch (e) {
//     if (category == null) {
//       res.status(400).json({ message: "Provide a valid category" });
//     } else {
//       res.status(500).json({ message: "Error updating Category" });
//     }
//   }
// });

// //delete category
// router.delete("/:id", IsAuthenticated, IsAdmin, async (req, res) => {
//   try {
//     category = await Category.findById(req.params.id);
//     await category.deleteOne();
//     res.status(200).json({ message: "Category deleted Successfully" });
//   } catch (e) {
//     if (category == null) {
//       res.status(400).json({ message: "Provide valid category" });
//     } else {
//       res.status(500).json({ message: e.message });
//     }
//   }
// });

// //get all categories
// router.get("/", IsAuthenticated, async (req, res) => {
//   let categories;
//   try {
//     categories = await Category.find();
//   } catch {
//     categories = [];
//   }
//   res.json(categories);
// });
