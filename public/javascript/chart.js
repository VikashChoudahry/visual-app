/**
 * This can be optimized further to make it more modular and reusable.
 * For e.g all the helpers can be moved to a separate file and can be imported here.
 */

const APP_CONFIG = {
    dateRange: {
        start: "2020-11-01",
        end: "2021-12-31",
    },
    apiUrl: 'http://localhost:3050/listings',
    pagination: {
        defaultSize: 10,
    },
};
  
const getRandomColor = () => {
    // Generate random values for RGB components
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);

    // Create the color string in hexadecimal format
    const color = "#" + r.toString(16) + g.toString(16) + b.toString(16);
    return color;
};

const processDataBeforeDrawingChart = (averageRevenueBySitesData) => {
    // Process the data
    return averageRevenueBySitesData.reduce((prev, curr) => {
        const key = `${curr.site_id}`;
    
        if (key in prev) {
            prev[key].data.push(curr.count);
        } else {
          prev[key] = {
            label: `${curr.site_title}`,
            data: [curr.count],
            borderColor: getRandomColor(),
            revenue: curr.revenue,
            borderWidth: 0.9,
          };
        }
        return prev;
    }, {});
}

const getUniqueLabelsByTimestamp = (averageRevenueBySitesData) => {
    const labelsByTimestamp = []; // To store distinct labels by timestamp
    averageRevenueBySitesData.forEach(function (listing) {
        const month = listing.timestamp_label;

        if (!labelsByTimestamp.includes(month)) {
            labelsByTimestamp.push(month);
        }
    });
    return labelsByTimestamp;
}

const renderLineChart = (elementId, averageRevenueBySitesData) => {
    const lineChart = document.getElementById(elementId);

    // Get Line data
    const formattedDatasets = Object.values(processDataBeforeDrawingChart(averageRevenueBySitesData));
    const uniqueLabelsByTimestamp = getUniqueLabelsByTimestamp(averageRevenueBySitesData);

    new Chart(lineChart, {
        type: "line",
        data: {
            labels: uniqueLabelsByTimestamp,
            datasets: formattedDatasets,
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            onLoad: function() {
                // Remove the loader
                document.getElementById('chart-loader').remove();
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        text: "Listings (Count)",
                        display: true,
                    },
                },
                x: {
                    title: {
                        text: "Year & Month",
                        display: true,
                    },
                },
            },
            plugins: {
                legend: {
                    position: "right",
                    align: "middle",
                },
                tooltip: {
                    callbacks: {
                        label: function (context) {
                            let label = context.dataset.label;

                            return [
                                `label: ${context.dataset.label}`,
                                `Revenue(Avg): ${context.dataset.revenue}`,
                                `New Listing(count): ${context.parsed.y}`,
                            ];
                        },
                    },
                },
            },
        },
    });
};

const updateListingData = () => {
    const updateListingElement = document.getElementById("fetch-selected-listing-data");
    if (updateListingElement) {
        updateListingElement.addEventListener("click", () => {
            const startDate = document.getElementById("startDate").value || APP_CONFIG.dateRange.start;
            const endDate = document.getElementById("endDate").value || APP_CONFIG.dateRange.end;
            const limit = +document.getElementById("limit").value || +APP_CONFIG.pagination.defaultSize;
            // window.location.href = `${APP_CONFIG.apiUrl}?startDate=${startDate}&endDate=${endDate}`;
            window.location.href = `${APP_CONFIG.apiUrl}?startDate=${startDate}&endDate=${endDate}&limit=${limit}&offset=0`;
        });
    }
    return;
}

const setPlaceHolder = () => {
    $("#listings-table #table-search-columns th").each(function () {
        const title = $(this).text();
        $(this).html('<input type="text" placeholder="Search ' + title + '" />');
    });
}

const setDefaultLimit = () => {
    $(`select option[value="${APP_CONFIG.pagination.defaultSize}"]`).attr("selected",true);    // Set default value for pagination
}

window.addEventListener("DOMContentLoaded", () => {
    updateListingData();    // If user selects a date range, update the listing data
    setPlaceHolder();    // Set placeholder for search input
    setDefaultLimit();  // Set default value for pagination

    const dealsDataTable = $("#listings-table").DataTable({
        pageLength: APP_CONFIG.pagination.defaultSize,
        responsive: true,
    });
    $("#listings-table #table-search-columns th input").on("keyup change", function() {
            dealsDataTable
            .column($(this).parent().index() + ":visible")
            .search(this.value)
            .draw();
        }
    );
});