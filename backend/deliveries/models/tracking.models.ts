import { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

interface ILocation {
  type: 'Point';
  coordinates: [number, number]; // [longitude, latitude]
}

interface ITracking {
    id: string;
    delivery_id: string;
    mediater_id: string;
    coordinates: ILocation;
    created_at: Date;
    updated_at: Date;
};

// --------- USER SCHEMA -------------
const TrackingSchema = new Schema<ITracking>({
    id: {
        type: String,
        default: () => uuidv4(),
        unique: true,
        index: true,
        required: true
    },
    delivery_id: {
        type: String,
        required: true,
        index: true
    },
    mediater_id: {
        type: String,
        required: true,
        index: true
    },
    coordinates: {
      type: { type: String, enum: ['Point'], default: 'Point' },
      coordinates: { type: [Number], default: [0.0, 0.0] }
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now } 
});

TrackingSchema.index({coordinates: "2dsphere"});

TrackingSchema.index({delivery_id: 1,created_at: -1});

export const Tracking = model<ITracking>("tracking", TrackingSchema);