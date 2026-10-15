
import express from 'express';

import {
    showProjectsPage,
    showProjectDetailsPage
} from './controllers/projects.js';

import {
    showOrganizationDetailsPage,
    showNewOrganizationForm,
    createNewOrganization
} from './controllers/organizations.js';

import {
    showCategoriesPage,
    showCategoryDetailsPage
} from './controllers/categories.js';


const router = express.Router();

// Upcoming service projects
router.get('/projects', showProjectsPage);

// Details of a single service project
router.get('/project/:id', showProjectDetailsPage);

// Organization details
router.get('/organization/:id', showOrganizationDetailsPage);

// List all categories
router.get('/categories', showCategoriesPage);

// Details of a single category
router.get('/category/:id', showCategoryDetailsPage);

// Display the new organization form
router.get('/new-organization', showNewOrganizationForm);

// Process the submitted organization form
router.post('/new-organization', createNewOrganization);
router.post('/new-organization', createNewOrganization);

export default router;
 