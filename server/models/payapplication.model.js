import mongoose from "mongoose";

const PayApplicationSchema = new mongoose.Schema(
  {
    projectId: {
      type: String,
    },
    family: {
      type: String,
    },
    subfamily: {
      type: String,
    },
    subcontractorOffers: {
      type: String,
    },

    totalInvoices: {
      type: Number,
    },

    anticipo: {
      type: Number,
    },

    invoices: {
      type: String,
    },

    datepayapplication: {
      type: Date,
    },
    invoice: {
      type: Number,
    },
    numberpayapplication: {
      type: Number,
    },

    payapplication: {
      type: Number,
    },

    porcentajecdsctoanticipo: {
      type: String,
    },
    dsctoanticipo: {
      type: Number,
    },
    porcentajedctoretenciones: {
      type: String,
    },

    retenciones: {
      type: Number,
    },

    totalinvoice: {
      type: Number,
    },

    observations: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const PayApplicationModel = mongoose.model(
  "payapplication",
  PayApplicationSchema
);
