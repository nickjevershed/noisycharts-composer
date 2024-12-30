

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.OXrKsZA9.js","_app/immutable/chunks/scheduler.MoDfpPkv.js","_app/immutable/chunks/index.B1I634o-.js"];
export const stylesheets = [];
export const fonts = [];
