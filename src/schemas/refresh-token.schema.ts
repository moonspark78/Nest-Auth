import { Prop, Schema } from "@nestjs/mongoose";
import mongoose, {Document} from "mongoose";

@Schema({versionKey: false, timestamps: true})
export class RefreshToken extends Document {
    @Prop({ required: true })
    token: string;
}