-- ============================================================
--  PROJECT MANAGEMENT  –  Schema MySQL
--  Base de datos: project_management
-- ============================================================

CREATE DATABASE IF NOT EXISTS project_management
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE project_management;

-- ------------------------------------------------------------
-- 1. ROLES
-- ------------------------------------------------------------
CREATE TABLE roles (
  id        TINYINT UNSIGNED  NOT NULL AUTO_INCREMENT,
  name      VARCHAR(50)       NOT NULL,   -- 'superadmin' | 'user'
  PRIMARY KEY (id),
  UNIQUE KEY uq_roles_name (name)
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- 2. USERS
-- ------------------------------------------------------------
CREATE TABLE users (
  id           INT UNSIGNED     NOT NULL AUTO_INCREMENT,
  role_id      TINYINT UNSIGNED NOT NULL,
  name         VARCHAR(100)     NOT NULL,
  email        VARCHAR(150)     NOT NULL,
  password     VARCHAR(255)     NOT NULL,  -- bcrypt hash
  is_active    TINYINT(1)       NOT NULL DEFAULT 1,
  created_at   DATETIME         NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at   DATETIME         NOT NULL DEFAULT CURRENT_TIMESTAMP
                                          ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_users_email (email),
  CONSTRAINT fk_users_role
    FOREIGN KEY (role_id) REFERENCES roles(id)
    ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- 3. PROJECTS
-- ------------------------------------------------------------
CREATE TABLE projects (
  id           INT UNSIGNED  NOT NULL AUTO_INCREMENT,
  title        VARCHAR(150)  NOT NULL,
  description  TEXT,
  status       ENUM('pending','in_progress','completed','cancelled')
                             NOT NULL DEFAULT 'pending',
  due_date     DATE,
  created_by   INT UNSIGNED  NOT NULL,   -- FK → superadmin que lo creó
  created_at   DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at   DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP
                                        ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  CONSTRAINT fk_projects_creator
    FOREIGN KEY (created_by) REFERENCES users(id)
    ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB;

-- ------------------------------------------------------------
-- 4. PROJECT ASSIGNMENTS  (usuario ↔ proyecto)
-- ------------------------------------------------------------
CREATE TABLE project_assignments (
  id            INT UNSIGNED  NOT NULL AUTO_INCREMENT,
  project_id    INT UNSIGNED  NOT NULL,
  user_id       INT UNSIGNED  NOT NULL,
  assigned_by   INT UNSIGNED  NOT NULL,   -- FK → superadmin
  completed     TINYINT(1)    NOT NULL DEFAULT 0,
  completed_at  DATETIME,
  assigned_at   DATETIME      NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY uq_assignment (project_id, user_id),   -- un usuario no se asigna dos veces al mismo proyecto
  CONSTRAINT fk_pa_project
    FOREIGN KEY (project_id)  REFERENCES projects(id)
    ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT fk_pa_user
    FOREIGN KEY (user_id)     REFERENCES users(id)
    ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT fk_pa_assigned_by
    FOREIGN KEY (assigned_by) REFERENCES users(id)
    ON UPDATE CASCADE ON DELETE RESTRICT
) ENGINE=InnoDB;