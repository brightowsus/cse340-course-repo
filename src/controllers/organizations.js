
import {
    getOrganizationDetails,
    createOrganization
} from '../models/organizations.js';

const showOrganizationDetailsPage = async (req, res, next) => {
    try {
        const { id } = req.params;
        const organization = await getOrganizationDetails(id);

        if (!organization) {
            return res.status(404).render('errors/404', {
                title: 'Page Not Found'
            });
        }

        res.render('organization', {
            title: organization.name,
            organization
        });
    } catch (error) {
        next(error);
    }
};


const showNewOrganizationForm = async (req, res) => {
  const title = 'Add New Organization';
  res.render('new-organization', { title });
};

const createNewOrganization = async (req, res, next) => {
  try {
    const {
      name,
      description,
      contact_email,
      logo_filename
    } = req.body;

    await createOrganization(
      name,
      description,
      contact_email,
      logo_filename
    );

    res.redirect('/organizations');
  } catch (error) {
    next(error);
  }
};

export {
  showOrganizationDetailsPage,
  showNewOrganizationForm,
  createNewOrganization
};