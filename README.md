# 🚀 Proyecto Personal

## 📌 Descripción  
Este es un proyecto Node.js que utiliza Express, Axios y otras librerías para realizar operaciones web, manejar datos y más.  

---

## 🛠 Requisitos Previos  

### 1️⃣ **Instalar Node.js y Git**  
- **Descargar e instalar Node.js**: [https://nodejs.org/](https://nodejs.org/)  
- **Descargar e instalar Git**: [https://git-scm.com/downloads](https://git-scm.com/downloads)  

En **Linux/macOS**, puedes instalarlo con:  
```sh
sudo apt update && sudo apt install -y nodejs npm git   # Ubuntu/Debian
sudo yum install -y nodejs npm git                      # CentOS
brew install node git                                   # macOS
```

### 2️⃣ **Clonar el Repositorio**  
```sh
git clone https://github.com/tu-usuario/proyecto-personal.git
cd proyecto-personal
```

---

## 🚀 Instalación y Ejecución  

### 🔹 **Método Automático (Recomendado)**  
Ejecuta el script de instalación según tu sistema operativo:  

- **Linux/macOS(dentro de linux-mac)**:  
  ```sh
  bash install.sh
  ```
- **Windows(dentro de windows)**:  
  ```sh
  install.bat
  ```

### 🔹 **Método Manual (Alternativa)**  
Si prefieres instalar las dependencias manualmente, usa:  
```sh
npm install axios@1.8.2 cheerio@1.0.0 cors@2.8.5 date-fns@4.1.0 dotenv@16.4.7 express@4.21.2 form-data@4.0.2 fs@0.0.1-security helmet@8.0.0 node-fetch@3.3.2 path@0.12.7 request@2.88.2
```

### 🔹 **Ejecutar el Proyecto**  
```sh
npm start
```
Esto iniciará el servidor en el puerto **3000** (o el que hayas configurado).

---

## 🎯 Uso del Proyecto  

Este proyecto usa **Express** para manejar rutas. A continuación, te explicamos cómo usarlo.

### 📌 **Iniciar el Servidor**  
Para arrancar el servidor, usa:  
```sh
npm start
```
Por defecto, estará corriendo en **http://localhost:3000**.

---

## ❌ Posibles Errores y Soluciones  

### ⚠️ **Error: "npm command not found"**  
💡 **Solución:**  
Asegúrate de que Node.js está instalado ejecutando:  
```sh
node -v && npm -v
```
Si no están instalados, revisa la sección de **Requisitos Previos**.

---

### ⚠️ **Error: "express module not found"**  
💡 **Solución:**  
Asegúrate de instalar las dependencias correctamente:  
```sh
npm install
```

---

### ⚠️ **Error: "EADDRINUSE: Address already in use"**  
💡 **Solución:**  
El puerto 3000 ya está en uso. Puedes detener el proceso con:  
```sh
lsof -i :3000   # Linux/macOS
kill -9 <PID>   # Linux/macOS
netstat -ano | findstr :3000   # Windows
taskkill /PID <PID> /F   # Windows
```
O cambiar el puerto en `index.js`:
```js
const PORT = process.env.PORT || 4000;
```
Ejecuta nuevamente el proyecto:
```sh
npm start
```

---

## 📜 Dependencias Principales  
Este proyecto usa las siguientes librerías de Node.js:  

| Paquete      | Versión  | Descripción |
|-------------|---------|-------------|
| axios       | 1.8.2   | Cliente HTTP para hacer solicitudes a APIs. |
| cheerio     | 1.0.0   | Análisis y manipulación de HTML similar a jQuery. |
| cors        | 2.8.5   | Habilita CORS para permitir solicitudes entre dominios. |
| date-fns    | 4.1.0   | Librería para manejo de fechas en JavaScript. |
| dotenv      | 16.4.7  | Carga variables de entorno desde un archivo `.env`. |
| express     | 4.21.2  | Framework para crear servidores web con Node.js. |
| form-data   | 4.0.2   | Manejo de formularios y subida de archivos. |
| fs          | 0.0.1   | Módulo para manejo del sistema de archivos. |
| helmet      | 8.0.0   | Añade seguridad a la aplicación Express. |
| node-fetch  | 3.3.2   | Cliente HTTP similar a `fetch` en el navegador. |
| path        | 0.12.7  | Herramientas para manejar rutas de archivos y directorios. |
| request     | 2.88.2  | (Obsoleto) Cliente HTTP alternativo a `axios`. |

---

## 📌 Autor  
📍 **Tu Nombre** - [GitHub](https://github.com/tu-usuario)  

---

## 📝 Licencia  
Este proyecto está bajo la licencia **MIT**. Puedes usarlo y modificarlo libremente.  

