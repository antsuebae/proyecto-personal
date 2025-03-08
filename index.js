import express from "express";
import cors from "cors";
import axios from "axios";
import FormData from "form-data";
import open from "open";
import path from "path";

const app = express();
const PORT = 3000;

app.use(cors({ origin: "*" }));
app.use(express.json()); // Para parsear JSON en las solicitudes

// Credenciales de Idealista
const IDEALISTA_API_KEY = "rz2v676jiatynq34z3t3fc0f0yvv1aup";
const IDEALISTA_SECRET = "PUQe1pSbsa2y";
const IDEALISTA_OAUTH_URL = "https://api.idealista.com/oauth/token";
const IDEALISTA_SEARCH_URL = "https://api.idealista.com/3.5/es/search";

// Función para obtener el token de acceso
async function getAccessToken() {
    const url = "https://api.idealista.com/oauth/token";
    const credentials = "cnoydjY3NmppYXR5bnEzNHozdDNmYzBmMHl2djFhdXA6UFVRZTFwU2JzYTJ5"; // Codificado en Base64

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

// Ruta para manejar la búsqueda
app.post("/search", async (req, res) => {
    try {
        const accessToken = await getAccessToken(); // Obtener el accessToken
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