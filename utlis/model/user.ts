import mongoose, { Schema, models } from "mongoose";

const userSChema = new Schema({
  email: { type: String, required: true },
});

const userModal = models.user || mongoose.model("user", userSChema);

export default userModal;
