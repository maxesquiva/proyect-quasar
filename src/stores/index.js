import { store } from "quasar/wrappers";
import { Cookies } from "quasar";
import { createPinia } from "pinia";
import { createQuasarCookiesPersistedState } from "pinia-plugin-persistedstate/quasar";

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default store(({ ssrContext }) => {
  const pinia = createPinia();

  const cookies = process.env.SERVER ? Cookies.parseSSR(ssrContext) : Cookies;
  pinia.use(createQuasarCookiesPersistedState(cookies));

  return pinia;
});
