export const CATEGORIES = {
  income: [
    { value: 'web', label: 'Web Development', icon: '💻', desc: 'Sitios y apps web' },
    { value: 'design', label: 'UI/UX Design', icon: '🎨', desc: 'Diseño de interfaces' },
    { value: 'mobile', label: 'Mobile Apps', icon: '📱', desc: 'Apps móviles' },
    { value: 'consulting', label: 'Consultoría', icon: '💡', desc: 'Asesoría técnica' },
    { value: 'maintenance', label: 'Mantenimiento', icon: '🔧', desc: 'Soporte y updates' },
    { value: 'other_in', label: 'Otros', icon: '💰', desc: 'Varios' }
  ],
  expense: [
    { value: 'hosting', label: 'Hosting / Dominios', icon: '🌐', desc: 'Servidores y dominios' },
    { value: 'software', label: 'Software / SaaS', icon: '💼', desc: 'Licencias y herramientas' },
    { value: 'hardware', label: 'Hardware', icon: '⌨️', desc: 'Equipos y dispositivos' },
    { value: 'education', label: 'Educación', icon: '📚', desc: 'Cursos y certificaciones' },
    { value: 'marketing', label: 'Marketing', icon: '📣', desc: 'Publicidad y ads' },
    { value: 'taxes', label: 'Impuestos', icon: '📋', desc: 'AFIP, monotributo' },
    { value: 'other_ex', label: 'Otros', icon: '💸', desc: 'Varios' }
  ]
};

export const getCategoryInfo = (category, type) =>
  CATEGORIES[type]?.find((c) => c.value === category) || {
    label: category || 'Sin categoría',
    icon: '📌',
    desc: ''
  };
