# rtcat

webrtc netcat

# usage

```
rtcat -l

  Initiate a webrtc connection, printing the base64 introducer blob to stdout.
  Paste the introducer from the other node as the first line on stdin.

rtcat

  Connect to an initiated webrtc connection.
  Paste the introducer from the other node as the first line on stdin.
  After pasting the introducer, another introducer will be printed to stdout for
  the remote node to use.

After the introductions, stdin is forwarded to the remote connection and data
from the remote connection goes to stdout.
```

# install

With [npm](https://npmjs.org), to get the `rtcat` command do:

```
npm install -g rtcat
```

# license

MIT
