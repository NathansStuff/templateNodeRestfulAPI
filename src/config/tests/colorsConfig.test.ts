import * as Colors from 'colors.ts';

// Mock the entire colors.ts module
jest.mock('colors.ts');

describe('colorsConfig', () => {
    beforeEach(() => {
        // Clear all instances and calls to the mock
        jest.clearAllMocks();
    });

    it('should enable colors', () => {
        // Require the actual module that imports 'colors.ts'
        require('../colorsConfig');

        // Check if the enable method was called
        expect(Colors.enable).toHaveBeenCalled();
    });
});
