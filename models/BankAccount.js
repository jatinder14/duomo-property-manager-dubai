const mongoose = require('mongoose');

const BankAccountSchema = new mongoose.Schema({
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    accountNumber: { type: String, required: true },
    bankName: { type: String, required: true },
    ifscCode: { type: String, required: true },
    branchName: { type: String, required: true }
}, { timestamps: true }); 

module.exports = mongoose.model('BankAccount', BankAccountSchema);
