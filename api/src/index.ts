import express, { Request, Response } from 'express';
import Joi from 'joi';

const app = express();
const port = 3000;

app.use(express.json());

const validUsername = 'JohnDoe@example.com';
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const schema = Joi.object({
    username: Joi.string().custom((value, helpers) => {
        if (emailRegex.test(value) && value === validUsername) {
            return value;
        }
        return helpers.error('invalid email');
    }, 'valid email').required(),
    action: Joi.string().valid('Remove', 'Add').required(),
    amount: Joi.number().required().min(1).max(200),
});

app.post('/user/:username', (req: Request, res: Response) => {
    const username = req.params.username;

    const payload = req.body;
    payload.username = username

    const { error } = schema.validate(payload);

    if (username !== validUsername) {
        res.status(404).json({ message: 'Resource not found', status: 404 });
    } else if (error) {
        const validationErrors = error.details.map((detail: any) => ({
            [detail.context.key]: detail.type,
        }));
        res.status(400).json({ message: 'Validation error', fields: validationErrors, status: 400 });
    } else {
        if (payload.action === 'Remove') {
            payload.amount -= payload.amount * 0.1;
        }
        res.status(200).json({ response: { username, ...payload } });
    }
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
