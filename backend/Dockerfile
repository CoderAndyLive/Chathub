# backend/Dockerfile

FROM php:7.4-apache

# Kopiere die PHP-Dateien in das Web-Verzeichnis
COPY . /var/www/html/

# Setze die Berechtigungen
RUN chown -R www-data:www-data /var/www/html