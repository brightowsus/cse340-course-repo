
import express from 'express';

import {
    showProjectsPage,
    showProjectDetailsPage
} from './controllers/projects.js';

import {
    showOrganizationDetailsPage
} from './controllers/organizations.js';

const router = express.Router();

// Upcoming service projects
router.get('/projects', showProjectsPage);

// Details of a single service project
router.get('/project/:id', showProjectDetailsPage);


router.get('/organization/:id', showOrganizationDetailsPage);

export default router;

