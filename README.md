# Proyecto de Tienda Online con React y Firebase


Este proyecto es una tienda online construida con **React** y **Firebase**. Permite a los usuarios explorar productos, añadirlos al carrito, y proceder con el pago mediante una interfaz sencilla y funcional. La aplicación también está integrada con **Firestore** de Firebase para almacenar datos sobre productos y registrar las órdenes de compra.

**Tecnologías Utilizadas**:

- **React**: Librería para construir la interfaz de usuario.
- **Firebase**: Utilizado para la base de datos (Firestore), autenticación y almacenamiento.
- **React Router**: Para la navegación entre las diferentes páginas.
- **React Context**: Para la gestión del estado global, como el carrito de compras.
- **CSS**: Estilización de la aplicación.
- **Vite**: Herramienta para compilar el proyecto.

## Características

### 🚀 Funcionalidades Principales

- **Visualización de productos**: Los usuarios pueden ver una lista de productos que se obtienen desde Firebase Firestore, con detalles como nombre, precio, descripción, imagen y stock disponible.
- **Filtrar productos**: Los usuarios pueden filtrar productos por categorías.
- **Agregar al carrito**: Los usuarios pueden agregar productos al carrito, elegir la cantidad y ver un resumen de su compra.
- **Proceso de checkout**: Los usuarios pueden completar su compra proporcionando su nombre y dirección de envío.
- **Base de datos Firebase**: La información de los productos se guarda en **Firestore**, mientras que las compras se almacenan en una colección de "ordenes".
- **Notificaciones de éxito**: Después de completar la compra, los usuarios recibirán una notificación de éxito usando `react-toastify`.

### 💡 Características en Desarrollo

- **Autenticación de usuario**: Se planea implementar la autenticación de usuarios mediante Firebase Authentication para una experiencia de usuario más personalizada.
- **Pago**: Actualmente en desarrollo, se integrará una pasarela de pagos como **Stripe** o **PayPal** para permitir a los usuarios realizar pagos en línea de manera segura.

## Pre-requisitos

Antes de ejecutar este proyecto, asegúrate de tener instalados los siguientes programas:

- **Node.js**: Asegúrate de tener instalada la última versión de [Node.js](https://nodejs.org/).
- **Firebase**: Debes tener una cuenta de Firebase y haber creado un proyecto para usar **Firestore**.

## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/JesMedC/proyecto-react-entrega-final-Jesus-Medina.git

## Autor 
@JesusMedina
=======
Este proyecto es una tienda online construida con **React** y **Firebase**. Permite a los usuarios explorar productos, añadirlos al carrito, y proceder con el pago mediante una interfaz sencilla y funcional. La aplicación también está integrada con **Firestore** de Firebase para almacenar datos sobre productos, y utiliza las **variables de entorno** para proteger las credenciales de Firebase.

## Funcionalidades

- **Visualización de productos**: Los usuarios pueden ver detalles de productos desde una base de datos en Firestore.
- **Agregar productos al carrito**: Los usuarios pueden seleccionar productos y agregar la cantidad deseada al carrito de compras.
- **Checkout**: Los usuarios pueden completar su compra, rellenando sus datos de envío y realizando el pago.
- **Integración con Firebase**: La aplicación utiliza Firestore para almacenar los productos y registrar las órdenes de compra.

## Tecnologías utilizadas

- **React**: Librería para construir la interfaz de usuario.
- **Firebase**: Utilizado para la base de datos (Firestore), autenticación y almacenamiento.
- **React Router**: Para la navegación entre las diferentes páginas.
- **React Context**: Para la gestión del estado global, como el carrito de compras.
- **CSS**: Estilización de la aplicación.
- **Vite**: Herramienta para compilar el proyecto.

## Variables de Entorno

Este proyecto utiliza variables de entorno para manejar las credenciales de Firebase de manera segura. Las variables deben ser configuradas en un archivo `.env` 


