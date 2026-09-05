const { getDb } = require('../data/database');
const { ObjectId } = require('mongodb');

const REQUIRED_FIELDS = [
    'name',
    'email',
    'company',
    'country',
    'yearsExperience',
    'specialty',
    'bio',
    'joinedDate'
];

const validateDeveloper = (body) => {
    const missing = REQUIRED_FIELDS.filter((field) => {
        if (field === 'yearsExperience') {
            return body[field] === undefined || body[field] === null || isNaN(Number(body[field]));
        }
        return !body[field] || typeof body[field] !== 'string' || body[field].trim() === '';
    });
    return missing;
};

const getAll = async (req, res) => {
    try {
        const db = getDb();
        const result = await db.collection('developers').find().toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve developers.', details: err.message });
    }
};

const getSingle = async (req, res) => {
    try {
        const id = req.params.id;
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid developer id.' });
        }
        const db = getDb();
        const result = await db.collection('developers').findOne({ _id: new ObjectId(id) });
        if (!result) {
            return res.status(404).json({ error: 'Developer not found.' });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve developer.', details: err.message });
    }
};

const createDeveloper = async (req, res) => {
    try {
        const missing = validateDeveloper(req.body);
        if (missing.length > 0) {
            return res.status(400).json({ error: 'Missing or invalid required fields.', missing });
        }

        const newDeveloper = {
            name: req.body.name,
            email: req.body.email,
            company: req.body.company,
            country: req.body.country,
            yearsExperience: Number(req.body.yearsExperience),
            specialty: req.body.specialty,
            bio: req.body.bio,
            joinedDate: req.body.joinedDate
        };

        const db = getDb();
        const response = await db.collection('developers').insertOne(newDeveloper);

        if (response.acknowledged) {
            res.status(201).json({ id: response.insertedId, ...newDeveloper });
        } else {
            res.status(500).json({ error: 'Failed to create developer.' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Failed to create developer.', details: err.message });
    }
};

const updateDeveloper = async (req, res) => {
    try {
        const id = req.params.id;
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid developer id.' });
        }

        const missing = validateDeveloper(req.body);
        if (missing.length > 0) {
            return res.status(400).json({ error: 'Missing or invalid required fields.', missing });
        }

        const updatedDeveloper = {
            name: req.body.name,
            email: req.body.email,
            company: req.body.company,
            country: req.body.country,
            yearsExperience: Number(req.body.yearsExperience),
            specialty: req.body.specialty,
            bio: req.body.bio,
            joinedDate: req.body.joinedDate
        };

        const db = getDb();
        const response = await db.collection('developers').replaceOne(
            { _id: new ObjectId(id) },
            updatedDeveloper
        );

        if (response.matchedCount === 0) {
            return res.status(404).json({ error: 'Developer not found.' });
        }

        res.status(200).json({ id, ...updatedDeveloper });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update developer.', details: err.message });
    }
};

const deleteDeveloper = async (req, res) => {
    try {
        const id = req.params.id;
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid developer id.' });
        }

        const db = getDb();
        const response = await db.collection('developers').deleteOne({ _id: new ObjectId(id) });

        if (response.deletedCount === 0) {
            return res.status(404).json({ error: 'Developer not found.' });
        }

        res.status(200).json({ message: 'Developer deleted successfully.' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete developer.', details: err.message });
    }
};

module.exports = {
    getAll,
    getSingle,
    createDeveloper,
    updateDeveloper,
    deleteDeveloper
};
