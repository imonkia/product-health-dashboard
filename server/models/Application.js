const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema({
  category: { type: String, required: true },
  linkName: { type: String, required: true },
  linkUrl: { type: String, required: true }
});

const complianceSchema = new mongoose.Schema({
  compliant: { type: Boolean, required: true },
  complianceSince: { type: String, required: true }
});

const applicationSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  groupName: { type: String, default: '' },
  gatehouseCheckin: { type: Boolean, default: false },
  gatehouseCheckinDate: { type: String, default: '' },
  compliance: complianceSchema,
  links: [linkSchema],
  // New fields for form updates
  customKeywords: { type: String, default: '' },
  emailNotifications: { type: Boolean, default: false },
  emailNotificationFrequency: { type: String, default: 'Monthly' },
  p0p1cP2hIncidents: { type: Boolean, default: false },
  includeInitialCi: { type: Boolean, default: false },
  supportHours: { type: Boolean, default: false },
  abcWorkgroup: { type: String, default: '' }
}, {
  timestamps: true
});

module.exports = mongoose.model('Application', applicationSchema); 