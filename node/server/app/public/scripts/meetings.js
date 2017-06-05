$(() => {
    const meeting = decodeURI(window.location.pathname.split('/').slice(-1)[0]);
    const ws = new WebSocket("ws://" + window.location.host + "/" + meeting + "/" + guid());
    let interval;

    ws.onopen = function () {
        console.log('open socket');
        interval = window.setInterval(() => ws.send("ping"), 20000);
    };

    ws.onmessage = function (event) {
        const data = JSON.parse(event.data);
        if (data.command === "update")
            $('#visitors').html(data.visitors);
        else if (data.command === "ping")
            console.log(data.message);
    };

    ws.onerror = function (event) {
        console.log(event);
    };

    ws.onclose = function (event) {
        console.log(event);
        clearInterval(interval);
    };
});

const guid = () => {
    const s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    };
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
};
