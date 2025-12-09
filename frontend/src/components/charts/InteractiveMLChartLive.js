import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import { useLanguage } from "../contexts/language_context_provider";

const InteractiveMLChartLive = () => {

  const svgRef = useRef();
  const lossRef = useRef();

  const [points, setPoints] = useState([]);
  const [grid, setGrid] = useState(null);
  const [line, setLine] = useState(null);
  const [activeTab, setActiveTab] = useState("classify");
  const [selectedLabel, setSelectedLabel] = useState(0);

  const [epochs, setEpochs] = useState(200);
  const [lr, setLR] = useState(0.01);

  const [regFunction, setRegFunction] = useState("linear");
  const [lossHistory, setLossHistory] = useState([]);

  const { t } = useLanguage();

  // RESPONSIVE WIDTH
  const width = window.innerWidth < 900 ? window.innerWidth - 40 : 800;
  const height = 500;

  const margin = { top: 40, right: 40, bottom: 40, left: 40 };

  const xScale = d3.scaleLinear().domain([-10, 10]).range([margin.left, width - margin.right]);
  const yScale = d3.scaleLinear().domain([-10, 10]).range([height - margin.bottom, margin.top]);

  const colors = ["#1f77b4", "#ff7f0e", "#2ca02c", "#9467bd"];

  // ================================
  // DRAW MAIN CHART
  // ================================
  const drawChart = () => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    svg.append("g")
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .call(d3.axisBottom(xScale));

    svg.append("g")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(yScale));

    // --- CLASSIFICATION BACKGROUND ---
    if (grid && activeTab === "classify") {
      const res = grid.res;
      const cellW = (width - margin.left - margin.right) / res;
      const cellH = (height - margin.top - margin.bottom) / res;

      svg.append("g")
        .selectAll("rect")
        .data(grid.classes)
        .join("rect")
        .attr("x", (_, i) => {
          const col = i % res;
          const x = grid.x_min + col * ((grid.x_max - grid.x_min) / (res - 1));
          return xScale(x);
        })
        .attr("y", (_, i) => {
          const row = Math.floor(i / res);
          const y = grid.y_min + row * ((grid.y_max - grid.y_min) / (res - 1));
          return yScale(y + (grid.y_max - grid.y_min) / res);
        })
        .attr("width", cellW)
        .attr("height", cellH)
        .attr("fill", d => colors[d])
        .attr("opacity", 0.3);
    }

    // --- REGRESSION LINE ---
    if (Array.isArray(line) && line.length > 1 && activeTab === "regression") {

      const lineGen = d3.line()
        .x(d => xScale(Number(d.x)))
        .y(d => yScale(Number(d.y)));

      svg.append("path")
        .datum(line)
        .attr("d", lineGen)
        .attr("stroke", "red")
        .attr("stroke-width", 3)
        .attr("fill", "none");
    }


    // --- POINTS ---
    svg.append("g")
      .selectAll("circle")
      .data(points)
      .join("circle")
      .attr("cx", d => xScale(d.x))
      .attr("cy", d => yScale(d.y))
      .attr("r", 6)
      .attr("fill", d => (activeTab === "classify" ? colors[d.label] : "blue"))
      .attr("stroke", "black")
      .attr("stroke-width", 1);
  };

  // ================================
  // LOSS
  // ================================
  const drawLoss = () => {
  const svg = d3.select(lossRef.current);
  svg.selectAll("*").remove();

  if (!lossHistory.length) return;

  const h = 200;
  const x = d3.scaleLinear().domain([0, lossHistory.length - 1]).range([margin.left, width - margin.right]);
  const y = d3.scaleLinear().domain([0, d3.max(lossHistory)]).range([h - margin.bottom, margin.top]);

  const lineGen = d3.line()
    .x((d, i) => x(i))
    .y(d => y(d));

  //  loss line
  svg.append("path")
    .datum(lossHistory)
    .attr("d", lineGen)
    .attr("stroke", "crimson")
    .attr("fill", "none")
    .attr("stroke-width", 2);

  // axis
  svg.append("g")
    .attr("transform", `translate(0, ${h - margin.bottom})`)
    .call(d3.axisBottom(x).ticks(5));
  svg.append("g")
    .attr("transform", `translate(${margin.left}, 0)`)
    .call(d3.axisLeft(y).ticks(5));

  // name of axis
  svg.append("text")
    .attr("text-anchor", "middle")
    .attr("x", (width + margin.left - margin.right) / 2)
    .attr("y", h - 5)
    .text("Epochs")
    .style("font-size", "12px")
    .style("fill", "#333");

  svg.append("text")
    .attr("text-anchor", "middle")
    .attr("transform", `translate(15, ${h/2}) rotate(-90)`)
    .text("Loss")
    .style("font-size", "12px")
    .style("fill", "#333");

  // Title
  svg.append("text")
    .attr("text-anchor", "middle")
    .attr("x", (width + margin.left - margin.right) / 2)
    .attr("y", margin.top / 2)
    .text("Training Loss")
    .style("font-size", "16px")
    .style("font-weight", "bold")
    .style("fill", "#333");
};

  useEffect(() => {
    drawChart();
    drawLoss();
  }, [points, grid, line, lossHistory, activeTab]);

  // ================================
  // ADD POINT BY CLICK
  // ================================
  const handleClick = (event) => {
    const [mx, my] = d3.pointer(event);
    const x = xScale.invert(mx);
    const y = yScale.invert(my);

    setPoints(p => [...p, { x, y, label: selectedLabel }]);
  };

  // ================================
  // PRESETS
  // ================================
  const generateMoon = () => {
    const arr = [];
    for (let i = 0; i < 200; i++) {
      const a = Math.random() * Math.PI;
      const r = 5 + Math.random();
      arr.push({ x: r * Math.cos(a), y: r * Math.sin(a), label: 0 });

      const r2 = 5 + Math.random();
      arr.push({ x: 4 + r2 * Math.cos(a), y: -2 + r2 * Math.sin(a), label: 1 });
    }
    setPoints(arr);
    setGrid(null);
    setLine(null);
  };

  const generateSun = () => {
    const arr = [];
    for (let i = 0; i < 200; i++) {
      const a = Math.random() * 2 * Math.PI;
      const r = Math.random() * 4;
      arr.push({ x: r * Math.cos(a), y: r * Math.sin(a), label: 0 });
    }
    setPoints(arr);
    setGrid(null);
    setLine(null);
  };

  const generateLinear = () => {
    const arr = [];
    for (let i = 0; i < 100; i++) {
      const x = -10 + Math.random() * 20;
      const y = 2 * x + 3 + (Math.random() - 0.5) * 3;
      arr.push({ x, y, label: 0 });
    }
    setPoints(arr);
    setGrid(null);
    setLine(null);
  };

  // ================================
  // TRAINING
  // ================================
  const trainModel = async () => {
    if (!points.length) {
      alert("Add points!");
      return;
    }

    setLossHistory([]);

    try {
      if (activeTab === "classify") {

        const res = await fetch(`/ml/classify/`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ points, epochs, lr, grid_res: 80 })
        });

        const data = await res.json();
        setGrid(data.grid);
        setLossHistory(data.loss_history || []);
      }

    if (activeTab === "regression") {
      let endpoint = `/ml/regression/`;

      if (regFunction === "linear") endpoint = `/ml/regression/`;
      if (regFunction === "poly")   endpoint = `/ml/regression/poly/`;
      if (regFunction === "sin")    endpoint = `/ml/regression/sin/`;

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ points, epochs, lr })
      });

      const data = await res.json();
      console.log("DATA FROM BACKEND:", data);

      // Tworzymy linię z backendu
      if (data.xs && data.ys) {
        const linePoints = data.xs.map((x, i) => ({ x, y: data.ys[i] }));
        setLine(linePoints);
      }

      setLossHistory(data.loss_history || []);
    }



    } catch (err) {
      console.error(err);
      alert("Backend Error!");
    }
  };

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        padding: 10
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 900,
          background: "#fff",
          padding: 20,
          borderRadius: 12,
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
        }}
      >

        {/* TABS */}
        <div style={{ display: "flex", marginBottom: 20 }}>
          <button
            onClick={() => setActiveTab("classify")}
            style={{
              flex: 1,
              padding: 10,
              background: activeTab === "classify" ? "#007bff" : "#eee",
              color: activeTab === "classify" ? "#fff" : "#333",
              border: "none",
              borderRadius: "8px 0 0 8px"
            }}
          >
            Classification
          </button>

          <button
            onClick={() => setActiveTab("regression")}
            style={{
              flex: 1,
              padding: 10,
              background: activeTab === "regression" ? "#007bff" : "#eee",
              color: activeTab === "regression" ? "#fff" : "#333",
              border: "none",
              borderRadius: "0 8px 8px 0"
            }}
          >
            Regression
          </button>
        </div>

        {/* PARAMETERS */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 15
          }}
        >
          <div>
            <label>Epochs: </label>
            <input
              type="number"
              min="1"
              value={epochs}
              onChange={e => setEpochs(Number(e.target.value))}
              style={{ width: 80 }}
            />

            <label style={{ marginLeft: 10 }}>LR: </label>
            <input
              type="number"
              step="0.001"
              value={lr}
              onChange={e => setLR(Number(e.target.value))}
              style={{ width: 80 }}
            />
          </div>

          {activeTab === "classify" && (
            <div>
              <label>Class: </label>
              <select
                value={selectedLabel}
                onChange={e => setSelectedLabel(Number(e.target.value))}
              >
                <option value={0}>0</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
              </select>
            </div>
          )}

          {activeTab === "regression" && (
            <div>
              <label>Model:</label>
              <select
                value={regFunction}
                onChange={e => setRegFunction(e.target.value)}
                style={{ marginLeft: 10 }}
              >
                <option value="linear">Linear</option>
                <option value="poly">Polynomial</option>
                <option value="sin">Sine</option>
              </select>
            </div>
          )}

          {/* PRESETS */}
          <div>
            <strong>Presets:</strong>
            <button onClick={generateMoon} style={{ marginLeft: 10 }}>Moon</button>
            <button onClick={generateSun} style={{ marginLeft: 5 }}>Sun</button>
            <button onClick={generateLinear} style={{ marginLeft: 5 }}>Linear</button>
          </div>
        </div>

        {/* SVG CHART */}
        <div style={{ marginTop: 20 }}>
          <svg
            ref={svgRef}
            width={width}
            height={height}
            onClick={handleClick}
            style={{
              border: "1px solid #aaa",
              background: "#f8f8f8",
              cursor: "crosshair",
              width: "100%",
            }}
              preserveAspectRatio="xMidYMid meet"
            viewBox={`0 0 ${width} ${height}`}
          />
        </div>

        {/* BUTTONS */}
        <div style={{ display: "flex", gap: 10, marginTop: 15 }}>
          <button onClick={trainModel}>Train</button>
          <button
            onClick={() => {
              setPoints([]);
              setLine(null);
              setGrid(null);
              setLossHistory([]);
            }}
          >
            Reset
          </button>
        </div>

        {/* LOSS PLOT */}
        <div style={{ marginTop: 20 }}>
          <svg ref={lossRef} width="100%" height="200" />
        </div>

      </div>
    </div>
  );
};

export default InteractiveMLChartLive;
