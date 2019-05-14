"use strict";

(function () {
    /**
     * Perform a search using the search box data
     */
    function search() {
        let searchWords = document.getElementById('search-box').value;
        if (searchWords.trim().length == 0) return;
        let url = '/search/' + searchWords;
        request('GET', url, function () {
            if (this.readyState == 4 && this.status == 200) {
                let response = JSON.parse(this.responseText);
                document.getElementById('main-container').innerHTML = response.body;
                document.title = response.title;
            }
        });
    }

    /**
     * Request data from the server
     *
     * @param {String} method The HTTP method
     * @param {String} url The url to be used
     * @param {Function} callback The onreadystatechange callback function
     */
    function request(method, url, callback) {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = callback
        xhr.open(method, url);
        xhr.send();
    }

    // Event listeners for the search icon and box
    document.getElementById('search-icon').addEventListener('click', search);
    document.getElementById('search-box').addEventListener('keydown', function (event) {
        if (event.keyCode == 13) search();
    });

    // ViM-like search
    let pressedKeys = {};
    document.addEventListener('keydown', function (event) {
        pressedKeys[event.keyCode] = true;
        const SHIFT = 16;
        const NUM7 = 55;
        if (pressedKeys[SHIFT] && pressedKeys[NUM7]) {
            event.preventDefault();
            document.getElementById('search-box').focus();
        }
    });
    document.addEventListener('keyup', function (event) {
        pressedKeys[event.keyCode] = false;
    });
})();
