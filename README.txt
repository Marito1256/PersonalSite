for development, launch the site using python: 
python ./site_1.py

for production the dockerfile includes a gunicorn installation that runs through wsgi.py
CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:5000", "wsgi:app"]

its hosted on port 5000:
http://127.0.0.1:5000/

I've learned I have to have docker execute the wsgi file for gunicorn to play nice with nginx HTTPS implementation
Add QR Code to LinkedIn  / link to LinkedIn
