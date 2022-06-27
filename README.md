## Para iniciar el proyecto

Para crear las imágenes y los contenedores del proyecto, ejecutar desde el directorio raiz:

```
$ docker-compose up
```

Para cargar los usuarios predeterminados en la base de datos, ejecutar en una nueva instancia del shell:

```
$ docker-compose exec api node seed.db.js
```

Por defecto el frontend estará disponible en: http://localhost:8888 y el backend en http://localhost:6868

### Si se requiere realizar cambios

Después de hacer un cambio en cualquiera de los tres servicios, se deben reconstruir las imágenes para reflejar los cambios.
Los nombres de los servicios son (como se especifica en docker-compose.yml):

- api
- ui
- mysqldb

Si se realiza un cambio en el frontend, se debería ejecutar:

```
$ docker-compose up -d --no-deps --build ui
```

## Puertos por defecto

Los puertos por defecto pueden cambiarse usando el archivo .env en el directorio raiz del proyecto.
