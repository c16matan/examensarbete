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

    let words = ['world', 'django', 'engine', 'block', 'c++', 'java', 'vim', 'git', 'image', 'html', 'asp.net', 'track', 'keep', 'php', 'what', 'search', 'mac', 'text', 'editor', 'implement', 'javascript', 'less', 'than', 'someone', 'either', 'fire', 'entity', 'parse', 'phone', 'anyone', 'increase', 'data', 'carry', 'xml', 'json', 'myself', 'certainly', 'function', 'call', 'declare', 'create', 'algorithm', 'tree', 'maven', 'gradle', 'large', 'projects', 'subversion', 'svn', '.net', 'best', 'practices', 'dry', 'ruby', 'closure', 'style', 'javac', 'sql', 'able', 'year', 'string', 'variable', 'silverlight', 'testing', 'pc', 'support', 'delete', 'move', 'end', 'line', 'normal', 'mode', 'insert', 'tldr', 'character', 'selection', 'shift', 'control', 'colon', 'dash', 'useful', 'resource', 'paste', 'code', 'language', 'replace', 'improve', 'answer', 'share', 'building', 'lego', 'sign', 'structure', 'meaning', 'noted', 'thanks', 'documentation', 'matches', 'see', 'brackets', 'semicolon', 'portal', 'python', 'google', 'simplicity', 'bug', 'open', 'source', 'crowdsource', 'server', 'file', 'scala', 'mysql', 'mapreduce', 'important', 'array', 'ascii', 'server-side', 'gpl', 'activex', 'actionscript', 'apk', 'applet', 'autohotkey', 'flag', 'life', 'goto', 'gcc', 'true', 'false', 'undefined', 'unit', 'operator', 'unary', 'webassembly', 'xna', 'xslt', 'zombie', 'tk', 'thread', 'theoretical', 'subroutine', 'counter', 'race', 'asc', 'desc', 'case', 'column', 'constraint', 'table', 'procedure', 'unique', 'index', 'exec', 'exists', 'join', 'key', 'rownum', 'where', 'view', 'truncate', 'typedef', 'union', 'extern', 'extends', 'unsigned', 'signed', 'long', 'enum', 'continue', 'auto', 'printf', 'std', 'using', 'namespace', 'include', 'throw', 'require', 'interface', 'echo', 'endfor', 'finally', 'instanceof', 'protected', 'static', 'return', 'try', 'unset', 'use', 'die', 'clone', 'break', 'callable', 'abstract', 'background', 'assert', 'import', 'global', 'elif', 'nonlocal', 'raise', 'volatile', 'register', 'note', 'inline', 'parameter', 'access', 'specifier', 'command', 'arguments', 'handling', 'header', 'interview', 'library', 'reserved', 'const', 'amd', 'intel', 'gpu', 'cpu', 'settings', 'config', 'increment', 'inheritence', 'haskel', 'heroku', 'heuristic', 'hex', 'hdml', 'gtk', 'expression', 'bash', 'ssh', 'event', 'listener', 'floating', 'generation', 'elixir', 'ellipsis', 'eclipse', 'problem', 'intellij', 'jetbrains', 'dataflow', 'dart', 'dark', 'cygwin', 'curry', 'cvs', 'compute', 'comment', 'bytecode', 'bool', 'camel', 'chaos', 'clos', 'allocate', 'agile', 'waterfall', 'ado', 'time', 'system', 'administration', 'choice', 'single', 'cut', 'college', 'interest', 'leader', 'init', 'user', 'password', 'localhost', '127.0.0.1', 'from', 'path', 'connection', 'internet', 'docs', 'post', 'self', 'lib', 'edge', 'initial', 'scale', 'utf-8', 'console', 'without', 'level', 'young', 'allow', 'win', 'research', 'actually', 'begin', 'opengl', 'directx', 'still', 'private', 'behavior', 'emacs', 'patient', 'var', 'performance', 'goal', 'tech', 'quick', 'service', 'result', 'slow', 'fast', 'keyboard', 'keyword', 'definition', 'three', 'two', 'one', 'fixed', 'predefined', 'latter', 'play', 'game', 'default', 'mail', 'processor', 'gof', 'design', 'patterns', 'subject', 'unfortunately', 'client', 'website', 'linux', 'arch', 'debian', 'ubuntu', 'stream', 'pen', 'class', 'seperating', 'work', 'spent', 'coding', 'slack', 'barebones', 'encountered', 'puzzle', 'optimal', 'rectangle', 'quad', 'permission', 'print', 'powershell', 'terminal', 'framework', 'fly', 'email', 'recursive', 'deploy', 'production', 'node', 'syntax', 'figure', 'photoshop', 'illustrator', 'adobe', 'book', 'http', 'raw', 'content', 'learn', 'speech', 'pay', 'vmware', 'legacy', 'modern', 'virtual', 'windows', 'safety', 'zend', 'compile', 'bin', 'src', 'ip', 'address', 'domain', 'ftp', 'form', 'authentication', 'network', 'shell', 'commit', 'mime', 'bultin', 'office', 'graph', 'binding', 'tomcat', 'api', 'mouse', 'button', 'hyperlink', 'wiki', 'dev', 'integer', 'double', 'pointer', 'curl', 'maps', 'uml', 'workstation', 'drive', 'partition', 'database', 'explain', 'export', 'prevent', 'vs2008', 'delphi', 'mailto', 'def', 'dns', 'permanently', 'format', 'audio', 'enforce', 'decoration', 'web', 'report', 'crystal', 'recycle', 'retrieve', 'new', 'old', 'random', 'temp', 'encoded', 'encrypted', 'flex', 'like', 'realistic', 'pdo', 'mysqli', 'glew', 'arrow', 'document', 'loop', 'school', 'mixed', 'bit', 'byte', 'unix', 'clear', 'mock', 'endpoint', 'tcp', 'udp', 'jpeg', 'png', 'alpha', 'animation', 'coordinate', 'accelerate', 'render', 'input', 'decode', 'serialize', 'xps', 'driver', 'usb', 'execute', 'tool', 'signature', 'preserve', 'bind', 'loose', 'sockets', 'mfc', 'rgb', 'blend', 'menustrip', 'color', 'module', 'imap', 'secure', 'orm', 'avoid', 'mass', 'polymorphism', 'foreign', 'null', 'child', 'parent', 'live', 'sentence', 'diff', 'merge', 'identified', 'intellisense', 'browser'];

    let startTime;
    let currentWord = 0;
    let amountOfMeasures = 0;
    const TIMES_TO_MEASURE = 20000;

    var performance = [];

    function initObserver() {
        let container = document.getElementById('main-container');
        let observer = new MutationObserver(checkDOM);
        observer.observe(container, { childList: true });
    }

    function checkDOM(mutationsList, observer) {
        for (let mutation of mutationsList) {
            if (mutation.type == 'childList') {
                let completionTime = window.performance.now() - startTime;
                let searchWords = document.getElementById("search-words").innerHTML;
                let amountOfResults = document.getElementById("total-amount-of-results").innerHTML;
                performance.push({
                    time: completionTime,
                    searchWords: searchWords,
                    amountOfResults: amountOfResults
                });
                amountOfMeasures++;
                if (amountOfMeasures >= TIMES_TO_MEASURE) {
                    let csv = "data:text/csv;charset=utf-8,";
                    performance.forEach(function (value) {
                        csv += value.time.toString().replace('.', ',');
                        csv += ":" + value.searchWords;
                        csv += ":" + value.amountOfResults;
                        csv += "\n";
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
