
# Gestión Agentes TR/PF

Aplicación web SPA desarrollada para facilitar la gestión de agentes mediante informes de distintas areas de negocio como es TR o PF.

Informes integrados:

+ Cobranzas agentes TR/PF
+ Siniestros agentes PF

## 0.- Rutas

_Rutas disponibles para ingresar segun desarrollos ya realizados:_

|                  Rutas                 |                   Descripción                 |
| -------------------------------------- | --------------------------------------------- |
| `/cobranza-agente/[codAgente]`         | Información de pólizas pendientes de pago.    |
| `/siniestros-pf/[codAgente]`           | Información de siniestro por póliza.          |

## 1.- Pre-requisitos

* Node.js
* Angular-Cli >= 11.0.2
* Visual Studio Code (o equivalente)

## 2.- Desarrollo

_Para desarrollar es necesario realizar la siguiente configuración una vez clonado el repo:_

* Restaurar paquetes del proyecto `npm install`
* Ejecutar `ng serve` para el servidor de dev, ira a `http://localhost:4200/[ruta-informe]`

## 3.- Generar artefactos para producción

* Ejecute `ng build --prod` para generar los artefatos en la carpeta `dist/`

## 3.1.- Deploy IIS

* Deploy en `IIS`, se debe generar aplicación en `IIS` y agregar archivo de `web.config` a la raiz de la app angular.
* (para trabajar en localhost) instalar URLRewrite para `IIS`, [URL Rewrite](https://www.iis.net/downloads/microsoft/url-rewrite)
* Editar en `index.html` `<base href="/nombre-del-proyecto/">` agregar nombre de app de IIS.
* Editar en `web.config` `<action type="Rewrite" url="/nombre-del-proyecto/" />` agregar nombre de app de IIS.

## 4.- Equipo contacto

* canalesejecutivos@zurich.com
* equipoplanex@webchilena.cl
