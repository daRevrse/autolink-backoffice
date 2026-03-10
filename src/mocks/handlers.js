const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

export const mockDelay = delay;
