
import {
    getAllOrganizations,
    getOrganizationDetails,
    createOrganization
} from '../models/organizations.js';
import { getProjectsByOrganizationId } from '../models/projects.js';
import { body, validationResult } from 'express-validator';

// Validation and sanitization rules for the organization form
const organizationValidation = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Organization name is required')
        .isLength({ min: 3, max: 150 })
        .withMessage('Organization name must be between 3 and 150 characters'),

    body('description')
        .trim()
        .notEmpty()
        .withMessage('Organization description is required')
        .isLength({ max: 500 })
        .withMessage('Organization description cannot exceed 500 characters'),

    body('contactEmail')
        .trim()
        .notEmpty()
        .withMessage('Contact email is required')
        .isEmail()
        .withMessage('Please provide a valid email address')
        .normalizeEmail()
];

// Display all organizations
const showOrganizationsPage = async (req, res, next) => {
    try {
        const organizations = await getAllOrganizations();

        res.render('organizations', {
            title: 'All Organizations',
            organizations
        });
    } catch (error) {
        next(error);
    }
};

// Display one organization's details and associated projects
const showOrganizationDetailsPage = async (req, res, next) => {
    try {
        const organizationId = req.params.id;

        // Retrieve organization details
        const organizationDetails = await getOrganizationDetails(organizationId);

        // Check whether the organization exists
        if (!organizationDetails) {
            return res.status(404).render('errors/404', {
                title: 'Page Not Found'
            });
        }

        // Retrieve projects belonging to this organization
        const projects = await getProjectsByOrganizationId(organizationId);

        const title = 'Organization Details';

        return res.render('organization', {
            title,
            organizationDetails,
            projects
        });

    } catch (error) {
        next(error);
    }
};


// Display the new organization form
const showNewOrganizationForm = async (req, res, next) => {
    try {
        return res.render('new-organization', {
            title: 'Add New Organization'
        });
    } catch (error) {
        next(error);
    }
};

// Validate the form and create a new organization
const processNewOrganizationForm = async (req, res, next) => {
    try {
        const results = validationResult(req);

        if (!results.isEmpty()) {
            results.array().forEach((error) => {
                req.flash('error', error.msg);
            });

            return res.redirect('/new-organization');
        }

        const { name, description, contactEmail } = req.body;

        // Ensure the required logo filename is provided
        const logoFilename = 'placeholder-logo.png';

        const organizationId = await createOrganization(
            name,
            description,
            contactEmail,
            logoFilename
        );

        req.flash('success', 'Organization added successfully!');

        return res.redirect(`/organization/${organizationId}`);
    } catch (error) {
        next(error);
    }
};

// Export controller functions and validation rules
export {
    showOrganizationsPage,
    showOrganizationDetailsPage,
    showNewOrganizationForm,
    processNewOrganizationForm,
    organizationValidation
};
