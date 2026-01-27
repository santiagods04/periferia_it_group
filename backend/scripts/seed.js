const User = require('../models/user');
const Post = require('../models/post');

const initialUsers = [
  { email: "admin@tuapp.com", password: "password123" },
  { email: "testuser@tuapp.com", password: "user7890" },
  { email: "newuser@tuapp.com", password: "newpassword456" },
];

const seedUsers = async () => {
  try {
    for (const userData of initialUsers) {
      let user = await User.findOne({ email: userData.email });

      if (!user) {
        user = await User.create(userData);
        console.log(`✅ Usuario creado: ${userData.email}`);
      }

      const postExists = await Post.findOne({ owner: user._id });

      if (!postExists) {
        await Post.create({
          message: `Hola, soy el post inicial de ${user.email}`,
          owner: user._id,
        });
        console.log(`📝 Publicación inicial creada para: ${user.email}`);
      }
    }
    console.log('🏁 Proceso de seeding completado.');
  } catch (err) {
    console.error('❌ Error en el seeding:', err);
  }
};

module.exports = seedUsers;