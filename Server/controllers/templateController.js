// controllers/templateController.js
const Template = require("../models/Template");

exports.createTemplate = async (req, res) => {
  try {
    console.log(req.body);
    
    const { name, content } = req.body.template;
    const recruiterId = req.body.userId;

    const newTemplate = new Template({
      name,
      content,
      recruiterId,
    });
    await newTemplate.save();
    res.status(201).json({
      message: "Template created successfully",
      template: newTemplate,
    });
  } catch (error) {
    console.error("Error creating template:", error);
    res
      .status(500)
      .json({ message: "Error creating template", error: error.message });
  }
};

exports.getTemplates = async (req, res) => {
  try {
    const recruiterId = req.query.userId;
    const templates = await Template.find({ recruiterId });
    res.status(200).json(templates);
  } catch (error) {
    console.error("Error fetching templates:", error);
    res.status(500)
      .json({ message: "Error fetching templates", error: error.message });
  }
};

exports.deleteTemplate = async (req, res) => {
  try {
    const deletedTemplate = await Template.findByIdAndDelete(req.params.id);
    if (!deletedTemplate) {
      return res.status(404).json({ message: "Template not found" });
    }
    res.status(200).json({ message: "Template deleted successfully" });
  } catch (error) {
    console.error("Error deleting template:", error);
    res
      .status(500)
      .json({ message: "Error deleting template", error: error.message });
  }
};
