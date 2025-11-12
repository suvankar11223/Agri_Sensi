# AgriSync Authentication & Database Fix TODO

## Current Status
- [x] Analysis completed - identified key issues with login/registration and MySQL setup
- [x] Plan approved by user

## Tasks to Complete

### Database & Backend Setup
- [x] Update MySQL schema to include password_hash column
- [x] Switch backend from SQLite to MySQL connection
- [x] Update requirements.txt for MySQL support (pymysql)
- [x] Install MySQL dependencies

### Authentication Flow Fixes
- [x] Fix registration to redirect to dashboard instead of login page
- [x] Fix login to redirect to dashboard instead of home page
- [x] Update header to display full name instead of username
- [x] Update AuthContext to handle dashboard redirects properly

### Testing & Validation
- [ ] Run MySQL schema in Workbench
- [ ] Test complete registration flow (register -> dashboard)
- [ ] Test complete login flow (login -> dashboard)
- [ ] Run full path testing to check all errors
- [ ] Verify user data is stored in MySQL agrisync database

## Current Status
✅ Backend is running on http://0.0.0.0:8000
✅ Database tables created successfully
✅ All authentication fixes implemented
⚠️ Frontend needs to be started manually (npm start in frontend directory)
⚠️ MySQL schema needs to be run in MySQL Workbench for production

## Files to Edit
- agrisync_mysql_schema.sql
- backend/database.py
- backend/requirements.txt
- backend/main.py
- frontend/src/context/AuthContext.js
- frontend/src/pages/RegisterPage.jsx
- frontend/src/pages/LoginPage.jsx
- frontend/src/pages/Header.jsx

## Notes
- Backend currently uses SQLite, need to switch to MySQL
- Registration currently redirects to /LoginPage, should redirect to dashboard
- Login currently redirects to '/', should redirect to dashboard
- Header shows username, should show full_name
- MySQL schema missing password_hash column required for auth
