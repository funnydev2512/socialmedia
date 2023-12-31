import mongoose, {Schema} from "mongoose";

const emailVerificationSchema = Schema(
    {
        userId: String,
        token: String,
        createdAt: Date,
        expiresAt: Date,
    },
    { timestamps: true }
)

const Verification = mongoose.model("Verification", emailVerificationSchema);

export default Verification;