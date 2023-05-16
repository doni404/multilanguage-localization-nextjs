import { useRouter } from "next/router";
import { useEffect, useState } from "react";
// RadixUI is used here but isn't necessary
import * as Popover from "@radix-ui/react-popover";

// You would likley have this is a seperate file, but need a list of
// supported languages to map over.
const languages = [
    {
        locale: "en",
        name: "English",
    },
    {
        locale: "fr",
        name: "French",
    },
    {
        locale: "en-gb",
        name: "English-Great Britain",
    },
    {
        locale: "en-ca",
        name: "English-Canada",
    },
    {
        locale: "fr-fr",
        name: "Francais-France",
    },
    {
        locale: "fr-ca",
        name: "Francais-Canada",
    },
    {
        locale: "fr-be",
        name: "Francais-Belge",
    },
];

const LanguageSelect = () => {
    // Get the info we need from the NextJS router
    const router = useRouter();
    const { pathname, asPath, query, locale = "en" } = router;

    // State for the currently selected locale
    const [selectedLang, setSelectedLang] = useState(locale);

    // State for whether the popover is open or not
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    // Handle button click
    const handleClick = (languageLocale) => {
        setSelectedLang(languageLocale);
        setIsPopoverOpen(false);
    };

    // Update the router and locale if the selected language is changed
    useEffect(() => {
        // Get the full cookie consent
        const cookieConsent = document.cookie
            ? document.cookie
                .split("; ")
                .find((row) => row.startsWith("hasCookieConsent="))
            : null;

        // Get the value of the cookie, note this will be a string
        const cookieConsentString = cookieConsent
            ? cookieConsent.split("=")[1]
            : false;

        // Extract the value to a boolean we can use more easily
        const hasCookieConsent = cookieConsentString === "true";

        if (selectedLang === "en") {
            // If we have consent set a cookie
            if (hasCookieConsent) {
                document.cookie = `NEXT_LOCALE=en; maxage=${1000 * 60 * 60 * 24 * 7
                    }; path=/`;
            }
            router.push({ pathname, query }, asPath, { locale: "en" });
        }
        if (selectedLang === "fr") {
            // If we have consent set a cookie
            if (hasCookieConsent) {
                document.cookie = `NEXT_LOCALE=fr; maxage=${1000 * 60 * 60 * 24 * 7
                    }; path=/`;
            }
            router.push({ pathname, query }, asPath, { locale: "fr" });
        }
        if (selectedLang === "fr-ca") {
            // If we have consent set a cookie
            if (hasCookieConsent) {
                document.cookie = `NEXT_LOCALE=fr-ca; maxage=${1000 * 60 * 60 * 24 * 7
                    }; path=/`;
            }
            router.push({ pathname, query }, asPath, { locale: "fr-ca" });
        }
        if (selectedLang === "fr-fr") {
            // If we have consent set a cookie
            if (hasCookieConsent) {
                document.cookie = `NEXT_LOCALE=fr-fr; maxage=${1000 * 60 * 60 * 24 * 7
                    }; path=/`;
            }
            router.push({ pathname, query }, asPath, { locale: "fr-fr" });
        }
        if (selectedLang === "fr-be") {
            // If we have consent set a cookie
            if (hasCookieConsent) {
                document.cookie = `NEXT_LOCALE=fr-be; maxage=${1000 * 60 * 60 * 24 * 7
                    }; path=/`;
            }
            router.push({ pathname, query }, asPath, { locale: "fr-be" });
        }
        if (selectedLang === "en-ca") {
            // If we have consent set a cookie
            if (hasCookieConsent) {
                document.cookie = `NEXT_LOCALE=en-ca; maxage=${1000 * 60 * 60 * 24 * 7
                    }; path=/`;
            }
            router.push({ pathname, query }, asPath, { locale: "en-ca" });
        }
        if (selectedLang === "en-gb") {
            // If we have consent set a cookie
            if (hasCookieConsent) {
                document.cookie = `NEXT_LOCALE=en-gb; maxage=${1000 * 60 * 60 * 24 * 7
                    }; path=/`;
            }
            router.push({ pathname, query }, asPath, { locale: "en-gb" });
        }
    }, [selectedLang]); //eslint-disable-line

    return (
        <Popover.Root open={isPopoverOpen}>
            <Popover.Trigger onClick={() => setIsPopoverOpen(!isPopoverOpen)}>
                Change language &rarr;
            </Popover.Trigger>
            <Popover.Content style={{ backgroundColor: "#ccc" }}>
                <Popover.Arrow />
                <Popover.Close onClick={() => setIsPopoverOpen(!isPopoverOpen)}>
                    Close
                </Popover.Close>
                <div
                    style={{
                        padding: "1rem",
                        display: "grid",
                        gridTemplateColumns: "130px 130px",
                        gridAutoFlow: "dense",
                        gap: "0.5rem",
                    }}
                >
                    {languages.map((language) => {
                        const isActive = language.locale === locale;
                        return (
                            <button
                                key={language.locale}
                                onClick={() => handleClick(language.locale)}
                            >
                                {language.name}
                                {isActive && <span>&#10003;</span>}
                            </button>
                        );
                    })}
                </div>
            </Popover.Content>
        </Popover.Root>
    );
};

export default LanguageSelect;