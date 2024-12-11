module.exports = (app) => {
  const router = require('express').Router();
  const tf = require('@tensorflow/tfjs-node');


  router.post('/', async (req, res) => {
    try {
      // Pastikan model sudah dimuat
      const model = app.locals.model
      if (!model) {
        return res.status(500).json({ error: 'Model belum dimuat.' });
      }

      // Ambil data input dari permintaan
      const inputData = req.body.input; // Contoh: [[5, 30, 3]]
      if (!inputData) {
        return res.status(400).json({ error: 'Data input tidak ditemukan.' });
      }

      // Lakukan prediksi
      const inputTensor = tf.tensor2d(inputData, [1, 3]); // 1 data, 3 fitur
      const prediction = model.predict(inputTensor);
      const data = await prediction.data();
      const result = data[0] > 0.9 ? "Active" : "At-Risk"
      res.json({ predict_user: result });
    } catch (error) {
      console.error('Error saat prediksi:', error);
      res.status(500).json({ error: 'Terjadi kesalahan saat prediksi.' });
    }
  });

  app.use('/api/predict', router);
}