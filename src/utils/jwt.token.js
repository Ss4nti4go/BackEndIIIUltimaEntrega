import jwt from 'jsonwebtoken';
import configObject from '../config/process.config.js';

export const getUserFromToken = (token) => {
  try {
    if (!token) return null;
    const user = jwt.verify(token, configObject.sessionSecret);
    return user;
  } catch (error) {
    console.error('Error al decodificar el token:', error);
    return null;
  }
};