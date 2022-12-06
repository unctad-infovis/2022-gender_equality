import React, { useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';

// https://www.highcharts.com/
import Highcharts from 'highcharts';
import highchartsAccessibility from 'highcharts/modules/accessibility';
import highchartsExporting from 'highcharts/modules/exporting';
import highchartsExportData from 'highcharts/modules/export-data';
import highchartsAnnotations from 'highcharts/modules/annotations';

// https://www.npmjs.com/package/react-is-visible
import 'intersection-observer';
import { useIsVisible } from 'react-is-visible';

import roundNr from '../helpers/RoundNr.js';

highchartsAccessibility(Highcharts);
highchartsExporting(Highcharts);
highchartsExportData(Highcharts);
highchartsAnnotations(Highcharts);

Highcharts.setOptions({
  lang: {
    decimalPoint: '.',
    downloadCSV: 'Download CSV data',
    thousandsSep: ','
  }
});
Highcharts.SVGRenderer.prototype.symbols.download = (x, y, w, h) => {
  const path = [
    // Arrow stem
    'M', x + w * 0.5, y,
    'L', x + w * 0.5, y + h * 0.7,
    // Arrow head
    'M', x + w * 0.3, y + h * 0.5,
    'L', x + w * 0.5, y + h * 0.7,
    'L', x + w * 0.7, y + h * 0.5,
    // Box
    'M', x, y + h * 0.9,
    'L', x, y + h,
    'L', x + w, y + h,
    'L', x + w, y + h * 0.9
  ];
  return path;
};

function LineChart({
  allow_decimals, data, idx, line_width, note, show_first_label, source, subtitle, title
}) {
  const chartRef = useRef();
  const isVisible = useIsVisible(chartRef, { once: true });

  const chartHeight = 700;
  const createChart = useCallback(() => {
    Highcharts.chart(`chartIdx${idx}`, {
      annotations: [{
        draggable: false,
        labels: [{
          backgroundColor: 'transparent',
          borderColor: '#999',
          borderRadius: 10,
          borderWidth: 1,
          padding: 7,
          point: 'AverageDeveloped economies',
          style: {
            color: '#222',
            fontSize: '13px',
            fontWeight: 400,
            lineHeight: '16px'
          },
          text: 'REGIONAL AVERAGE: <strong>71</strong>',
          useHTML: true,
          y: 55,
          zIndex: 1
        }, {
          backgroundColor: 'transparent',
          borderColor: '#999',
          borderRadius: 10,
          borderWidth: 1,
          padding: 7,
          point: 'AverageDeveloping economies: Americas',
          style: {
            color: '#222',
            fontSize: '13px',
            fontWeight: 400,
            lineHeight: '16px'
          },
          text: 'REGIONAL AVERAGE: <strong>52</strong>',
          useHTML: true,
          y: 55,
          zIndex: 1
        }, {
          backgroundColor: 'transparent',
          borderColor: '#999',
          borderRadius: 10,
          borderWidth: 1,
          padding: 7,
          point: 'AverageDeveloping economies: Asia and Oceania',
          style: {
            color: '#222',
            fontSize: '13px',
            fontWeight: 400,
            lineHeight: '16px'
          },
          text: 'REGIONAL AVERAGE: <strong>48</strong>',
          useHTML: true,
          y: 55,
          zIndex: 1
        }, {
          allowOverlap: true,
          backgroundColor: 'transparent',
          borderColor: '#999',
          borderRadius: 10,
          borderWidth: 1,
          padding: 7,
          point: 'AverageDeveloping economies: Africa',
          style: {
            color: '#222',
            fontSize: '13px',
            fontWeight: 400,
            lineHeight: '16px'
          },
          text: 'REGIONAL AVERAGE: <strong>35</strong>',
          useHTML: true,
          y: 55,
          zIndex: 1
        }]
      }],
      caption: {
        align: 'left',
        margin: 15,
        style: {
          color: 'rgba(0, 0, 0, 0.8)',
          fontFamily: 'Roboto',
          fontSize: '14px'
        },
        text: `<em>Source:</em> ${source} ${note ? (`<br /><em>Note:</em> <span>${note}</span>`) : ''}`,
        verticalAlign: 'bottom',
        x: 0
      },
      chart: {
        events: {
          load() {
            // eslint-disable-next-line react/no-this-in-sfc
            this.renderer.image('https://unctad.org/sites/default/files/2022-11/unctad_logo.svg', 5, 15, 80, 100).add();
          }
        },
        height: chartHeight,
        inverted: false,
        resetZoomButton: {
          theme: {
            fill: '#fff',
            r: 0,
            states: {
              hover: {
                fill: '#009edb',
                stroke: 'transparent',
                style: {
                  color: '#fff',
                  fontFamily: 'Roboto',
                }
              }
            },
            stroke: '#7c7067',
            style: {
              fontFamily: 'Roboto',
              fontSize: '13px',
              fontWeight: 400
            }
          }
        },
        style: {
          color: 'rgba(0, 0, 0, 0.8)',
          fontFamily: 'Roboto',
          fontWeight: 400
        },
        type: 'line',
        zoomType: 'x'
      },
      colors: ['rgba(114, 191, 68, 0.7)', 'rgba(160, 102, 170, 0.7)', 'rgba(245, 130, 32, 0.7)', 'rgba(0, 158, 219, 0.7)'],
      credits: {
        enabled: false
      },
      exporting: {
        enabled: true,
        buttons: {
          contextButton: {
            menuItems: ['viewFullscreen', 'separator', 'downloadPNG', 'downloadPDF', 'separator', 'downloadCSV'],
            symbol: 'download',
            symbolFill: '#000'
          }
        }
      },
      legend: {
        enabled: false
      },
      navigation: {
        menuItemHoverStyle: {
          backgroundColor: '#009edb'
        }
      },
      plotOptions: {
        line: {
          animation: {
            duration: 3000
          },
          cursor: 'pointer',
          dataLabels: {
            enabled: false,
          },
          events: {
            legendItemClick() {
              return false;
            }
          },
          selected: true,
          lineWidth: line_width,
          marker: {
            enabled: true,
            lineColor: '#fff',
            lineWidth: 1,
            radius: 16,
            markerOpacity: 0.5,
            states: {
              hover: {
                animation: {
                  duration: 50
                },
                enabled: true,
                lineWidthPlus: 2,
                radiusPlus: 4
              }
            },
            symbol: 'circle'
          },
          states: {
            hover: {
              halo: {
                size: 0
              },
              enabled: true,
              lineWidthPlus: 0,
              lineWidth: line_width,
            },
            inactive: {
              opacity: 1
            }
          }
        }
      },
      responsive: {
        rules: [{
          chartOptions: {
            title: {
              margin: 10
            }
          },
          condition: {
            maxWidth: 630
          }
        }, {
          chartOptions: {
            title: {
              margin: 10,
              style: {
                fontSize: '26px',
                lineHeight: '30px'
              }
            }
          },
          condition: {
            maxWidth: 500
          }
        }, {
          chartOptions: {
            annotations: {
              enabled: false
            }
          },
          condition: {
            maxWidth: 550
          }
        }]
      },
      series: data,
      subtitle: {
        align: 'left',
        enabled: true,
        style: {
          color: 'rgba(0, 0, 0, 0.8)',
          fontSize: '16px',
          fontWeight: 400,
          lineHeight: '18px'
        },
        text: subtitle,
        useHTML: true,
        widthAdjust: -100,
        x: 100
      },
      title: {
        align: 'left',
        margin: 10,
        style: {
          color: '#000',
          fontSize: '30px',
          fontWeight: 700,
          lineHeight: '34px'
        },
        text: title,
        widthAdjust: -144,
        x: 100
      },
      tooltip: {
        backgroundColor: '#fff',
        borderColor: '#ccc',
        borderRadius: 10,
        borderWidth: 1,
        crosshairs: false,
        formatter() {
          // eslint-disable-next-line react/no-this-in-sfc
          return `<div class="tooltip_container"><span class="tooltip_label">${this.key}:</span> <span class="tooltip_value">${roundNr(this.x, 1).toFixed(1)}</span></div>`;
        },
        padding: 1,
        shadow: false,
        shared: false,
        useHTML: true
      },
      xAxis: {
        allowDecimals: true,
        gridLineColor: 'rgba(124, 112, 103, 0.2)',
        gridLineDashStyle: 'shortdot',
        gridLineWidth: 1,
        labels: {
          formatter: (el) => `${el.value.toLocaleString('en-US')}`,
          reserveSpace: true,
          style: {
            color: 'rgba(0, 0, 0, 0.8)',
            fontFamily: 'Roboto',
            fontSize: '16px',
            fontWeight: 400
          },
          y: 35
        },
        lineColor: '#ccc',
        lineWidth: 0,
        opposite: false,
        // tickInterval: 1000 * 60 * 60 * 24 * 365,
        tickLength: 0,
        tickWidth: 0,
        title: {
          enabled: false
        },
        type: 'linear'
      },
      yAxis: {
        allowDecimals: allow_decimals,
        gridLineWidth: 0,
        labels: {
          enabled: false
        },
        lineColor: 'transparent',
        lineWidth: 0,
        max: 3.3,
        min: -0.5,
        tickInterval: 0.1,
        opposite: false,
        plotLines: [{
          color: '#aaa096',
          label: {
            style: {
              color: '#222',
              fontSize: '16px',
              fontWeight: 600,
              lineHeight: '18px'
            },
            text: 'Developed economies',
            x: -10,
            y: -25
          },
          value: 3,
          width: 1,
          zIndex: 0,
        }, {
          color: '#aaa096',
          label: {
            style: {
              color: '#222',
              fontSize: '16px',
              fontWeight: 600,
              lineHeight: '18px'
            },
            text: 'Developing economies: Americas',
            x: -10,
            y: -25
          },
          value: 2,
          width: 1,
          useHTML: true,
          zIndex: 0
        }, {
          color: '#aaa096',
          label: {
            style: {
              color: '#222',
              fontSize: '16px',
              fontWeight: 600,
              lineHeight: '18px'
            },
            text: 'Developing economies: Asia and Oceania',
            x: -10,
            y: -25
          },
          value: 1,
          width: 1,
          zIndex: 0
        }, {
          color: '#aaa096',
          label: {
            style: {
              color: '#222',
              fontSize: '16px',
              fontWeight: 600,
              lineHeight: '18px'
            },
            text: 'Developing economies: Africa',
            x: -10,
            y: -25
          },
          value: 0,
          width: 1,
          zIndex: 0
        }],
        showFirstLabel: show_first_label,
        showLastLabel: true,
        title: {
          enabled: true,
          reserveSpace: true,
          style: {
            color: 'rgba(0, 0, 0, 0.8)',
            fontFamily: 'Roboto',
            fontSize: '16px',
            fontWeight: 400
          },
          text: null
        }
      }
    });
    chartRef.current.querySelector(`#chartIdx${idx}`).style.opacity = 1;
  }, [allow_decimals, data, idx, line_width, note, show_first_label, source, subtitle, title]);

  useEffect(() => {
    if (isVisible === true) {
      setTimeout(() => {
        createChart();
      }, 300);
    }
  }, [createChart, isVisible]);

  return (
    <div className="chart_container">
      <div ref={chartRef}>
        {(isVisible) && (<div className="chart" id={`chartIdx${idx}`} />)}
      </div>
      <noscript>Your browser does not support JavaScript!</noscript>
    </div>
  );
}

LineChart.propTypes = {
  allow_decimals: PropTypes.bool,
  data: PropTypes.instanceOf(Array).isRequired,
  idx: PropTypes.string.isRequired,
  line_width: PropTypes.number,
  note: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  show_first_label: PropTypes.bool,
  source: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  title: PropTypes.string.isRequired,
};

LineChart.defaultProps = {
  allow_decimals: true,
  line_width: 5,
  note: false,
  show_first_label: true,
  subtitle: false
};

export default LineChart;
