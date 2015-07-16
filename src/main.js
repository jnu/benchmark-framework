// Benchmark framework
//
// Piece together benchmark suite from script tags given in the DOM.

import Benchmark from 'benchmark';

document.addEventListener('DOMContentLoaded', evt => {
    var scripts = Array.prototype.slice.call(
            document.getElementsByTagName('script')
        ).filter(script => {
            return /^benchmark-/.test(script.type);
        }).reduce((hash, tag) => {
            var type = tag.type;

            if (!hash.hasOwnProperty(type)) {
                hash[type] = {};
            }

            hash[type][tag.getAttribute('name')] = tag;
            return hash;
        }, {});


    var suite = new Benchmark.Suite();
    var events = {

        start: function() {
            console.info("Running tests");
        },

        cycle: function (event) {
            console.log(String(event.target));
        },

        complete: function() {
            console.info("Finished! Results below.");
            var stats = {};
            this.forEach(b => {
                var hash = stats[b.name] = b.stats;
                hash.hz = b.hz;
                console.log(b);
            });

            console.table(stats);
        }

    };

    var tests = scripts['benchmark-test'];
    var opts = scripts['benchmark-opt'];
    var customEvents = scripts['benchmark-event'];

    if (customEvents) {
        for (let name in customEvents) {
            let src = customEvents[name].innerText;
            customEvents[name] = new Function('event', src);
        }
        Object.assign(events, customEvents);
    }

    if (opts) {
        for (let name in opts) {
            let src = opts[name].innerText;
            opts[name] = new Function(src);
        }
    }

    if (!tests) {
        throw new Error("No tests specified");
    }

    for (let name in tests) {
        let src = tests[name].innerText;
        suite.add(name, new Function(src), opts);
    }

    for (let name in events) {
        suite.on(name, events[name]);
    }

    suite.run();
});
