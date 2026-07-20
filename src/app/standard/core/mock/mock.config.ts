// Single ON/OFF switch for the whole mock API layer.
// Flip to false (or delete this folder + its wiring in app.config.ts) once the real backend is ready.
export const MOCK_CONFIG = {
  enabled: true,
  delayMs: 300,
};
