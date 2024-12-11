module.exports = (app) => {
  const jwt = require('jsonwebtoken');
  require('dotenv').config();

  const User = require('../models/user.model');
  const router = require('express').Router();

  // Middleware untuk verifikasi token JWT
  const protect = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', ''); // Mengambil token dari header

    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
      // Verifikasi token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // Menyimpan informasi user dalam objek req
      next(); // Melanjutkan ke rute berikutnya
    } catch (error) {
      return res.status(401).json({ message: 'Token is not valid' });
    }
  };

  // Endpoint untuk mengambil data pengguna yang terautentikasi
  router.get('/', protect, async (req, res) => {
    try {
      // Mengambil data pengguna berdasarkan ID yang ada di token
      const user = await User.findById(req.user.id).select('-password'); // Menyembunyikan password

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json(user); // Mengirimkan data pengguna
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  app.use('/api/user', router)
}