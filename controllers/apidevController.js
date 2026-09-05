const { getDb } = require('../data/database');
const { ObjectId } = require('mongodb');

const REQUIRED_FIELDS = [
    'apiName',
    'developer',
    'category',
    'baseUrl',
    'authType',
    'status',
    'rateLimit',
    'description'
];

const validateApiEntry = (body) => {
    const missing = REQUIRED_FIELDS.filter((field) => !body[field] || typeof body[field] !== 'string' || body[field].trim() === '');
    return missing;
};

const getAll = async (req, res) => {
    try {
        const db = getDb();
        const result = await db.collection('apidev').find().toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve API entries.', details: err.message });
    }
};

const getSingle = async (req, res) => {
    try {
        const id = req.params.id;
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid entry id.' });
        }
        const db = getDb();
        const result = await db.collection('apidev').findOne({ _id: new ObjectId(id) });
        if (!result) {
            return res.status(404).json({ error: 'API entry not found.' });
        }
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: 'Failed to retrieve API entry.', details: err.message });
    }
};

const createEntry = async (req, res) => {
    try {
        const missing = validateApiEntry(req.body);
        if (missing.length > 0) {
            return res.status(400).json({ error: 'Missing or invalid required fields.', missing });
        }

        const newEntry = {
            apiName: req.body.apiName,
            developer: req.body.developer,
            category: req.body.category,
            baseUrl: req.body.baseUrl,
            authType: req.body.authType,
            status: req.body.status,
            rateLimit: req.body.rateLimit,
            description: req.body.description
        };

        const db = getDb();
        const response = await db.collection('apidev').insertOne(newEntry);

        if (response.acknowledged) {
            res.status(201).json({ id: response.insertedId, ...newEntry });
        } else {
            res.status(500).json({ error: 'Failed to create API entry.' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Failed to create API entry.', details: err.message });
    }
};

const updateEntry = async (req, res) => {
    try {
        const id = req.params.id;
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid entry id.' });
        }

        const missing = validateApiEntry(req.body);
        if (missing.length > 0) {
            return res.status(400).json({ error: 'Missing or invalid required fields.', missing });
        }

        const updatedEntry = {
            apiName: req.body.apiName,
            developer: req.body.developer,
            category: req.body.category,
            baseUrl: req.body.baseUrl,
            authType: req.body.authType,
            status: req.body.status,
            rateLimit: req.body.rateLimit,
            description: req.body.description
        };

        const db = getDb();
        const response = await db.collection('apidev').replaceOne(
            { _id: new ObjectId(id) },
            updatedEntry
        );

        if (response.matchedCount === 0) {
            return res.status(404).json({ error: 'API entry not found.' });
        }

        res.status(200).json({ id, ...updatedEntry });
    } catch (err) {
        res.status(500).json({ error: 'Failed to update API entry.', details: err.message });
    }
};

const deleteEntry = async (req, res) => {
    try {
        const id = req.params.id;
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'Invalid entry id.' });
        }

        const db = getDb();
        const response = await db.collection('apidev').deleteOne({ _id: new ObjectId(id) });

        if (response.deletedCount === 0) {
            return res.status(404).json({ error: 'API entry not found.' });
        }

        res.status(200).json({ message: 'API entry deleted successfully.' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete API entry.', details: err.message });
    }
};

module.exports = {
    getAll,
    getSingle,
    createEntry,
    updateEntry,
    deleteEntry
};
