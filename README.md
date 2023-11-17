# aws-node-culqi

Back end de la API de tokenización de tarjetas en serverless framework.

## Prerrequisitos

Asegúrate de tener instalado lo siguiente en tu máquina:

- Node.js y npm
- Docker
- Docker Compose

## Instalación

Sigue estos pasos para instalar el proyecto:

1. Clona el repositorio en tu máquina local usando `git clone https://github.com/FernandoCandela/aws-node-culqi.git`.
2. Navega al directorio del proyecto con `cd aws-node-culqi`.
3. Instala las dependencias del proyecto con `npm install`.
4. Crea una copia del archivo `.env.example` y renómbralo a `.env`. Luego, rellena las variables de entorno necesarias.

## Ejecución local

Para ejecutar el proyecto localmente, utiliza: `npm run dev`.

Ahora, el servidor debería estar corriendo en `http://localhost:3000`.

## Pruebas

Para ejecutar las pruebas, utiliza `npm run test:coverage`.

## Despliegue de Stack en AWS

Para desplegar el proyecto, usa el siguiente comando: `npm run deploy`.

## Remover Stack en AWS

Para remover el stack de aws, usa el siguiente comando: `npm run remove`.
