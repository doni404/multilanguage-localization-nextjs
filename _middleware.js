import { NextResponse } from "next/server";

// Regex to check whether something has an extension, e.g. .jpg
const PUBLIC_FILE = /\.(.*)$/;

// Next JS Middleware
export const middleware = (request) => {
  // Get the information we need from the request object
  const { nextUrl, geo, headers, cookies } = request;
  // Cloned url to work with
  const url = nextUrl.clone();
  // Client country, defaults to us
  const country = geo?.country?.toLowerCase() || "us";
  // Client language, defaults to en
  const language =
    headers
      .get("accept-language")
      ?.split(",")?.[0]
      .split("-")?.[0]
      .toLowerCase() || "en";

  // // Helpful console.log for debugging
  // console.log({
  //   nextLocale: nextUrl.locale,
  //   pathname: nextUrl.pathname,
  //   cookie: cookies.NEXT_LOCALE,
  //   clientCountry: country,
  //   clientLanguage: language,
  // });

  try {
    // Early return if it is a public file such as an image
    if (PUBLIC_FILE.test(nextUrl.pathname)) {
      return undefined;
    }
    // Early return if this is an api route
    if (nextUrl.pathname.includes("/api")) {
      return undefined;
    }

    // Early return if we are on a locale other than default
    if (nextUrl.locale !== "default") {
      return undefined;
    }

    // Early return if there is a cookie present and on default locale
    if (cookies.NEXT_LOCALE && nextUrl.locale === "default") {
      url.pathname = `/${cookies.NEXT_LOCALE}${nextUrl.pathname}`;
      return NextResponse.redirect(url);
    }

    // We now know:
    // No cookie that we need to deal with
    // User has to be on default locale

    // Redirect All France
    if (country === "fr") {
      url.pathname = `/fr-fr${nextUrl.pathname}`;
      return NextResponse.redirect(url);
    }

    // Redirect All Belgium
    if (country === "be") {
      url.pathname = `/fr-be${nextUrl.pathname}`;
      return NextResponse.redirect(url);
    }

    // Redirect all Great Britain
    if (country === "gb") {
      url.pathname = `/en-gb${nextUrl.pathname}`;
      return NextResponse.redirect(url);
    }

    // Redirect French-Canada
    if (country === "ca" && language === "fr") {
      url.pathname = `/fr-ca${nextUrl.pathname}`;
      return NextResponse.redirect(url);
    }

    // Redirect all other Canadian requests
    if (country === "ca") {
      url.pathname = `/en-ca${nextUrl.pathname}`;
      return NextResponse.redirect(url);
    }

    // Handle French language fallback
    if (language === "fr") {
      url.pathname = `/fr${nextUrl.pathname}`;
      return NextResponse.redirect(url);
    }

    // Handle the default locale fallback to english
    if (nextUrl.locale === "default") {
      url.pathname = `/en${nextUrl.pathname}`;
      return NextResponse.redirect(url);
    }

    // If everything else falls through continue on with response as normal
    return undefined;
  } catch (error) {
    console.log(error);
  }
};