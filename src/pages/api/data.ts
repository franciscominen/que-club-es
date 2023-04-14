import { NextApiRequest, NextApiResponse } from "next";
import api from "./api";

const USERNAME = 'miusuario';
const PASSWORD = 'mipassword';
const AUTH_HEADER = `Basic ${Buffer.from(`${USERNAME}:${PASSWORD}`).toString('base64')}`;

function authenticate(req: NextApiRequest) {
    const authHeader = req.headers.authorization;

    if (!authHeader || authHeader !== AUTH_HEADER) {
        return false;
    }

    return true;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const isAuthenticated = authenticate(req);

    if (!isAuthenticated) {
        res.status(401).send('Acceso no autorizado');
        return;
    }

    const datos = await api.setFiveRandomTeams();

    res.status(200)
        .setHeader('Clear-Storage', 'true')
        .json(datos);
}

/* import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import api from "./api";
import { User } from "lib/types";

// Define una interfaz personalizada que extienda NextApiRequest e incluya la propiedad user
interface CustomApiRequest extends NextApiRequest {
    user?: User;
}

// Clave secreta para firmar y verificar los tokens JWT
const secretKey = "claveSecretaSuperSegura";

// Función para generar un token JWT
function generateToken(user: User): string {
    // Crear el payload del token
    const payload = {
        sub: user.id,
        username: user.username,
        role: user.role,
        // Agregar otras propiedades necesarias
    };

    // Crear y firmar el token JWT con la clave secreta
    return jwt.sign(payload, secretKey, { expiresIn: "1h" });
}

// Middleware para verificar la validez del token JWT en las solicitudes
function verifyToken(
    req: CustomApiRequest, // Usar la interfaz personalizada aquí
    res: NextApiResponse,
    next: () => void
): void {
    const token = req.headers.authorization;

    if (!token) {
        return res
            .status(401)
            .send("No se proporcionó un token de autenticación");
    }

    try {
        // Verificar y decodificar el token JWT
        const decoded = jwt.verify(token, secretKey);

        // Agregar el objeto decodificado al objeto de solicitud para su uso posterior
        req.user = decoded as User;
        next();
    } catch (error) {
        return res.status(401).send("Token de autenticación inválido");
    }
}

// Ruta para generar un token JWT después de la autenticación exitosa
export async function loginHandler(
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> {
    const { username, password } = req.body;

    // Validar las credenciales del usuario en la base de datos o cualquier otro almacenamiento de datos
    const user = await api.getUser(username, password);

    if (!user) {
        return res.status(401).send("Nombre de usuario o contraseña incorrectos");
    }

    // Generar un nuevo token JWT con los detalles del usuario y enviarlo al cliente
    const token = generateToken(user);
    res.json({ token });
}

// Ruta protegida con autenticación JWT
export default async function dataHandler(
    req: CustomApiRequest, // Usar la interfaz personalizada aquí
    res: NextApiResponse
): Promise<void> {
    try {
        // Verificar la validez del token JWT antes de permitir el acceso a la ruta
        verifyToken(req, res, async () => {
            const datos = await api.setFiveRandomTeams();
            res.status(200)
                .setHeader("Clear-Storage", "true")
                .json(datos);
        });
    } catch (error) {
        res.status(500).send("Error al obtener los datos");
    }
}
 */