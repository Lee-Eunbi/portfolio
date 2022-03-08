Chart.defaults.font.size = 14;
Chart.defaults.font.family =  "Noto Sans";

Chart.defaults.font.weight = 'Bold';


new Chart(document.getElementById("radar-chart"), {
    type: 'radar',
    data: {
      labels: ["HTML5", "CSS3", "jQuery", "Photoshop & Illustrator", "Vue.js", "Javascript"],
      datasets: [
        {
          fill: true,
          backgroundColor: "rgba(124, 176, 255, 0.4)",
          borderColor: "#a9d6e5",
          pointBackgroundColor: "#0a6496",
          pointBorderColor: "#fff",
          data: [80, 80, 70, 80, 60, 70]
        }
      ]
    },options: {
      responsive: false,
      scales: {
        r: {
          angleLines: {
            display: false
          },
          suggestedMin: 0,
          suggestedMax: 100,
          ticks: {
            stepSize: 20
          },
          pointLabels: {
            font: 14
          },
          grid: {
            lineWidth: 2,
            color: "#bbb",
            borderDash: context => context.index == 6 ? [] : [6, 4],
          }
          
        }
      },
      plugins: {
        legend: {
          display: false
        }
      }
    }
});
