-- ============================================================
--  PROJECT MANAGEMENT  –  Seed (datos de prueba)
-- ============================================================

USE project_management;

-- ------------------------------------------------------------
-- ROLES
-- ------------------------------------------------------------
INSERT INTO roles (id, name) VALUES
  (1, 'superadmin'),
  (2, 'user');

-- ------------------------------------------------------------
-- USERS
-- Contraseñas en texto plano (solo referencia):
--   superadmin → Admin1234!
--   usuarios   → User1234!
-- Los hashes bcrypt (rounds=10) van en la columna password.
-- ------------------------------------------------------------
INSERT INTO users (id, role_id, name, email, password, is_active) VALUES
-- Superadmin
(1, 1, 'Super Admin', 'admin@pm.com',
 '$2b$10$0CYAuxNrctgiS2v8FduBferI2EmqJ9.q/t6dSasEKNI3OfcQ9MuCa', 1),

-- Usuarios comunes
(2, 2, 'Carlos Ramírez', 'carlos@pm.com',
 '$2b$10$QeR8mT6pWdXvKbNzLsAcIuO9fGhYjM4nPwV5tR2iEoUyCkXlDa1Fs', 1),

(3, 2, 'Laura Gómez',    'laura@pm.com',
 '$2b$10$QeR8mT6pWdXvKbNzLsAcIuO9fGhYjM4nPwV5tR2iEoUyCkXlDa1Fs', 1),

(4, 2, 'Andrés Torres',  'andres@pm.com',
 '$2b$10$QeR8mT6pWdXvKbNzLsAcIuO9fGhYjM4nPwV5tR2iEoUyCkXlDa1Fs', 1),

(5, 2, 'Sofía Herrera',  'sofia@pm.com',
 '$2b$10$QeR8mT6pWdXvKbNzLsAcIuO9fGhYjM4nPwV5tR2iEoUyCkXlDa1Fs', 0);  -- inactivo

-- ------------------------------------------------------------
-- PROJECTS
-- ------------------------------------------------------------
INSERT INTO projects (id, title, description, status, due_date, created_by) VALUES
(1, 'Rediseño Portal Web',
   'Actualizar el portal corporativo con nueva identidad visual y mejoras de UX.',
   'in_progress', '2026-06-30', 1),

(2, 'Migración a la Nube',
   'Mover toda la infraestructura on-premise a AWS.',
   'pending', '2026-08-15', 1),

(3, 'App Móvil de Inventario',
   'Desarrollar aplicación móvil para gestión de inventario en tiempo real.',
   'pending', '2026-07-20', 1),

(4, 'Auditoría de Seguridad',
   'Revisión completa de vulnerabilidades y política de accesos.',
   'completed', '2026-04-30', 1),

(5, 'Dashboard de Métricas',
   'Panel de control con KPIs del negocio en tiempo real.',
   'in_progress', '2026-05-31', 1);

-- ------------------------------------------------------------
-- PROJECT ASSIGNMENTS
-- ------------------------------------------------------------
INSERT INTO project_assignments
  (id, project_id, user_id, assigned_by, completed, completed_at) VALUES
-- Carlos → Rediseño Portal (en progreso, no completado)
(1, 1, 2, 1, 0, NULL),

-- Laura → Rediseño Portal (en progreso, no completado)
(2, 1, 3, 1, 0, NULL),

-- Carlos → Migración a la Nube
(3, 2, 2, 1, 0, NULL),

-- Andrés → App Móvil
(4, 3, 4, 1, 0, NULL),

-- Laura → Auditoría de Seguridad (completado)
(5, 4, 3, 1, 1, '2026-04-28 10:30:00'),

-- Andrés → Auditoría de Seguridad (completado)
(6, 4, 4, 1, 1, '2026-04-29 14:00:00'),

-- Carlos → Dashboard de Métricas
(7, 5, 2, 1, 0, NULL),

-- Sofía → Dashboard (inactiva, asignación histórica)
(8, 5, 5, 1, 0, NULL);