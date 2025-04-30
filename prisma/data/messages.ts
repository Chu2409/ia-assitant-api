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
    content: 'Dame de ejemplo de el código de un componente',
    role: 'assistant',
    sessionId: 1,
  },
]
