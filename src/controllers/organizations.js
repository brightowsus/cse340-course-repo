
import {
    getOrganizationDetails
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

export {
    showOrganizationDetailsPage
};
