# Well Pharma Backend

## Overview
This repository contains the backend code for the Well Pharma project. The backend is responsible for handling all the business logic, database interactions, and API endpoints for the frontend applications. It is built using Django and MySQL, providing a robust and scalable environment for managing the core functionalities of the Well Pharma platform.

## Features
- **Employee Management**: Register, login, and manage employee profiles.
- **Employer Management**: Handle job postings, candidate searches, and more.
- **Company Information**: Manage and retrieve company data.
- **Authentication**: Secure user authentication using JWT.
- **Data Integrity**: Validation and management of complex relationships between employees, companies, and job postings.

## Tech Stack
- **Framework**: [Django](https://www.djangoproject.com/)
- **Database**: [MySQL](https://www.mysql.com/)
- **Authentication**: JWT (JSON Web Tokens)
- **API Documentation**: [Django REST Framework](https://www.django-rest-framework.org/)
- **ORM**: Django ORM


## Enums Used
### class Situation(Enum):
      CONTRACT_END = "En Fin de Contrat"
      EMPLOYED= "En Poste"
      UNEMPLOYED= "Sans Emploi"

### class Gender(Enum):
      MALE = "Homme"
      FEMALE = "Femme"


### class NiveauLangue(Enum):
    BEGINNER  = "Débutant"
    INTERMEDIATE  = "Intermédiaire"
    ADVANCED  = "Avancé"
    FLUENT  = "Courant"
    NATIVE = "Natif"


### class Mobility(Enum):
      REGIONAL = "Régional"
      NATIONAL = "National"
      INTERNATIONAL = "International"

### class Job_level(Enum):
      BEGINNER_JUNIOR = 'debutant_junior'
      TEAM_LEADER = 'responsable_equipe'
      EXECUTIVE = 'cadre_dirigeant'
      INTERN_STUDENT = 'stagiaire_etudiant'
      MANAGER_DEPARTMENT_HEAD = 'manager_responsable_departement'
      CONFIRMED_EXPERIENCED = 'confirme_experimente'
      RECENT_GRADUATE = 'jeune_diplome'

### class Contract_type(Enum):
      Indefinite_term = 'CDI'
      Fixed_term = 'CDD'
      Mission = 'Mission'

## API Endpoints
### Employee Endpoints
1. **Register an Employee**
   - **Endpoint**: `POST /employes/`
   - **Description**: Registers a new employee and sends a confirmation code to their email.
   - **Response**: `201 Created` with a message indicating that a confirmation code has been sent.

2. **Retrieve Employee Details**
   - **Endpoint**: `GET /employes/{id}/`
   - **Description**: Retrieves detailed information about a specific employee, including education, experience, skills, and languages.
   - **Response**: `200 OK` with the employee's full profile.

3. **Confirm Employee Registration**
   - **Endpoint**: `POST /employes/confirm_registration/`
   - **Description**: Confirms an employee's registration using a confirmation code.
   - **Request Body**:
     - `code`: Confirmation code.
     - `email`: Employee's email.
   - **Response**: `200 OK` - Registration confirmed successfully.

4. **Login an Employee**
   - **Endpoint**: `POST /employes/login/`
   - **Description**: Authenticates an employee using their email and password. Returns JWT tokens and profile information.
   - **Response**: `200 OK` - Returns JWT tokens and employee profile.

### Employer Endpoints
(Provide a brief description of the endpoints related to employer functionalities if available.)

### Company Endpoints
(Provide a brief description of the endpoints related to company data management.)

## Models
### Profile
- **Description**: An abstract base class extending Django's `AbstractUser` model, using email as the username.
- **Fields**:
  - `email`: Employee's unique email address.
  - `phone_number`: Contact number.
  - `gender`: Gender of the employee.
  - `confirmation_code`: Code sent for email confirmation.
  - `is_confirmation_code_valid`: Method to check if the confirmation code is still valid.

### Employee
- **Description**: Extends the `Profile` model, including additional fields for employee-specific information such as CV, birth date, and job preferences.

### Experience
- **Description**: Stores work experience data for employees.
- **Fields**:
  - `employe`: ForeignKey to `Employee`.
  - `title`: Job title.
  - `company`: Company name.
  - `description`: Job role description.

(Include brief descriptions for other models like `Education`, `Skill`, `Language`, etc., based on the API documentation.)

## Getting Started

### Prerequisites
- Python 3.x
- Django 4.x
- MySQL 8.x
- [pip](https://pip.pypa.io/en/stable/)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/CodeIt-Dz/well-pharma-back
   cd well-pharma-backend
   ```
2. Create and activate a virtual environment (if not using Docker):

```bash
python -m venv env
source env/bin/activate  # On Windows use `env\Scripts\activate`
```
3. Install the dependencies (if not using Docker):

```bash
pip install -r requirements.txt
```

4. Set up the MySQL database:

Create a new MySQL database for the project.
Update the DATABASES setting in settings.py with your MySQL credentials.
Run database migrations:

```bash
python manage.py migrate
```
Create a superuser:
```bash
python manage.py createsuperuser
```
Run the development server:
```bash
python manage.py runserver
```
### Docker Setup
1. Build the Docker images:
```bash
docker-compose build
```
2. Start the containers:
```bash
docker-compose up -d
```
This will start the Django application and a MySQL database in separate containers. The application will be available at http://localhost:8000.

3. Apply database migrations:
```bash
docker-compose exec web python manage.py migrate
```
4. Create a superuser:
```bash
docker-compose exec web python manage.py createsuperuser
```
Running Tests
To run the test suite using Docker:

```bash
docker-compose exec web python manage.py test
```
## Deployment
The application can be deployed using Docker in any environment that supports Docker containers. You may want to use services like AWS ECS, Google Cloud Run, or a simple VPS with Docker installed.

## License
This project is licensed under the Proprietary License - Well Pharma. Please see the LICENSE file for more details.
