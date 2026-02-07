import { defineMiddleware, sequence } from "astro/middleware";
import { middleware, requestHasLocale, redirectToDefaultLocale } from "astro:i18n";
import { TEST_PAGE } from "astro:env/server";

export const localeValidation = defineMiddleware(async (context, next) => {
  const response = await next();

  if (context.url.pathname.startsWith("/test") && TEST_PAGE) {
    return response;
  } else if (!requestHasLocale(context)) {
    return redirectToDefaultLocale(context, 307)!;
  }

  return response;
});

export const onRequest = sequence(
  localeValidation,
  middleware({
    redirectToDefaultLocale: true,
    prefixDefaultLocale: true,
    fallbackType: "redirect"
  })
);
