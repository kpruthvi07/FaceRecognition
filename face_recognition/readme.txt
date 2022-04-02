
1. Run pip install -r requirements.txt from the cmd at the specified location.

2. For migrating django auth table - python manage.py makemigrations
3. For migrating django auth table  - python manage.py migrate

4. For creating superuser - python manage.py createsuperuser

5. For migrating accounts app tables - python manage.py makemigrations accounts
6. For migrating accounts app tables - python manage.py migrate accounts

7. For migrating blog app tables - python manage.py makemigrations blog
8. For migrating blog app tables - python manage.py migrate blog

9. For running the application - python manage.py runserver

10. Have run daily script for working days
    - open cmd and run python manage.py shell
    - from accounts.script import * and hit enter
    - markWorkingDayAttendance() and hit enter

