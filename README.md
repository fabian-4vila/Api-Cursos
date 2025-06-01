#  ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white) Api Cursos

# API de Profesores, Estudiantes y Cursos

Esta API permite gestionar la información relacionada con profesores, estudiantes y cursos. Está desarrollada en Node.js con Express, Typescript y utiliza TypeORM para interactuar con la base de datos MySQL.


## **Instalación**

1. Clona el repositorio:
   ```bash
   git clone https://github.com/fabian-4vila/Api-Cursos.git
   cd Api-Cursos
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Configura la conexión a la base de datos en el archivo `src/database/connection.ts`:
   ```typescript
   import { DataSource } from "typeorm";

   export const AppDataSource = new DataSource({
       type: "mysql",
       host: "localhost",
       port: 3306,
       username: "tu_usuario",
       password: "tu_contraseña",
       database: "nombre_base_datos",
       entities: [Estudiante,Profesor,Curso],
       synchronize: true
   });
   ```

4. Ejecuta el servidor:
   ```bash
   npm run dev
   ```
   El servidor se iniciará en `http://localhost:3000`.
5. estructura 
.
├── build/                            # Carpeta generada, probablemente por TypeScript
│   ├── controllers/                 # agregando-dependencia-nueva (4 months ago)
│   ├── models/                      # agregando-dependencia-nueva (4 months ago)
│   ├── routes/                      # agregando-dependencia-nueva (4 months ago)
│   ├── app.js                       # agregando-dependencia-nueva (4 months ago)
│   └── index.js                     # agregando-dependencia-nueva (4 months ago)
│
├── src/                              # Código fuente en TypeScript
│   ├── controllers/                 # mejorando-controllers (4 months ago)
│   ├── models/                      # controller-Cursos (4 months ago)
│   ├── routes/                      # prueba-ts (4 months ago)
│   ├── app.ts                       # modificando-controllers (4 months ago)
│   └── index.ts                     # modificando-controllers (4 months ago)
│
├── .gitignore                        # cambio-gitignore (4 months ago)
├── README.md                         # Update README.md (last week)
├── package-lock.json                 # agregando-dependencia-nueva (4 months ago)
├── package.json                      # agregando-dependencia-nueva (4 months ago)
└── tsconfig.json                     # (commit no especificado)


## **Modelos**

### **Profesor**
- `id`: Identificador único (número).
- `nombre`: Nombre del profesor (cadena).
- `apellido`: Apellido del profesor (cadena).
- `email`: Correo electrónico (cadena).
- Relación con cursos.
---
### **Estudiante**
- `id`: Identificador único (número).
- `dni`: Documento de identificación (cadena).
- `nombre`: Nombre del estudiante (cadena).
- `apellido`: Apellido del estudiante (cadena).
- `email`: Correo electrónico (cadena).
- Relación con cursos.
---
### **Curso**
- `id`: Identificador único (número).
- `nombre`: Nombre del curso (cadena).
- `descripcion`: Descripción del curso (cadena).
- `profesor`: Relación con un profesor.
- `estudiantes`: Relación con varios estudiantes.

## **Endpoints**
### **Rutas de Cursos**
---
| Método | Ruta                         | Descripción                        |
|--------|------------------------------|------------------------------------|
| GET    | `/cursos`                   | Consultar todos los cursos.       |
| POST   | `/cursos`                   | Crear un nuevo curso.             |
| GET    | `/cursos/:id`               | Consultar detalles de un curso.   |
| PUT    | `/cursos/:id`               | Actualizar un curso.              |
| DELETE | `/cursos/:id`               | Eliminar un curso.                |
| POST   | `/cursos/registraEstudiante`| Asociar un estudiante a un curso. |
### **Rutas de Estudiantes**
---
| Método | Ruta                | Descripción                        |
|--------|---------------------|------------------------------------|
| GET    | `/estudiantes`      | Consultar todos los estudiantes.  |
| POST   | `/estudiantes`      | Crear un nuevo estudiante.        |
| GET    | `/estudiantes/:id`  | Consultar detalles de un estudiante. |
| PUT    | `/estudiantes/:id`  | Actualizar un estudiante.         |
| DELETE | `/estudiantes/:id`  | Eliminar un estudiante.           |
### **Rutas de Profesores**
---
| Método | Ruta               | Descripción                       |
|--------|--------------------|-----------------------------------|
| GET    | `/profesores`      | Consultar todos los profesores.  |
| POST   | `/profesores`      | Crear un nuevo profesor.         |
| GET    | `/profesores/:id`  | Consultar detalles de un profesor. |
| PUT    | `/profesores/:id`  | Actualizar un profesor.          |
| DELETE | `/profesores/:id`  | Eliminar un profesor.            |


## **Ejemplos de Uso**

### Crear un Curso
**Request:**
```json
POST /cursos
{
  "nombre": "Matemáticas Avanzadas",
  "descripcion": "Curso para aprender cálculo avanzado",
  "profesor": 1
}
```

**Response:**
```json
{
  "id": 1,
  "nombre": "Matemáticas Avanzadas",
  "descripcion": "Curso para aprender cálculo avanzado",
  "profesor": 1
}
```

### Asociar un Estudiante a un Curso
**Request:**
```json
POST /cursos/registraEstudiante
{
  "curso_id": 1,
  "estudiante_id": 2
}
```

**Response:**
```json
{
  "message": "Estudiante asociado al curso exitosamente."
}
```


## **Tecnologías Utilizadas**

- Node.js
- Typescript
- Express
- TypeORM
- MySQL

## **Próximos Pasos**
- Implementar autenticación y autorización.
- Agregar validaciones más robustas en los datos de entrada.
- Crear documentación interactiva con Swagger.

