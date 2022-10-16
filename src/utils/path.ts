export const routerPathMaker = (path: string | undefined, altPath: string): string => {
    return path ? (path[0] === "/" ? path : `/${path}`) : (altPath[0] === "/" ? altPath : `/${altPath}`);
} 