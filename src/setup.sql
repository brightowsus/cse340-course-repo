-- ========================================
-- Organization Table
-- ========================================
CREATE TABLE organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);


-- ========================================
-- Insert sample data: Organizations
-- ========================================
INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES
('BrightFuture Builders', 'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 'info@brightfuturebuilders.org', 'brightfuture-logo.png'),
('GreenHarvest Growers', 'An urban farming collective promoting food sustainability and education in local neighborhoods.', 'contact@greenharvest.org', 'greenharvest-logo.png'),
('UnityServe Volunteers', 'A volunteer coordination group supporting local charities and service initiatives.', 'hello@unityserve.org', 'unityserve-logo.png');

CREATE TABLE projects (
    project_id SERIAL PRIMARY KEY,
    organization_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    date DATE NOT NULL,
    CONSTRAINT fk_projects_organization
        FOREIGN KEY (organization_id)
        REFERENCES organizations(organization_id)
);



INSERT INTO projects
(organization_id, title, description, location, date)
VALUES
(1, 'Community Clean-Up', 'Clean and improve public spaces in the community.', 'Accra', '2026-10-05'),
(1, 'Food Donation Drive', 'Collect and distribute food to families in need.', 'Kumasi', '2026-10-12'),
(1, 'Youth Computer Training', 'Provide basic computer training to young people.', 'Accra', '2026-10-19'),
(1, 'Tree Planting Project', 'Plant trees to improve the local environment.', 'Tema', '2026-10-26'),
(1, 'Community Health Outreach', 'Provide health education and basic screening services.', 'Cape Coast', '2026-11-02'),

(2, 'School Renovation', 'Help renovate classrooms and improve learning spaces.', 'Kumasi', '2026-10-07'),
(2, 'Reading Program', 'Provide reading support to children in local schools.', 'Accra', '2026-10-14'),
(2, 'Computer Donation', 'Provide computers to students and schools.', 'Tamale', '2026-10-21'),
(2, 'Water Project', 'Support access to clean water in the community.', 'Bolgatanga', '2026-10-28'),
(2, 'Skills Training', 'Teach practical skills to young adults.', 'Koforidua', '2026-11-04'),

(3, 'Environmental Awareness', 'Educate community members about environmental protection.', 'Takoradi', '2026-10-09'),
(3, 'Beach Clean-Up', 'Clean plastic waste from the local beach.', 'Cape Coast', '2026-10-16'),
(3, 'Women Entrepreneurship', 'Provide entrepreneurship training for women.', 'Accra', '2026-10-23'),
(3, 'Community Garden', 'Create a community garden for local residents.', 'Kumasi', '2026-10-30'),
(3, 'Donation Campaign', 'Collect essential items for families in need.', 'Tema', '2026-11-06');




-- ============================================
-- CATEGORIES
-- ============================================

CREATE TABLE public.categories (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

-- Insert categories
INSERT INTO public.categories (name)
VALUES
    ('Environment'),
    ('Education'),
    ('Community Development'),
    ('Health'),
    ('Youth Development');


-- ============================================
-- PROJECT / CATEGORY RELATIONSHIP
-- ============================================

CREATE TABLE public.project_category (
    project_id INT NOT NULL,
    category_id INT NOT NULL,

    PRIMARY KEY (project_id, category_id),

    FOREIGN KEY (project_id)
        REFERENCES public.projects(project_id)
        ON DELETE CASCADE,

    FOREIGN KEY (category_id)
        REFERENCES public.categories(category_id)
        ON DELETE CASCADE
);


-- ============================================
-- VERIFY CATEGORIES
-- ============================================

SELECT *
FROM public.categories;


-- ============================================
-- VERIFY PROJECTS
-- ============================================

SELECT project_id, title
FROM public.projects
ORDER BY project_id;


-- ============================================
-- VERIFY CATEGORY IDs
-- ============================================

SELECT category_id, name
FROM public.categories
ORDER BY category_id;


-- ============================================
-- ASSIGN CATEGORIES TO PROJECTS
-- ============================================

INSERT INTO public.project_category (project_id, category_id)
VALUES
    (1, 1),
    (1, 3),
    (2, 3),
    (3, 2),
    (3, 5),
    (4, 1),
    (5, 4);


-- ============================================
-- VERIFY PROJECT / CATEGORY RELATIONSHIPS
-- ============================================

SELECT
    p.title AS project,
    c.name AS category
FROM public.projects p
JOIN public.project_category pc
    ON p.project_id = pc.project_id
JOIN public.categories c
    ON pc.category_id = c.category_id
ORDER BY p.project_id;


-- ============================================
-- ADD CATEGORIES TO PROJECTS 6-15
-- ============================================

INSERT INTO public.project_category (project_id, category_id)
VALUES
    (6, 2), -- Education

    (7, 1), -- Environment
    (7, 5), -- Youth Development

    (8, 3), -- Community Development

    (9, 4), -- Health

    (10, 1), -- Environment

    (11, 2), -- Education
    (11, 3), -- Community Development

    (12, 5), -- Youth Development

    (13, 4), -- Health
    (13, 3), -- Community Development

    (14, 1), -- Environment
    (14, 2), -- Education

    (15, 5); -- Youth Development

    -- ============================================
-- VERIFY PROJECT/CATEGORY RELATIONSHIPS
-- ============================================

SELECT
    p.project_id,
    p.title AS project,
    c.name AS category
FROM public.projects p
JOIN public.project_category pc
    ON p.project_id = pc.project_id
JOIN public.categories c
    ON pc.category_id = c.category_id
ORDER BY p.project_id, c.name;