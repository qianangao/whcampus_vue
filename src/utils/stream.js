var server = "ws://10.202.16.240:8188/janus";

var initJanus = (i) => {
    return new Promise((resolve, reject) => {
        let streamList = null;
        let streaming = null;
        let videoElement = $("#remotevideo-" + (i + 1));
        let videoAttached = false;

        Janus.init({
            debug: false,
            dependencies: Janus.useDefaultDependencies(), // or: Janus.useOldDependencies() to get the behaviour of previous Janus versions
            callback: function () {
                Janus.log("Initialed Janus");
                var janus = new Janus({
                    server: server,
                    success: function () {
                        Janus.log("Instance <" + (i + 1) + ">" + " connected to " + server);
                        janus.attach({
                            plugin: "janus.plugin.streaming",
                            success: function (pluginHandle) {
                                Janus.log("Plugin " + "「janus.plugin.streaming」" + " attached!");
                                streaming = pluginHandle;

                                if (streamList === null || streamList === undefined || streamList) {
                                    streaming.send({
                                        "message": {
                                            "request": "list"
                                        },
                                        success: function (result) {
                                            streamList = result["list"];
                                            streaming.send({
                                                "message": {
                                                    "request": "watch",
                                                    id: parseInt(streamList[i].id)
                                                },
                                                success: function (result) {
                                                    resolve("Watched stream: " + (i + 1));
                                                }
                                            });
                                        }
                                    });
                                }
                            },
                            error: function (cause) {
                                Janus.log("Couldn't attach to the plugin");
                                Janus.log(cause);
                                reject("Couldn't attach to the plugin");
                            },
                            onmessage: function (msg, jsep) {
                                Janus.log("Got a message/event (msg) from the plugin");
                                if (jsep !== undefined && jsep !== null) {
                                    Janus.log("Got a jsep from the plugin: ");
                                    // Offer from the plugin, let's answer
                                    Janus.log(jsep);
                                    streaming.createAnswer({
                                        jsep: jsep,
                                        // We want recvonly audio/video and, if negotiated, datachannels
                                        media: {
                                            audioSend: false,
                                            videoSend: false,
                                            data: true
                                        },
                                        success: function (jsep) {
                                            streaming.send({
                                                "message": {
                                                    "request": "start"
                                                },
                                                "jsep": jsep
                                            });
                                            Janus.log("Send anwser: {\"request\": \"start\"}");
                                        },
                                        error: function (error) {
                                            Janus.error("WebRTC error:", error);
                                        }
                                    });
                                }
                            },
                            onremotestream: function (stream) {
                                Janus.log("We have a remote stream (working PeerConnection!) to display");

                                if (!videoAttached) {
                                    Janus.attachMediaStream(videoElement.get(0), stream);
                                    console.debug("Attached media stream to " + videoElement.attr("id"));
                                    videoAttached = true;
                                }
                            },
                            oncleanup: function () {
                                streaming.send({
                                    "message": {
                                        "request": "stop"
                                    }
                                });
                                streaming.hangup();
                            },
                            detached: function () {
                                streaming.send({
                                    "message": {
                                        "request": "stop"
                                    }
                                });
                                streaming.hangup();
                            }
                        });
                    },
                    error: function (error) {
                        Janus.error(error);
                        reject(error);
                        window.location.reload();
                    },
                    destroyed: function () {
                        window.location.reload();
                    }
                });
            }
        });
    });
};

async function playVideos() {
    let players = [];

    try {
        for (let i = 0; i < 9; i++) {
            players[i] = await initJanus(i);
        }
    } catch (err) {
        console.error(err);
    }

    players.forEach(result => {
        console.debug(result);
    })
}


$(function () {
    playVideos();
});