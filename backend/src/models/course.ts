import { InferSchemaType, Schema, model } from "mongoose";

const courseSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    code: {
      type: String,
      unique: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

type Course = InferSchemaType<typeof courseSchema>;

export default model<Course>("Course", courseSchema);
