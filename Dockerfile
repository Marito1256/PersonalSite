# Use Python image
FROM python:3.10-slim

# Set working directory
WORKDIR /app

COPY requirements.txt .
# Install dependencies
RUN pip install --no-cache-dir flask gunicorn
RUN pip install -r requirements.txt

# Copy files to container
COPY . .

#Expose Flask's deafualt port
Expose 5000

# Run the Flask app with Gunicorn
CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:5000", "wsgi:app"]
