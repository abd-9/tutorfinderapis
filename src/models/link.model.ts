import { model, Schema, Document, SchemaTypes } from 'mongoose';
import { LINK_STATUS, LINK_TYPES, ILink as ILink } from '@/interfaces/link.interface';

const LinkSchema: Schema = new Schema({
  url: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: [LINK_TYPES.BLOG, LINK_TYPES.TOOL, LINK_TYPES.COURSE, LINK_TYPES.PLUGIN],
    required: true,
    default: LINK_TYPES.TOOL,
  },
  status: {
    required: true,
    type: String,
    enum: Object.values(LINK_TYPES),
    default: LINK_STATUS.INQUEUE,
  },
  active: {
    type: Boolean,
    default: false,
  },
  visitsCount: {
    type: Number,
    default: false,
  },
  higet: {
    type: Number,
    required: false,
  },
  width: {
    type: Number,
    required: false,
  },
  pixels: {
    type: Number,
    required: true,
    default: 1,
  },
  description: {
    type: String,
    required: false,
  },
  tags: {
    type: [String],
    required: false,
  },
  user: {
    type: SchemaTypes.ObjectId,
    ref: 'User',
    required: false,
  },
  customer: {
    type: SchemaTypes.ObjectId,
    ref: 'Customer',
    required: false,
  },
  payment: {
    type: SchemaTypes.ObjectId,
    ref: 'Payment',
    required: false,
  },
  rank: {
    type: Number,
    required: true,
    default: 1,
  },
});

export const LinkModel = model<ILink & Document>('Link', LinkSchema);
