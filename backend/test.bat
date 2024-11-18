

:: Activate the virtual environment
call venv\Scripts\activate

echo Virtual environment activated.

:: Start the Django development server in the background
start python manage.py runserver

:: Wait for the server to start (optional, you can adjust the time)

:: Open the browser to the Django server
start "" "http://127.0.0.1:8000"
