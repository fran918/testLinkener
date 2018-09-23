export interface Chart {
    title: { text: string };
    chart: {
        type: string
    };
    series: [{
        data: any,
        fillColor: {
            linearGradient: {
                x1: number,
                x2: number,
                y1: number,
                y2: number
            },
            stops: any
        },
        allowPointSelect: boolean
    }];
    plotOptions: {
        areaspline: {
            stacking: string,
            marker: {
                symbol: string,
                lineWidth: number,
                fillColor: any,
                lineColor: any,
            }
        }
    };
}
