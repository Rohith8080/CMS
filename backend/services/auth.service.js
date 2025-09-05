const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

class AuthService {
  static async hashPassword(password) {
    return bcrypt.hash(password, 12);
  }

  static async comparePasswords(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword);
  }

  static generateTokens(user) {
    const accessToken = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );

    const refreshToken = jwt.sign(
      { userId: user.id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: '7d' }
    );

    return { accessToken, refreshToken };
  }

  static async saveRefreshToken(userId, refreshToken) {
    await prisma.user.update({
      where: { id: userId },
      data: { refreshToken }
    });
  }

  static async validateUser(email, password) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return null;

    const isValid = await this.comparePasswords(password, user.password);
    if (!isValid) return null;

    return user;
  }
}

module.exports = AuthService;
