import assert from 'assert';

jest.mock('assert');

describe('PORT configuration', () => {
    it('should successfully export PORT when defined in .env', () => {
        process.env.PORT = '3000';

        let PORT;

        jest.isolateModules(() => {
            PORT = require('../constants').PORT;
        });

        expect(PORT).toEqual('3000');
        expect(assert.ok).toHaveBeenCalledWith(
            '3000',
            'PORT is not defined in .env file'
        );
    });

    it('should throw an error when PORT is not defined in .env', () => {
        delete process.env.PORT;

        expect(() => {
            jest.isolateModules(() => {
                require('./pathToYourFile');
            });
        }).toThrow();
    });
});
