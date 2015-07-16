# JS benchmark framework

A tiny framework for quick benchmarking with [Benchmark.js](http://benchmarkjs.com/).

## Motivation

[JSPerf.com was down!](https://github.com/jsperf/jsperf.com/issues/18#issuecomment-113569132)

## Usage

Create an HTML doc for your perf tests like this:

```html
<html>
<body>

<!-- Step 1: Include framework -->
<script src="benchmark-framework.min.js"></script>

<!-- Step 2 [optional]: Define setup code -->
<script type="benchmark-opt" name="setup">
console.log("Setting stuff up!");
</script>

<!-- Step 3 [optional]: Define teardown code -->
<script type="benchmark-opt" name="teardown">
console.log("I'm tearing stuff down!");
</script>

<!-- Step 4: Define test cases -->
<script type="benchmark-test" name="reverse loop">
var sum = 0;
var i = 1000;
while (i--) {
    sum += i;
}
</script>

<script type="benchmark-test" name="forward loop">
var sum = 0;
var i = 0;
var limit = 1000;
while (i++ < limit) {
    sum += i;
}
</script>

</body>
</html>
```

Open this document in any browser (or multiple browsers!) and observe the perf results in the console.

See also the example in `test/test_perf.html`.

### Advanced

The `benchmark-opt` and `benchmark-event` script types accept any parameter that Benchmark.js can accept for `options` and `events`, respectively. For example, `<script type="benchmark-event" name="abort">/* stuff */</script>` will compile that inner code and use it as the `onAbort` event handler.

The `event` scripts accept one parameter named `event`. You can use this to customize how results are reported.