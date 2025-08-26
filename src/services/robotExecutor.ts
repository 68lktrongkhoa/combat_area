// This file runs as a Web Worker.

let robotState: any = {};
let worldState: any = {};
let commands: any[] = [];

// The 'self' object that the user's code will interact with.
// These functions queue up commands to be sent back to the main thread.
const selfApi = {
    scan_enemies: () => {
        return worldState.enemies || [];
    },
    get_self_stats: () => {
        return robotState;
    },
    move_to: (x: number, y: number) => {
        commands.push({ type: 'MOVE', payload: { to: { x, y } } });
    },
    rotate_towards: (target: { x: number, y: number }) => {
        // For now, rotation is implicit in firing. This is a placeholder.
        commands.push({ type: 'ROTATE', payload: { to: target } });
    },
    fire_at: (target: { x: number, y: number }) => {
        commands.push({ type: 'FIRE', payload: { at: target } });
    },
    use_defense_module: () => {
        commands.push({ type: 'USE_DEFENSE_MODULE' });
    },
    use_utility_module: () => {
        commands.push({ type: 'USE_UTILITY_MODULE' });
    },
    log: (message: string) => {
        commands.push({ type: 'LOG', payload: { message: String(message) } });
    },
    memory: {}, // A persistent object to store data between AI ticks.
};

// Main message handler for the worker
self.onmessage = (e) => {
    const { code, currentRobotState, currentWorldState, memory } = e.data;

    // Update the worker's knowledge of the world and self
    robotState = currentRobotState;
    worldState = currentWorldState;
    selfApi.memory = memory || {}; // Restore memory from the last tick
    
    // Clear commands from the previous tick
    commands = [];

    // Construct the function to be executed.
    // We wrap the user's code inside a function body and call `update()`.
    // The 'self' object is passed as an argument.
    const userUpdateFunction = new Function('self', code + '\nif(typeof update === "function") { update(); }');

    try {
        // Execute the user's code with the sandboxed API
        userUpdateFunction(selfApi);
    } catch (error) {
        console.error("Error executing robot code:", error);
        // Send an error back to the main thread for logging
        commands.push({ type: 'LOG', payload: { message: `Execution Error: ${(error as Error).message}` } });
    }
    
    // Send the collected commands and the updated memory state back to the Arena
    self.postMessage({ commands, memory: selfApi.memory });
};
