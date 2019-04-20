// ==UserScript==
// @name         Measurement script
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Measurement script for thesis project
// @author       You
// @match        http://localhost/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    let words = [
        'hello world',
        'django',
        'engine template',
        'block',
        'c++',
        'java synchronized',
        'vim',
        'git',
        'image',
        'html js'
    ];

    let startTime;
    let currentWord = 0;
    let amountOfMeasures = 0;
    const TIMES_TO_MEASURE = 1000;

    var performance = [];

    function initObserver() {
        let container = document.getElementById('main-container');
        let observer = new MutationObserver(checkDOM);
        observer.observe(container, { childList: true });
    }

    function checkDOM(mutationsList, observer) {
        for (let mutation of mutationsList) {
            let completionTime = window.performance.now() - startTime;
            performance.push(completionTime);
            amountOfMeasures++;
            if (amountOfMeasures >= TIMES_TO_MEASURE) {
                let csv = "data:text/csv;charset=utf-8,";
                performance.forEach(function (time) {
                    csv += time.toString().replace('.', ',') + "\n";
                });
                let uri = encodeURI(csv);
                let link = document.createElement("a");
                link.setAttribute("href", uri);
                link.setAttribute("download", "result.csv");
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } else {
                setTimeout(measure, 200);
            }
        }
    }

    function measure() {
        document.getElementById('search-box').value = words[currentWord];
        currentWord++;
        if (currentWord >= words.length) currentWord = 0;
        startTime = window.performance.now();
        document.getElementById('search-icon').click();
    }

    function ready() {
        initObserver();
        setTimeout(measure, 1000);
    }

    if (document.attachEvent ? document.readyState === 'complete' : document.readyState !== 'loading') {
        ready();
    } else {
        document.addEventListener('DOMContentLoaded', ready);
    }
})();
