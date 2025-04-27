for development, launch the site using python: 
python ./site_1.py

for production the dockerfile includes a gunicorn installation that runs through wsgi.py
CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:5000", "wsgi:app"]

its hosted on port 5000:
http://127.0.0.1:5000/

I've learned I have to have docker execute the wsgi file for gunicorn to play nice with nginx HTTPS implementation
Note to self: Add QR Code to LinkedIn  / link to LinkedIn

.env file is in the gitignore.

Update: I've created scripts to automate updating the docker container and implementation. 
To deploy on a server: use the startSite script which updates the docker image to the latest version and refreshes the existing docker image
To test locally use python environment to install the modules and run the python program directly. 