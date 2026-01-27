const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const UnauthorizedError = require("../errors/UnauthorizedError");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: (v) => validator.isEmail(v),
        message: "Email inválido",
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password
) {
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError("Correo o contraseña incorrectos");
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new UnauthorizedError("Correo o contraseña incorrectos");
        }
        return user;
      });
    });
};

userSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next();

  return bcrypt.hash(this.password, 10)
    .then((hash) => {
      this.password = hash;
    });
});

module.exports = mongoose.model("User", userSchema);