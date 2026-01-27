require('dotenv').config();
const express = require('express');
const sequelize = require('./config/database');
const cors = require('cors');
const { errors } = require('celebrate');
const NotFoundError = require('./errors/NotFoundError');

const authRouter = require('./routes/auth');
const userRouter = require('./routes/users');
const postsRouter = require('./routes/posts')
const auth = require('./middlewares/auth');
const seedUsers = require('./scripts/seed');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.use('/', authRouter);

app.use('/users', auth, userRouter);
app.use('/posts', postsRouter);

app.use((req, res, next) => {

  next(new NotFoundError('Recurso no encontrado'));
});

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

sequelize.sync({ force: false })
  .then(async () => {
    console.log('✅ Conexión exitosa con PostgreSQL y tablas sincronizadas');
    await seedUsers();
    app.listen(PORT, () => {
      console.log(`🚀 Servidor escuchando en puerto ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Error al conectar con PostgreSQL:', err);
  });