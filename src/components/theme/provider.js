"use client"
import { ThemeProvider as NextThemesProvider } from "next-themes"

export function ThemeProvider({ children, ...props }) {
    return (
        <NextThemesProvider
            attribute="data-theme"
            defaultTheme="light"
            enableSystem={false}
            themes={["daisylight", "daisydark"]}
            storageKey="theme"
            enableColorScheme={true}
            {...props}
        >
            {children}
        </NextThemesProvider>
    )
}
