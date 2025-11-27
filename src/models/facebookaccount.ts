import mongoose from "mongoose";

const pageSchema = new mongoose.Schema(
  {
    pageId: { type: String, required: true },
    pageName: { type: String },
    accessToken: { type: String, required: true },
    tokenExpiresAt: { type: Date }, 
  },
  { _id: false }
);

const facebookAccountSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    facebookUserId: {
      type: String,
      required: true,
    },

    facebookUserName: {
      type: String,
    },

    pages: [pageSchema], // multiple pages a user can manage

    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Avoid multiple model compilation errors in Next.js
export default mongoose.models.FacebookAccount ||
  mongoose.model("FacebookAccount", facebookAccountSchema);
