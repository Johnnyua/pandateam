import { createElement } from '../../helpers/index.js';
import { locale } from '../../config/config.js';

const langState = () => {
  const langStore = useLangStore();
  return langStore.state;
};
Chart.defaults.color = '#000';

const chart = (data, chartId) => {
  const langStore = langState();
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
          label: locale[langStore.lang].title.chartTitle,
          data: data.map((row) => row.temp),
        },
      ],
    },
  });
  return newChart.canvas;
};

export { chart };
