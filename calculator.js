document.addEventListener("DOMContentLoaded", () => {

    // -----------------------------
    // ELEMENTS
    // -----------------------------
    const onceSlider = document.getElementById("onceSlider");
    const onceInput = document.getElementById("onceInput");

    const monthlySlider = document.getElementById("monthlySlider");
    const monthlyInput = document.getElementById("monthlyInput");

    const yearsSlider = document.getElementById("yearsSlider");
    const yearsLabel = document.getElementById("yearsLabel");

    const riskSelect = document.getElementById("riskSelect");

    // Output fields
    const totalValueEl = document.getElementById("totalValue");
    const totalDepositsEl = document.getElementById("totalDeposits");
    const totalReturnEl = document.getElementById("totalReturn");
    const vsSavingEl = document.getElementById("vsSaving");

    // Sustainability
    const co2El = document.getElementById("co2");
    const kmSavingsEl = document.getElementById("kmSavings");
    const meatSavingsEl = document.getElementById("meatSavings");
    const showerSavingsEl = document.getElementById("showerSavings");

    // Chart elements
    const scenarioCanvas = document.getElementById("scenarioChart");
    const pieCanvas = document.getElementById("pieChart");

    // -----------------------------
    // SLIDER + INPUT SYNC
    // -----------------------------
    function syncInputs(slider, input) {
        slider.addEventListener("input", () => {
            input.value = slider.value;
            calculate();
        });
        input.addEventListener("input", () => {
            slider.value = input.value;
            calculate();
        });
    }

    syncInputs(onceSlider, onceInput);
    syncInputs(monthlySlider, monthlyInput);

    yearsSlider.addEventListener("input", () => {
        yearsLabel.textContent = yearsSlider.value + " jaar";
        calculate();
    });

    riskSelect.addEventListener("change", calculate);

    // -----------------------------
    // FINANCIAL CALCULATION
    // -----------------------------
    function compoundFV(startAmount, monthly, years, rate) {
        const n = years * 12;
        const r = rate / 12;

        return (
            startAmount * Math.pow(1 + r, n) +
            monthly * ((Math.pow(1 + r, n) - 1) / r)
        );
    }

    // Default scenario interest percentages
    const RATES = {
        pessimistic: 0.02,
        expected: 0.045,
        optimistic: 0.07,
        saving: 0.01
    };

    // -----------------------------
    // MAIN CALCULATION LOGIC
    // -----------------------------
    function calculate() {
        const once = parseFloat(onceInput.value) || 0;
        const monthly = parseFloat(monthlyInput.value) || 0;
        const years = parseInt(yearsSlider.value);

        const totalDeposits = once + monthly * (years * 12);

        // Scenario values
        const fvPess = compoundFV(once, monthly, years, RATES.pessimistic);
        const fvExp = compoundFV(once, monthly, years, RATES.expected);
        const fvOpt = compoundFV(once, monthly, years, RATES.optimistic);
        const fvSave = compoundFV(once, monthly, years, RATES.saving);

        // Update main output
        totalValueEl.textContent = "€ " + fvExp.toFixed(0).toLocaleString();
        totalDepositsEl.textContent = "€ " + totalDeposits.toLocaleString();
        totalReturnEl.textContent = "€ " + (fvExp - totalDeposits).toFixed(0).toLocaleString();
        vsSavingEl.textContent = "€ " + (fvExp - fvSave).toFixed(0).toLocaleString();

        // Sustainability multipliers (example values)
        const co2 = ((fvExp - totalDeposits) / 200).toFixed(0); // 1 unit per €200 profit
        const km = (co2 * 3).toFixed(0); // 3 km per 1 kg CO2
        const meat = (co2 * 0.6).toFixed(0);
        const shower = (co2 * 2).toFixed(0);

        co2El.textContent = co2;
        kmSavingsEl.textContent = km;
        meatSavingsEl.textContent = meat;
        showerSavingsEl.textContent = shower;

        updateScenarioChart(once, monthly, years);
        updatePieChart(riskSelect.value);
    }

    // -----------------------------
    // SCENARIO LINE CHART
    // -----------------------------
    let scenarioChart;

    function updateScenarioChart(once, monthly, years) {
        const labels = Array.from({ length: years + 1 }, (_, i) => i); // years 0 → n

        function buildData(rate) {
            return labels.map((y) =>
                compoundFV(once, monthly, y, rate)
            );
        }

        const data = {
            labels,
            datasets: [
                {
                    label: "Pessimistisch",
                    data: buildData(RATES.pessimistic),
                    borderColor: "#D97A7A",
                    borderWidth: 2,
                    fill: false
                },
                {
                    label: "Verwacht",
                    data: buildData(RATES.expected),
                    borderColor: "#5AAA6E",
                    borderWidth: 2,
                    fill: false
                },
                {
                    label: "Optimistisch",
                    data: buildData(RATES.optimistic),
                    borderColor: "#8B5CF6",
                    borderWidth: 2,
                    fill: false
                },
                {
                    label: "Sparen",
                    data: buildData(RATES.saving),
                    borderColor: "#AAA",
                    borderDash: [5, 5],
                    borderWidth: 2,
                    fill: false
                }
            ]
        };

        if (scenarioChart) {
            scenarioChart.destroy();
        }

        scenarioChart = new Chart(scenarioCanvas.getContext("2d"), {
            type: "line",
            data,
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: false
                    }
                }
            }
        });
    }

    // -----------------------------
    // PIE CHART (portfolio)
    // -----------------------------
    let pieChart;

    function updatePieChart(risk) {
        let dist = { micro: 30, bonds: 40, stocks: 30 };

        if (risk === "low") dist = { micro: 40, bonds: 50, stocks: 10 };
        if (risk === "high") dist = { micro: 10, bonds: 20, stocks: 70 };

        const data = {
            labels: ["Microkrediet", "Obligaties", "Aandelen"],
            datasets: [
                {
                    data: [dist.micro, dist.bonds, dist.stocks],
                    backgroundColor: ["#007F5F", "#FFBA08", "#E85D04"]
                }
            ]
        };

        if (pieChart) {
            pieChart.destroy();
        }

        pieChart = new Chart(pieCanvas.getContext("2d"), {
            type: "pie",
            data,
            options: {
                responsive: true,
                plugins: {
                    legend: { position: "bottom" }
                }
            }
        });
    }

    // Initial run
    calculate();
});
