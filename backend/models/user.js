const mongoose = require('mongoose');

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
  profileImage: {
    type: String,
    default: null
  },
  displayName: {
    type: String,
    default: null
  },
  phone: {
    type: String,
    default: null
  },
  address1: {
    type: String,
    default: null
  },
  address2: {
    type: String,
    default: null
  },
  city: {
    type: String,
    default: null
  },
  zipcode: {
    type: String,
    default: null
  },
  state: {
    type: String,
    default: null
  },
  country: {
    type: String,
    default: null
  },
  about: {
    type: String,
    default: null
  },
  socialLinks: {
    facebook: {
      type: String,
      default: null
    },
    twitter: {
      type: String,
      default: null
    },
    linkedin: {
      type: String,
      default: null
    },
    instagram: {
      type: String,
      default: null
    },
    pinterest: {
      type: String,
      default: null
    }
  },
  blogs: {
    type: [String],
    default: [],
  },
  listings: {
    type: [String],
    default: [],
  },
  subscriptionPlan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Subscription',
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
