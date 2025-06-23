// src/dao/models/petsModel.js

import mongoose from "mongoose";

const petSchema = new mongoose.Schema({
  name: { 
    type: String,
    required: true
  },
  species: {
    type: String,
    enum: ['perro', 'gato', 'pájaro', 'pez', 'conejo'],
    required: true
  },
  age: {
    type: Number,
    default: 0
  },
  adopted: {
    type: Boolean,
    default: false
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Asegurate de tener un modelo de usuario si querés usar esto
    default: null
  }
}, {
  timestamps: true
});

const PetModel = mongoose.model("Pet", petSchema);

export default PetModel;
