import clsx, { ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/*
1. clsx is a function that takes an array of class values and returns a string of class names.
2. twMerge is a function that takes a string of class names and returns a string of class names.
3. The result of clsx is passed to twMerge which will parse and solve tailwind utility class conflicts.
4. The result of twMerge is returned as a string. */
export const twclsx = (...args: ClassValue[]) => twMerge(clsx(...args))
