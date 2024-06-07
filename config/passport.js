import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { findUserByUsername, findUserById } from '../features/users/userRepository.js';
import bcrypt from 'bcrypt';

export const configurePassport = () => {
  passport.use(new LocalStrategy(
    async (username, password, done) => {
      try {
        const user = await findUserByUsername(username);
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  ));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await findUserById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
};
