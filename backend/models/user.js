import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, 'First name is required'],
    minlength: [2, 'First name must be at least 2 characters long'],
    maxlength: [50, 'First name cannot be more than 50 characters long']
  },
  lastname: {
    type: String,
    required: [true, 'Last name is required'],
    minlength: [2, 'Last name must be at least 2 characters long'],
    maxlength: [50, 'Last name cannot be more than 50 characters long']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    validate: {
      validator: function(v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: props => `${props.value} is not a valid email address`
    }
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters long']
  },
  blogs: {
    type: [String],
    default: [],
  },
  currentPlan: {
    type: String,
    enum: ['intro', 'base', 'popular', 'enterprise', null],
    default: null,
  },
  businessPlans: [{ type: mongoose.Schema.Types.ObjectId, ref: 'BusinessPlan' }],
  isVerified:{
    type:Boolean,
    default:false
  }
});

export default mongoose.models.User || mongoose.model('User', userSchema);
