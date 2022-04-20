/**
 * Loading Screen Event Handlers
 */
var count = 0;
var thisCount = 0;

const handlers = {
    startInitFunctionOrder(data)
    {
        count = data.count;
    },
    initFunctionInvoking(data)
    {
        var percentage = ((data.idx / count) * 100);
        $(".top-bar").css("width", percentage + '%');
        $("#loadLogs").text(`Invoking ${data.name} (${Math.round(percentage)}%)...`)

        if(percentage >= 97.9) {
            setTimeout(() => {
                $("#music").animate({volume: 0}, 10000, () => {
                    document.getElementById("music").pause();
                });
            }, 10000)
        }
    },
    startDataFileEntries(data)
    {
        count = data.count;
    },
    performMapLoadFunction(data)
    {
        thisCount++;
        var percentage = ((thisCount / count) * 100);
        $(".top-bar").css("width", percentage + '%');
    },
    onLogLine(data)
    {
        if(data.message.indexOf("aud"))
            data.message = `${data.message}<br>This may take a while`

        $('#loadLogs').text(data.message);
    }
};

window.addEventListener('message', (e) => (handlers[e.data.eventName] || function(data) {})(e.data));