#!/usr/bin/env node

var Peer = require('simple-peer');
var exec = require('child_process').exec;
var split = require('split2');
var through = require('through2');

var minimist = require('minimist');
var argv = minimist(process.argv.slice(2), {
    boolean: [ 'listen' ],
    alias: { l: 'listen', x: [ 'exec', 'execute' ] }
});

var peer = new Peer({
    initiator: argv.listen,
    wrtc: require('wrtc'),
    trickle: false
});

if (argv._[0]) {
    var intro = /^{/.test(argv._[0])
        ? JSON.parse(argv._[0])
        : JSON.parse(Buffer(argv._[0], 'base64'))
    ;
    peer.signal(intro);
}
else {
    var sp = split();
    sp.pipe(through(function (buf, enc, next) {
        var line = buf.toString('utf8');
        var intro = /^{/.test(line)
            ? JSON.parse(line)
            : JSON.parse(Buffer(line, 'base64'))
        ;
        peer.signal(intro);
        process.stdin.unpipe(sp);
        process.stdin.pipe(peer).pipe(process.stdout);
    }));
    process.stdin.pipe(sp);
}

peer.once('signal', function (signal) {
    var ref = Buffer(JSON.stringify(signal)).toString('base64');
    if (argv.execute) {
        var ps = exec(argv.execute + ' ' + ref);
        ps.stdout.pipe(process.stdout);
        ps.stderr.pipe(process.stderr);
    }
    else {
        console.log(ref);
    }
});
