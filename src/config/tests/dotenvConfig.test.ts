import dotenv from 'dotenv';

// Mock the entire dotenv module
jest.mock('dotenv');

describe('dotenv configuration', () => {
    beforeEach(() => {
        // Clear all instances and calls to the mock
        jest.clearAllMocks();
    });

    it('should call dotenv config', () => {
        // Require the actual module that imports 'dotenv'
        require('../dotenvConfig');

        // Check if the config method was called
        expect(dotenv.config).toHaveBeenCalled();
    });
});
