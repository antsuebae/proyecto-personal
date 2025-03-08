import express from "express";
import cors from "cors";
import axios from "axios";
import FormData from "form-data";
import open from "open";
import path from "path";
import 'dotenv/config';

const credentials = process.env.IDEALISTA_CREDENTIALS;

const app = express();
const PORT = 3000;

app.use(cors({ origin: "*" }));
app.use(express.json()); // Para parsear JSON en las solicitudes

// Función para obtener el token de acceso
async function getAccessToken(credentials) {
    const url = "https://api.idealista.com/oauth/token";

    const data = new URLSearchParams();
    data.append("grant_type", "client_credentials");
    data.append("scope", "read");

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Authorization": `Basic ${credentials}`,
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: data
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const responseData = await response.json();
        return responseData.access_token;
    } catch (error) {
        console.error("Error al obtener el access token:", error);
        throw error;
    }
}

// Función para buscar propiedades
async function searchProperties(accessToken, searchParams) {
    const url = "https://api.idealista.com/3.5/es/search";

    // Crear el objeto FormData con los parámetros de búsqueda
    const formData = new FormData();
    formData.append("center", searchParams.center);
    formData.append("propertyType", searchParams.propertyType);
    formData.append("distance", searchParams.distance);
    formData.append("operation", searchParams.operation);
    formData.append("maxPrice", searchParams.maxPrice);
    formData.append("minSize", searchParams.minSize);

    try {
        const response = await axios.post(url, formData, {
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                ...formData.getHeaders() // Añadir las cabeceras de FormData
            }
        });

        return response.data; // Devolver los datos filtrados
    } catch (error) {
        console.error("Error en la solicitud:", error.response ? error.response.data : error.message);
        throw error;
    }
}
async function getCoordinates(street) {
    try {
        // Hacer una solicitud a la API de OpenStreetMap Nominatim
        const response = await axios.get("https://nominatim.openstreetmap.org/search", {
            params: {
                q: street, // La calle o dirección a buscar
                format: "json", // Formato de respuesta
                limit: 1, // Limitar a un resultado
            },
        });

        // Verificar si se encontraron resultados
        if (response.data.length === 0) {
            throw new Error("No se encontraron resultados para la calle proporcionada.");
        }

        // Obtener la latitud y longitud del primer resultado
        const { lat, lon } = response.data[0];

        // Devolver las coordenadas en el formato "latitud,longitud"
        return `${lat},${lon}`;
    } catch (error) {
        console.error("Error al buscar coordenadas:", error.message);
        throw error;
    }
}

// Ruta para buscar coordenadas
app.get("/search-coordinates", async (req, res) => {
    const { street } = req.query; // Obtener la calle desde los parámetros de la URL

    if (!street) {
        return res.status(400).json({ error: "El parámetro 'street' es requerido." });
    }

    try {
        const coordinates = await getCoordinates(street);
        res.json({ coordinates });
    } catch (error) {
        res.status(500).json({ error: "Error al buscar coordenadas." });
    }
});

// Ruta para manejar la búsqueda
app.post("/search", async (req, res) => {
    try {
        const accessToken = await getAccessToken(credentials); // Obtener el accessToken
        const searchParams = req.body; // Obtener los parámetros de búsqueda del cuerpo de la solicitud

        const results = await searchProperties(accessToken, searchParams); // Realizar la búsqueda
        res.json(results); // Enviar los resultados como JSON
    } catch (error) {
        res.status(500).json({ error: "Error al realizar la búsqueda" });
    }
});

app.use(express.static("public"));

// Ruta principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use("/", express.static("./public"));

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    // Abrir el archivo index.html en el navegador predeterminado
    open(`http://localhost:${PORT}`)
        .then(() => console.log(`Navegador abierto automáticamente en http://localhost:${PORT}`))
        .catch((err) => console.error("No se pudo abrir el navegador:", err));
});