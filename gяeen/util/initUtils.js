
export async function initializeModule(initFunction, moduleName) {
    try {
        await initFunction;
        console.log(`${moduleName} initialized successfully.`);
    } catch (error) {
        console.error(`Error initializing ${moduleName}:`, error);
        process.exit(1);
    }
}
