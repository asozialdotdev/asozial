const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// User Schema
const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  githubUrl: { type: String },
  website: { type: String },
  city: { type: String },
  country: { type: String },
  languagesSpoken: [{ type: String }],
  techStack: [{ type: String }],
  projectsJoined: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
  projectsSuggested: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
  projectsApplied: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
  dashboardPosts: [{ type: Schema.Types.ObjectId, ref: 'Post' }]
}, {
  collection: 'User',
  timestamps: true
});

// Friendship Schema
const friendshipSchema = new Schema({
  senderId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  receiverId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['pending', 'accepted', 'declined'], required: true }
}, {
  collection: 'Friendship',
  timestamps: true
});

// Message Schema
const messageSchema = new Schema({
  senderId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  receiverId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String },
  content: { type: String },
  createdDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now },
  isRead: { type: Boolean, default: false }
}, {
  collection: 'Message',
  timestamps: true
});

// Post Schema
const postSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String },
  content: { type: String },
  createdDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now }
}, {
  collection: 'Post',
  timestamps: true
});

// Project Schema
const projectSchema = new Schema({
  title: { type: String },
  description: { type: String },
  githubRepo: { type: String },
  techStack: [{ type: String }],
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  membersJoined: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  membersApplied: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  membersInvited: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  status: [{ type: String, enum: ['active', 'inactive', 'completed'] }],
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }]
}, {
  collection: 'Project',
  timestamps: true
});

// ProjectPost Schema
const projectPostSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true },
  title: { type: String },
  content: { type: String },
  createdDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now }
}, {
  collection: 'ProjectPost',
  timestamps: true
});

const User = mongoose.model('User', userSchema);
const Friendship = mongoose.model('Friendship', friendshipSchema);
const Message = mongoose.model('Message', messageSchema);
const Post = mongoose.model('Post', postSchema);
const Project = mongoose.model('Project', projectSchema);
const ProjectPost = mongoose.model('ProjectPost', projectPostSchema);

module.exports = { User, Friendship, Message, Post, Project, ProjectPost };
