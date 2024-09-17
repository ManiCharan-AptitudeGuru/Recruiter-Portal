const CustomForm = require("../models/CustomForm");

exports.createCustomForm = async (req, res) => {
  try {
    const formData = new CustomForm(req.body);
    await formData.save();
    res
      .status(201)
      .json({ message: "Form data saved successfully", id: formData._id });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error saving form data", error: error.message });
  }
};

// app.get('/', async (req, res) => {
//   try {
//     const formData = await FormData.findById(req.params.id);
//     if (!formData) {
//       return res.status(404).json({ message: 'Form data not found' });
//     }
//     res.json(formData);
//   } catch (error) {
//     res.status(500).json({ message: 'Error retrieving form data', error: error.message });
//   }
// });

// app.get('/form-data', async (req, res) => {
//   try {
//     const formDataList = await FormData.find();
//     res.json(formDataList);
//   } catch (error) {
//     res.status(500).json({ message: 'Error retrieving form data list', error: error.message });
//   }
// });

// app.put('/api/form-data/:id', async (req, res) => {
//   try {
//     const updatedFormData = await FormData.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!updatedFormData) {
//       return res.status(404).json({ message: 'Form data not found' });
//     }
//     res.json(updatedFormData);
//   } catch (error) {
//     res.status(500).json({ message: 'Error updating form data', error: error.message });
//   }
// });

// app.delete('/api/form-data/:id', async (req, res) => {
//   try {
//     const deletedFormData = await FormData.findByIdAndDelete(req.params.id);
//     if (!deletedFormData) {
//       return res.status(404).json({ message: 'Form data not found' });
//     }
//     res.json({ message: 'Form data deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Error deleting form data', error: error.message });
//   }
// });
