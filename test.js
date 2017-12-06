"use strict";

var TextEffect = function(text, parentNode) {
    var _text = '';

    var _modifyStyle = function() {
        var userAgent = navigator.userAgent,
            isWebkit = userAgent.indexOf("Chrome") > -1 || userAgent.indexOf("Safari") > -1,
            prefix = isWebkit ? 'webkit' : '';
        if (prefix === '') {
            prefix = userAgent.indexOf("Firefox") > -1 ? 'moz' : 'o';
        }
        return function(_el, _key, _value) {
            _el.style[prefix + _key] = _value;
        }
    }();

    if (typeof text === 'object' && text.nodeType !== undefined) {
        _text = text.textContent;
        text.textContent = '';
    } else {
        _text = text;
    }

    var glow = function(option, callBack) {
        if (isNaN(option.duration)) throw new Error('The duration must be a number greater than 0');
        //Html
        var docfrag = document.createDocumentFragment();
        _text.split('').forEach(function(e, i) {
            let el = document.createElement("span");
            el.className = 'coruscate';

            _modifyStyle(el, 'AnimationDuration', option.duration + 's')
            _modifyStyle(el, 'AnimationDelay', i * option.duration +'s');

            el.textContent = e;
            docfrag.appendChild(el);
        });
        if (parentNode === undefined) {
            text.appendChild(docfrag);
        } else {
            parentNode.appendChild(docfrag);
        }
        typeof callBack === 'function' && callBack();
    };


    var disorder = function() {
        console.log('Hello world');
    };

    return {
        glow,
        disorder
    }
}