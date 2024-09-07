import mongoose, {Document, Schema} from 'mongoose';

interface IExpoPushTokenAdmin extends Document {
    token: string;
    createdAt: Date;
    updatedAt: Date;
}

const ExpoPushTokenSchemaAdmin: Schema = new Schema<IExpoPushTokenAdmin>({
    token: {
        type: String,
        required: true,
        unique: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
});

ExpoPushTokenSchemaAdmin.pre<IExpoPushTokenAdmin>('save', function (next) {
    this.updatedAt = new Date();
    next();
});

const ExpoPushTokenAdmin = mongoose.model<IExpoPushTokenAdmin>('ExpoPushTokenAdmin', ExpoPushTokenSchemaAdmin);
export default ExpoPushTokenAdmin;