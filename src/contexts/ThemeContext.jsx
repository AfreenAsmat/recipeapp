import {createContext, useContext, useState, useEffect} from 'react';

const ThemeContext = createContext();

    const getInitialTheme = () => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme)  return savedTheme;
            const prefersDark = window.matchMedia("(prefers-color-scheme:dark)").matches;
            return prefersDark ? "dark" : "light";
        };

    export const ThemeProvider = ({children}) => {
    const [theme, setTheme] = useState(getInitialTheme);    

    useEffect(() => {
        if (theme) {
            if (theme === 'dark') {
                document.documentElement.classList.add("dark");
                document.documentElement.classList.remove("light");
            } else {
                document.documentElement.classList.add("light");
                document.documentElement.classList.remove("dark");
            }
        localStorage.setItem("theme", theme);
        }
    },[theme]);

    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handleChange = (e) => {
            if (!localStorage.getItem("theme")) {
                setTheme(e.matches ? "dark" : "light");
            }
        };
        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    },[])


const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
}

return (
   <ThemeContext.Provider value={{theme, toggleTheme}}>
    {children}
</ThemeContext.Provider>
);
};


export const useTheme = () => useContext(ThemeContext);
