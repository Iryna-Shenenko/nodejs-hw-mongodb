
import { model, Schema } from "mongoose";

const studentsSchema = new Schema (
    {
        name: {
          type: String,
          required: true,
        },
        phoneNumber: {
          type: String,
          required: true,
        },
        contactType: {
          type: String,
          required: true,
          enum: ['work', 'home', 'personal'],
          default: 'personal',
        },
        email: {
          type: String,
        },
        isFavourite: {
          type: Boolean,
          default: false,
        },
        userId: {
          type: Schema.Types.ObjectId,
          ref: 'users',
          required: true,
        },

        photo: {type: String},
      },

      {
        timestamps: true,
        versionKey: false,
      },
);

export const ContactsCollection = model ('contacts', studentsSchema);
