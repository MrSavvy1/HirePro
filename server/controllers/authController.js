const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Employee = require('../models/Employee');
const Company = require('../models/Company');

exports.signup = async (req, res) => {
    const role = req.params.role;
    const { name, email, password } = req.body; 
    console.log(`Role is: ${role}`);

    try {
        console.log(`Role is: ${role}`);
        console.log(role);
        if (role === 'employee') {
            const employee = await Employee.create({ name, email, password, role });
            //const token = employee.generateToken();
            res.status(201).json({ message: 'Employee created'/*, token */});
        } else if (role === 'company') {
            const company = await Company.create({ name, email, password, role });
            //const token = company.generateToken();
            res.status(201).json({ message: 'Company created', /* token */});
        } else {
            res.status(400).json({ message: 'Invalid role' });
        }
    } catch (err) {
        console.error('Signup error:', err); 
        res.status(500).json({ message: 'An error occurred during signup', error: err.message });
    }
};



exports.loginEmployee = async (req, res) => {
    const { email, password } = req.body;
    console.log(`In Auth: ${email}`);
    
    try {
        const employee = await Employee.findOne({ email: email });
        console.log(`Auth: ${employee}`);
        if (!employee) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const isMatch = await employee.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        //const token = employee.generateToken();
        res.status(200).json({/* token, */ role: 'employee' });
    } catch (err) {
        console.log(`Auth: ${email}`);
        res.status(500).json({ message: 'Server error', error: err });
    }
};

exports.loginCompany = async (req, res) => {
    const { email, password } = req.body;
    console.log(`Com Auth: ${email}`);
    try {
        const company = await Company.findOne({ email: email });
        console.log(`Auth: ${company}`);
        if (!company) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        const isMatch = await company.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        //const token = company.generateToken();
        res.status(200).json({ /*token, */ role: 'company' });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err });
    }
};
