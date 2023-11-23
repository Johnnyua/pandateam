import { createElement } from '../../helpers/index.js';

Chart.defaults.color = '#000';

const chart = (data, chartId) => {
  const chartContainer = createElement({
    tagName: 'canvas',
    className: 'weather__content__chart chart',
    attributes: {
      'data-chart': chartId,
    },
  });
  const newChart = new Chart(chartContainer, {
    type: 'line',
    data: {
      labels: data.map((row) => row.date),
      datasets: [
        {
          label: 'Acquisitions by year',
          data: data.map((row) => row.temp),
        },
      ],
    },
  });
  return newChart.canvas;
};

export { chart };
