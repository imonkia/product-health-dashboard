const mongoose = require('mongoose');

const issueSchema = new mongoose.Schema({
  source: { type: String, required: true },
  id: { type: String, required: true },
  title: { type: String, required: true },
  status: { type: String, required: true },
  priority: { type: Number, required: true },
  dueDate: { type: String, required: true },
  keywords: { type: String, required: true },
  fixEta: { type: String, required: true },
  dri: { type: String, required: true },
  category: { type: String, required: true }
});

const vulnerabilitySchema = new mongoose.Schema({
  risk: { type: String, required: true },
  id: { type: String, required: true },
  vulnerability: { type: String, required: true },
  category: { type: String, required: true },
  fixByDate: { type: String, required: true },
  hosts: { type: Number, required: true }
});

const patchingSchema = new mongoose.Schema({
  environment: { type: String, required: true },
  id: { type: String, required: true },
  hostname: { type: String, required: true },
  ip: { type: String, required: true },
  patchDate: { type: String, required: true },
  status: { type: String, required: true }
});

const downtimeSchema = new mongoose.Schema({
  type: { type: String, required: true },
  id: { type: String, required: true },
  title: { type: String, required: true },
  outageStart: { type: String, required: true },
  outageEnd: { type: String, required: true },
  downtimeTotal: { type: Number, required: true }
});

const complianceSchema = new mongoose.Schema({
  compliant: { type: Boolean, required: true },
  complianceSince: { type: String, required: true }
});

const opexDataSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  compliance: complianceSchema,
  issues: [issueSchema],
  vulnerabilities: [vulnerabilitySchema],
  patching: [patchingSchema],
  downtime: [downtimeSchema],
  majorIncident: [downtimeSchema],
  groupName: { type: String, required: true },
  gatehouseCheckin: { type: Boolean, required: true },
  gatehouseCheckinDate: { type: String, required: true }
}, {
  timestamps: true
});

module.exports = mongoose.model('OpexData', opexDataSchema); 