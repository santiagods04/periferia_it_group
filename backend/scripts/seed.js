const User = require('../models/user');

const initialUsers = [
  {
    email: "admin@tuapp.com",
    password: "password123",
  },
  {
    email: "testuser@tuapp.com",
    password: "user7890",
  }
];

const seedUsers = async () => {
  try {
    for (const userData of initialUsers) {

      const userExists = await User.findOne({ email: userData.email });

      if (!userExists) {
        await User.create(userData);
        console.log(`✅ Usuario creado: ${userData.email}`);
      }
    }
    console.log('🏁 Proceso de seeding completado.');
  } catch (err) {
    console.error('❌ Error en el seeding:', err);
  }
};

module.exports = seedUsers;