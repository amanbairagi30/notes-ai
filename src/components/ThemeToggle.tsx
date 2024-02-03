import React from 'react'
import { Button } from './ui/button'
import { MoonIcon, SunIcon } from '@radix-ui/react-icons'
import { useTheme } from 'next-themes'

export default function ThemeToggle() {
    const {theme, setTheme} = useTheme();
    return (
        <Button
            variant={"outline"}
            size={"icon"}
            className='rounded-full w-[4rem] border-2 flex items-center justify-center'
            onClick={() => {
                if (theme === "dark") {
                    setTheme("light")
                } else {
                    setTheme("dark")
                }
            }}
        >
            <SunIcon className='h-[2rem] w-[2rem] dark:bg-[white] p-1 rounded-full text-[#000] border rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
            <MoonIcon className='h-[2rem] w-[2rem] dark:bg-[white] p-1 rounded-full text-[#000] border rotate-90 scale-0 transition-all dark:-rotate-0 dark:scale-100' />
            {/* <span className='sr-only'>Toggle Theme</span> */}
        </Button>
    )
}
