
import express from 'express';

import {
    showProjectsPage,
    showProjectDetailsPage
} from './controllers/projects.js';

import {
    showOrganizationsPage,
    showOrganizationDetailsPage,
    showNewOrganizationForm,
    processNewOrganizationForm,
    organizationValidation
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

// List all organizations
router.get('/organizations', showOrganizationsPage);

// Organization details
router.get('/organization/:id', showOrganizationDetailsPage);

// List all categories
router.get('/categories', showCategoriesPage);

// Details of a single category
router.get('/category/:id', showCategoryDetailsPage);

// Display the new organization form
router.get('/new-organization', showNewOrganizationForm);

// Validate and process the submitted organization form
router.post(
    '/new-organization',
    organizationValidation,
    processNewOrganizationForm
);

export default router;
