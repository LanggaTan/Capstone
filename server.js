// server.js
const Hapi = require('@hapi/hapi');
const Joi = require('joi');
const Bcrypt = require('bcrypt');
const Jwt = require('jsonwebtoken');
const users = require('./users');

const JWT_SECRET = 'rahasia_super_aman';

const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost',
        routes: {
            files: {
                relativeTo: require('path').resolve(__dirname, 'FrontEnd'),
            },
        },
    });

    // Static files (frontend)
    await server.register(require('@hapi/inert'));
    server.route({
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: '.',
                index: ['pages/login.html'],
            },
        },
    });

    // Register endpoint
    server.route({

        method: 'POST',
        path: '/api/register',
        options: {
            validate: {
                payload: Joi.object({
                    username: Joi.string().email().required(),
                    password: Joi.string().min(6).required(),
                    name: Joi.string().min(2).required(),
                    mobile: Joi.string().min(8).required(),
                }),
            },
            handler: async (request, h) => {
                const { username, password, name, mobile } = request.payload;

                // Cek apakah user sudah terdaftar
                const existingUser = users.find(user => user.username === username);
                if (existingUser) {
                    return h.response({ message: 'User already exists' }).code(400);
                }

                // Enkripsi password
                const hashedPassword = await Bcrypt.hash(password, 10);

                // ====> Letakkan baris ini di sini:
                users.push({ username, password: hashedPassword, name, mobile });

                return h.response({ message: 'User registered successfully' }).code(201);
            },
        },


    });

    // Login endpoint
    server.route({
        method: 'POST',
        path: '/api/login',
        options: {
            validate: {
                payload: Joi.object({
                    username: Joi.string().required(),
                    password: Joi.string().required(),
                }),
                failAction: (request, h, error) => {
                    return h.response({ status: 'fail', message: error.details[0].message }).code(400).takeover();
                },
            },
        },
        handler: async (request, h) => {
            const { username, password } = request.payload;
            const user = users.find(u => u.username === username);

            if (!user || !(await Bcrypt.compare(password, user.password))) {
                return h.response({ status: 'fail', message: 'Invalid username or password' }).code(401);
            }

            const token = Jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });

            return {
                status: 'success',
                message: 'Login successful',
                token,
            };
        },
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', err => {
    console.log(err);
    process.exit(1);
});

init();
