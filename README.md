# bank-clients

## Configuración del ambiente de desarrollo
### Proceso de instalación
1. Instalar Node.js 10.0.0 o superior con NPM 6.10.0 o superior.
2. Instalar dependencias. Desde una terminal en la raíz del proyecto ejecutar:
```
npm i -g @angular/cli
npm i -g ionic
npm i
```
3. Ejecutar el servidor de desarrollo de ionic:
```
ionic serve
```

## Sustentación de diseño
### Validación de unicidad de identificación
Para validar que al registrar un cliente del banco no se repita una identificación que ya esté en guardada en el servidor, fue necesario obtener y recorrer en memoria todos los clientes con typescript desde el navegador.

Esto podría cambiarse a un query de Firebase como `https://testbankapi.firebaseio.com/clients.json?orderBy="identification"&equalTo="34523453"`. Para esto es necesario cambiar primero la configuración de la base de datos de Firebase para indexar el diccionario `clients.json` por `identification`. Ver https://firebase.google.com/docs/database/security/indexing-data.

Otra alternativa sería validar la unicidad del atributo `identification` desde Firebase. Ver https://firebase.google.com/docs/database/security/securing-data#read_and_write_rules_cascade.