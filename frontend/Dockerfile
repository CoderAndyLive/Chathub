# frontend/Dockerfile

# Verwende das offizielle Node.js-Image, um die Anwendung zu bauen
FROM node:14 AS build

# Setze das Arbeitsverzeichnis
WORKDIR /app

# Kopiere die package.json und die package-lock.json (falls vorhanden)
COPY package*.json ./

# Installiere die Abhängigkeiten
RUN npm install

# Kopiere den Rest des Codes in das Containerverzeichnis
COPY . .

# Baue die Anwendung (falls notwendig, z.B. für React)
# In diesem Fall ist es nicht notwendig, da wir nur HTML, CSS und JS verwenden
# RUN npm run build

# Verwende ein leichtgewichtiges Nginx-Image, um die Anwendung bereitzustellen
FROM nginx:alpine

# Kopiere die gebauten Dateien ins Nginx-Verzeichnis
COPY --from=build /app /usr/share/nginx/html

# Exponiere den Port 80
EXPOSE 80

# Starte Nginx
CMD ["nginx", "-g", "daemon off;"]