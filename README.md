# Proyecto de Tienda Online con React y Firebase

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

Este proyecto utiliza variables de entorno para manejar las credenciales de Firebase de manera segura. Las variables deben ser configuradas en un archivo `.env` con los siguientes valores:

```env
VITE_API_KEY=tu_api_key_aqui
VITE_AUTH_DOMAIN=tu_auth_domain_aqui
VITE_PROJECT_ID=tu_project_id_aqui
VITE_STORAGE_BUCKET=tu_storage_bucket_aqui
VITE_MESSAGING_SENDER_ID=tu_messaging_sender_id_aqui
VITE_APP_ID=tu_app_id_aqui
VITE_MEASUREMENT_ID=tu_measurement_id_aqui
