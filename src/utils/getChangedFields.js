export const getChangedFields = (original, current) => {   
    const changed = {};
    for (const key in current) {
        if (current[key] !== original[key]) {
            changed[key] = current[key];
        }
    }
    
    return changed;
}