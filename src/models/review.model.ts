import { model, Schema, Document } from 'mongoose';

export interface IReview {
  comment: string;
  tutor?: Schema.Types.ObjectId;
  student: Schema.Types.ObjectId;
  rate: Number;
}

export const ReviewSchema: Schema<IReview> = new Schema<IReview>({
  comment: {
    type: String,
    required: true,
  },
  tutor: {
    type: Schema.Types.ObjectId,
    ref: 'Tutor',
    required: false,
  },
  student: {
    type: Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  rate: {
    type: Number,
    required: true,
    default: 1,
  },
});

// const ReviewModel = model<IReview & Document>('Review', ReviewSchema);

// export default ReviewModel;
