export const environment = {
    production: true,
    apiUrl: process.env["API_URL"],
    apiTimeout: process.env["API_TIMEOUT"],
    apiRetry: process.env["API_RETRY"],
    timezone: process.env.TZ,
    application: {
      name: process.env["APP_NAME"],
      version: process.env["APP_VERSION"],
      theme: process.env["APP_THEME"] || "default",
      themeColor: process.env["APP_THEME_COLOR"] || "default",
      homePage: process.env["APP_HOMEPAGE"] || "/mainmenu/profile-setting"
    },
};
