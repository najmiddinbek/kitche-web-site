import mongoose, { Schema } from "mongoose";

const topicSchema = new Schema(
  {
    title: String,
    description: String,
    telefon: String,
    adress: String,
    isChecked: { type: Boolean, default: true },
    price: String,
    secondTitle: String,
    secondPrice: String,
    secondDescription: String,
    secondAdress: String,
    secondTelefon: String,
    drink: String,
    drink2: String,
  },
  {
    timestamps: true,
  }
);

const Topic = mongoose.models.Topic || mongoose.model("Topic", topicSchema);

export default Topic;
