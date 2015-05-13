'use strict';

var Helpers = {
    /**
     * Creates a random 5-character id
     * @return {string} [Somewhat random id]
     */
    createGuid: function()
    {
        var text = '',
            possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (var i = 0; i < 5; i = i + 1) {
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        return text;
    }
}

module.exports = Helpers;