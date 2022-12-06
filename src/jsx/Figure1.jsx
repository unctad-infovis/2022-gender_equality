import React, { useState, useEffect } from 'react';

// import { transpose } from 'csv-transpose';

// Load helpers.
import CSVtoJSON from './helpers/CSVtoJSON.js';
import ChartLine from './components/ChartLine.jsx';

import '../styles/styles.less';

function Figure1() {
  // Data states.
  const [dataFigure, setDataFigure] = useState(false);

  const cleanData = (data) => data.map((el, i) => {
    const labels = Object.keys(el).filter(val => val !== 'country').map(val => val);
    const values = Object.values(el).map(val => (parseFloat(val))).filter(val => !Number.isNaN(val));
    return ({
      data: values.map((val, j) => ({
        id: labels[j] + el.country,
        marker: {
          enabled: labels[j] !== 'Average',
          radius: (labels[j] === 'Average') ? 0 : 16
        },
        name: labels[j],
        x: val,
        y: i
      })),
      opacity: 1,
      name: el.country
    });
  });

  useEffect(() => {
    const data_file = `${(window.location.href.includes('unctad.org')) ? 'https://storage.unctad.org/2022-gender_equality/' : './'}assets/data/2022-gender_equality_figure_1.csv`;
    try {
      fetch(data_file)
        .then((response) => {
          if (!response.ok) {
            throw Error(response.statusText);
          }
          return response.text();
        })
        .then(body => setDataFigure(cleanData(CSVtoJSON((body)))));
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <div className="app">
      {dataFigure && (
      <ChartLine
        data={dataFigure}
        data_decimals={0}
        idx="1"
        note=""
        source="UNCTAD Inclusive Growth Index (IGI)"
        subtitle="Distribution of the IGI gender equality component, by region, 2020"
        suffix=""
        line_width={0}
        title="Regional disparities in gender inequality persist"
        ylabel=""
      />
      )}
    </div>
  );
}

export default Figure1;
