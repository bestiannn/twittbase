# TwittBase Tutorial

## Clonar repositorio
Si quieres implementar este proyecto en tu máquina local, sigue los siguientes pasos:

1. Clona el repositorio
```bash
git clone https://github.com/bestiannn/twittbase
```

2. Ve al directorio recién creado, instala las dependencias
```bash
cd twittbase
npm install
```

3. Crea un archivo .env en la raíz del proyecto y agrega las variables de entorno que te proporcionará el administrador de firebase, puedes copiar el contenido del archivo .env.example para tener una referencia de como debe quedar.

4. Inicia el servidor
```bash
npm run dev
```

5. Abre el navegador en la dirección http://localhost:5173

6. ¡Listo!

## Crear proyecto en FireBase

1. Crear proyecto en FireBase
2. Crear base de datos en FireBase
3. Crear cuenta de servicio en FireBase
4. Crear archivo de configuración en FireBase
5. Crear archivo de configuración en el proyecto

## Obtener variables de entorno en FireBase Console

1. Crear proyecto en Firebase

    - Ir a [FireBase Console](https://console.firebase.google.com/)
    - Ve a crear proyecto
    - Ingresa el nombre del proyecto
    - Habilita Google Analytics, si quieres
    - Crea el proyecto

2. Agregar Firebase a la app
    
    - Ve a agregar firebase a la web en la consola de firebase del proyecto recién creado
    - Agrega un nombre al proyecto y registra la app
    - Copia los valores de apiKey, authDomain, projectId, storageBucket, messagingSenderId y appId que se mostrarán ahora, y pegalos en el archivo .env (el cual deberías crear, puedes usar .env.example como base para copiar los datos)

3. Habilitar Firebase Authentication

    - Ve al apartado de autenticación en la consola de firebase del proyecto recién creado
    - Click en "Comenzar"
    - Selecciona "Correo electrónico/contraseña" y habilita la opcción
    - Agrega un proveedor nuevo, esta vez "Google"
    - Habilita el proveedor "Google", y configura su nombre publico del proyecto y el correo de asistencia


4. Crear base de datos en Firestore

    - Ve al apartado de Firestore en la consola de firebase del proyecto recién creado
    - Click en "Crear base de datos"
    - Selecciona entre modo de producción o modo de prueba (recomiendo modo de prueba si solo vas a usarlo en tu maquina local)
    - Selecciona una ubicación para tu base de datos
    - Una vez configurado esto, ir a la pestaña de "Índices"
    - Click en "Crear Índice"
    - En "ID de la colección" ingresa "tweets", en "Campos que se indexarán" ingresa "uid" como "Ascending", "createdAt" como "Descending", "\_\_name\_\_" como "Descending", en "Alcances de las consultas" selecciona "Colección", y finalmente en crear Índice
    - Espera a que se compile en Índice

5. Usa la web
    
    - Prueba crear una cuenta tanto con correo y contraseña como con una cuenta de Google
    - Prueba crear y borrar Tweets
    - Prueba cambiar el username
    - Prueba seguir y buscar otras cuentas (previamente creadas) 