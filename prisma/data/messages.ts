import { Prisma } from '@prisma/client'

export const messages: Prisma.MessageCreateManyInput[] = [
  {
    content: 'Que es React?',
    role: 'user',
    sessionId: 1,
  },
  {
    content:
      'React es una **biblioteca de JavaScript** utilizada para construir **interfaces de usuario**, principalmente para aplicaciones web. Imagina que quieres construir una página web compleja con muchos elementos interactivos, como botones, formularios y listas que se actualizan constantemente. React te ayuda a organizar y gestionar eficientemente todos esos componentes.\n\nEn lugar de actualizar toda la página cada vez que algo cambia, React solo actualiza las partes específicas que necesitan ser modificadas. Esto hace que las aplicaciones sean **más rápidas y eficientes**.\n\nPiensa en ello como construir con bloques de LEGO. Cada componente de la interfaz de usuario es un bloque, y React te permite combinarlos y reutilizarlos para crear interfaces complejas de manera sencilla.\n\nEn resumen, React facilita la creación de interfaces de usuario interactivas y dinámicas para aplicaciones web.\n',
    role: 'assistant',
    sessionId: 1,
  },
  {
    content: 'Dame de ejemplo de el código de un componente',
    role: 'user',
    sessionId: 1,
  },
  {
    content:
      '```jsx\nfunction Bienvenida(props) {\n  return <h1>Hola, {props.nombre}</h1>;\n}\n\nconst elemento = <Bienvenida nombre="Usuario" />;\n\n// Renderiza el componente en un elemento con el id \'root\'\nconst root = ReactDOM.createRoot(document.getElementById(\'root\')); \nroot.render(elemento);\n\n\n```\n\n**Explicación:**\n\n* **`function Bienvenida(props)`:** Define una función llamada `Bienvenida`. Esta función representa nuestro componente. Recibe un objeto `props` (propiedades) como argumento. Las `props` son una forma de pasar datos a un componente.\n\n* **`return <h1>Hola, {props.nombre}</h1>;`:**  Esta línea describe lo que el componente renderizará en la pantalla. En este caso, un encabezado `<h1>` que muestra el texto "Hola," seguido del valor de `props.nombre`.  Las llaves `{}` se utilizan para insertar expresiones de JavaScript dentro del HTML (JSX).\n\n\n* **`const elemento = <Bienvenida nombre="Usuario" />;`:**  Crea un elemento React. Es como una instancia de nuestro componente `Bienvenida`, donde le pasamos  `"Usuario"` como valor para la propiedad `nombre`.\n\n\n* **`const root = ReactDOM.createRoot(document.getElementById(\'root\'));`**: Obtiene una referencia al elemento HTML con el id \'root\'. Este elemento sirve como contenedor para nuestra aplicación React.  Asegúrate de tener un elemento `<div id="root"></div>` en tu archivo HTML.\n\n\n* **`root.render(elemento);`:** Renderiza el elemento  (nuestro componente `Bienvenida`) dentro del contenedor `root`.  Esto hará que aparezca  "Hola, Usuario" en la página web.\n\n\nPara que este código funcione, necesitas incluir las bibliotecas de React y ReactDOM en tu archivo HTML\n\n\nEste es un ejemplo básico, pero ilustra la estructura fundamental de un componente en React: una función que acepta propiedades y devuelve lo que se mostrará en la pantalla.  Los componentes pueden ser mucho más complejos, incluyendo lógica, eventos y otros componentes anidados.\n',

    role: 'assistant',
    sessionId: 1,
  },
]
