fetch('../../data/10295/day.csv')
    .then(response => response.text())
    .then(text => {
        const ts = timeSeries(
            d3.csvParse(text),
            {
                x: {
                    "field": "date",
                    "format": "%Y-%m-%d"
                },
                y: {
                    "field": "mean"
                },
            },
            '#container',
        );
    });
fetch('../../data/10295/week.csv')
    .then(response => response.text())
    .then(text => {
        const ts = timeSeries(
            d3.csvParse(text),
            {
                x: {
                    "field": "week",
                    "format": "%Y-%m-%d"
                },
                y: {
                    "field": "mean"
                },
            },
            '#container',
        );
    });
fetch('../../data/10295/month.csv')
    .then(response => response.text())
    .then(text => {
        const ts = timeSeries(
            d3.csvParse(text),
            {
                x: {
                    "field": "month",
                    "format": "%Y-%m"
                },
                y: {
                    "field": "mean"
                },
            },
            '#container',
        );
    });
