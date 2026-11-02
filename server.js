
import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
import session from 'express-session';

import routes from './src/routes.js';
import flash from './src/middleware/flash.js';

import { testConnection } from './src/models/db.js';
import { getAllOrganizations } from './src/models/organizations.js';
import { getAllProjects } from './src/models/projects.js';
import { getAllCategories } from './src/models/categories.js';

// Define the application environment
const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'production';

// Define the port number
const PORT = process.env.PORT || 3000;

// Define file paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create the Express application
const app = express();

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Tell Express where to find your templates
app.set('views', path.join(__dirname, 'src/views'));

// Set up session management FIRST
app.use(
    session({
        secret:
            process.env.SESSION_SECRET ||
            'development-secret-change-this-before-deployment',
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 60 * 60 * 1000
        }
    })
);

// Use flash middleware AFTER session management
app.use(flash);

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Allow Express to process form and JSON data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Make NODE_ENV available to all EJS templates
app.use((req, res, next) => {
    res.locals.NODE_ENV = NODE_ENV;
    next();
});

// Log incoming requests in development mode
app.use((req, res, next) => {
    if (NODE_ENV === 'development') {
        console.log(`${req.method} ${req.url}`);
    }

    next();
});

// Register application routes
app.use(routes);

// Home page
app.get('/', async (req, res, next) => {
    try {
        res.render('home', {
            title: 'Home'
        });
    } catch (error) {
        next(error);
    }
});

// Organizations page
app.get('/organizations', async (req, res, next) => {
    try {
        const organizations = await getAllOrganizations();

        res.render('organizations', {
            title: 'Our Partner Organizations',
            organizations
        });
    } catch (error) {
        next(error);
    }
});

// Projects page
app.get('/projects', async (req, res, next) => {
    try {
        const projects = await getAllProjects();

        res.render('projects', {
            title: 'Service Projects',
            projects
        });
    } catch (error) {
        next(error);
    }
});

// Categories page
app.get('/categories', async (req, res, next) => {
    try {
        const categories = await getAllCategories();

        res.render('categories', {
            title: 'Service Project Categories',
            categories
        });
    } catch (error) {
        next(error);
    }
});

// Catch-all route for 404 errors
app.use((req, res, next) => {
    const err = new Error('Page Not Found');
    err.status = 404;
    next(err);
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Error occurred:', err.message);

    if (NODE_ENV === 'development') {
        console.error(err.stack);
    }

    const status = err.status || 500;
    const template = status === 404 ? '404' : '500';

    res.status(status).render(`errors/${template}`, {
        title: status === 404 ? 'Page Not Found' : 'Something Went Wrong',
        error: err.message,
        stack: NODE_ENV === 'development' ? err.stack : undefined,
        NODE_ENV
    });
});

// Start server and test database connection
app.listen(PORT, async () => {
    try {
        await testConnection();

        console.log(`Server is running at http://127.0.0.1:${PORT}`);
        console.log(`Environment: ${NODE_ENV}`);
    } catch (error) {
        console.error('Error connecting to the database:', error);
    }
});
