'use strict';

jest.dontMock('../helpers');

const Helpers = require('../helpers');

describe('Helpers', () => {
    const testObjectOne = {
        propOne: true,
        propTwo: {
            val: 42,
            deep: {
                deep: {
                    deep: {
                        deep: true
                    }
                }
            }
        },
        propThree: 'Hi'
    };

    const testObjectTwo = {
        propOne: false,
        propTwo: {
            deep: {
                deep: {
                    deep: {
                        deep: false
                    }
                }
            }
        }
    }

    it('Correctly expands an object with an additional property', () => {
        let expandedObject = Helpers.extend(true, {}, testObjectTwo, testObjectOne);

        expect(expandedObject.propThree).toEqual('Hi');
    });

    it('Correctly overrides an expanded property', () => {
        let expandedObject = Helpers.extend(true, {}, testObjectTwo, testObjectOne);

        expect(expandedObject.propOne).toEqual(true);
    });

    it('Correctly expands an object with an additional property (nested)', () => {
        let expandedObject = Helpers.extend(true, {}, testObjectTwo, testObjectOne);

        expect(expandedObject.propTwo.val).toEqual(42);
    });

    it('Correctly overrides an expanded property (nested)', () => {
        let expandedObject = Helpers.extend(true, {}, testObjectTwo, testObjectOne);

        expect(expandedObject.propTwo.deep.deep.deep.deep).toEqual(true);
    });
});
