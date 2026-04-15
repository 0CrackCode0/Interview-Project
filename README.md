# Interview-Project

Setup Instructions -
Download and extract the project folder.
Open the project in your code editor.
Navigate to the frontend directory: cd frontend
run command : npm i
run command : cd ..
run command : python manage.py runserver
if needed create build once npm run build in frontend folder.


PROJECT MANAGEMENT SYSTEM (DJANGO + REACT)

----------------------------------------
 PROJECT OVERVIEW
----------------------------------------
This is a full-stack Project Management System built using:

- Backend: Django + Django REST Framework
- Frontend: React (Vite)
- Authentication: JWT (SimpleJWT)
- Styling: Bootstrap (CDN)

Features:
- User Registration & Login
- Create, Update, Delete Projects
- Create, Update, Delete Tasks
- Mark tasks as completed
- Project-wise task management

----------------------------------------
 BACKEND SETUP (DJANGO)
----------------------------------------

1. Go to project root folder:

   cd "Project Management"

2. Create virtual environment:

   python -m venv venv
   venv\Scripts\activate   (Windows)

3. Install dependencies:

   pip install django djangorestframework djangorestframework-simplejwt corsheaders

4. Run migrations:

   python manage.py migrate

5. Start server:

   python manage.py runserver

Backend runs on:
http://127.0.0.1:8000/

Django Admin : Username : Admin , Passport : Admin
http://127.0.0.1:8000/admin

----------------------------------------
  FRONTEND SETUP (REACT)
----------------------------------------

1. Go to frontend folder:

   cd frontend

2. Install dependencies:

   npm install

3. Run frontend:

   npm run dev

Frontend runs on:
http://localhost:5173/

----------------------------------------
🔗 API ENDPOINTS
----------------------------------------

Login:
POST /api/login/

Register:
POST /api/register/

Projects:
GET    /api/projects/
POST   /api/projects/
PUT    /api/projects/{id}/
DELETE /api/projects/{id}/

Tasks:
GET    /api/projects/{project_id}/tasks/
POST   /api/projects/{project_id}/tasks/
PATCH  /api/projects/{project_id}/tasks/{id}/
DELETE /api/projects/{project_id}/tasks/{id}/

----------------------------------------
 AUTHENTICATION
----------------------------------------

- Uses JWT authentication
- Tokens stored in localStorage
- Required for all project & task APIs

----------------------------------------
 BUILD FRONTEND FOR PRODUCTION
----------------------------------------

1. Go to frontend:

   cd frontend

2. Build project:

   npm run build

3. Copy files:

   - Copy dist/index.html → backend/templates/
   - Copy dist/assets/ → backend/static/assets/

4. Update index.html:

   Use Django static tag:

   {% load static %}
   <script type="module" src="{% static 'assets/index-xxxx.js' %}"></script>

----------------------------------------
RUN FULL PROJECT (DJANGO SERVES FRONTEND)
----------------------------------------

1. Make sure:

   - index.html is inside templates/
   - JS files are inside static/assets/

2. Run Django:

   python manage.py runserver

3. Open:

   http://127.0.0.1:8000/

----------------------------------------
 DEPLOYMENT (RECOMMENDED: RENDER)
----------------------------------------

1. Push project to GitHub

2. Create account on Render

3. Create new Web Service

4. Add:

   Build Command:
   bash build.sh

   Start Command:
   gunicorn backend.wsgi:application

5. Add build.sh file:

   pip install -r requirements.txt
   python manage.py collectstatic --noinput
   python manage.py migrate

6. Set in settings.py:

   DEBUG = False
   ALLOWED_HOSTS = ['*']

7. Deploy

Live URL:
https://your-app-name.onrender.com  // I just removed the project from render as i was getting some errors.

----------------------------------------
 IMPORTANT NOTES
----------------------------------------

- Always run "npm run build" before deployment
- Do NOT run React dev server in production
- Ensure static files are properly configured
- Use re_path for React routing in Django:

  re_path(r'^.*$', index)

----------------------------------------
DEVELOPER
----------------------------------------

Designed and Developed by Abdul Ahad
© 2026 All Rights Reserved
0ab.ahad0@gmail.com

----------------------------------------

0ab.ahad0@gmail.com
