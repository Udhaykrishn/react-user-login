import passwordService from '#util/password.utils.js';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
			minLength: 1,
			maxLength: 50
		},
		email: {
			type: String,
			required: true,
			unique: true
		},
		password: {
			type: String,
			required: true,
			minLength: 8
		},
		role: {
			type: String,
			enum: [ 'user', 'admin' ],
			default: 'user'
		},
		isBlocked: {
			type: Boolean,
			default: false
		},
		photo: {
			type: String,
			default: ''
		}
	},
	{
		timestamps: true
	}
);

userSchema.pre('save', async function(next) {
	if (!this.isModified('password')) {
		return next();
	}

	this.password = await passwordService.hash(this.password);
	next();
});

const User = mongoose.model('User', userSchema);
export default User;
