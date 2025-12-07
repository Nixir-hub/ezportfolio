import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import { useLanguage } from "../contexts/language_context_provider";


const InteractiveMLChartLive = () => {
  const svgRef = useRef();
  const lossRef = useRef();

  const [points, setPoints] = useState([]);
  const [grid, setGrid] = useState(null);
  const [line, setLine] = useState(null);

  const [mode, setMode] = useState("classify");

  const [selectedLabel, setSelectedLabel] = useState(0);

  const [epochs, setEpochs] = useState(200);
  const [lr, setLR] = useState(0.01);

  const [regFunction, setRegFunction] = useState("linear");

  const [lossHistory, setLossHistory] = useState([]);
  const { t } = useLanguage();

  const width = 800;
  const height = 600;
  const margin = { top: 40, right: 40, bottom: 40, left: 40 };

  const xScale = d3.scaleLinear().domain([-10, 10]).range([margin.left, width - margin.right]);
  const yScale = d3.scaleLinear().domain([-10, 10]).range([height - margin.bottom, margin.top]);

  const colors = ["#1f77b4", "#ff7f0e", "#2ca02c", "#9467bd"];

  // ================================
  // RYSOWANIE GŁÓWNEGO WYKRESU
  // ================================
  const drawChart = () => {
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    // osie
    svg.append("g")
      .attr("transform", `translate(0, ${height - margin.bottom})`)
      .call(d3.axisBottom(xScale));

    svg.append("g")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(yScale));

    // --- CLASSIFY GRID ---
    if (grid && mode === "classify") {
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
    if (line && mode === "regression") {
      const path = d3.line()
        .x(d => xScale(d.x))
        .y(d => yScale(d.y));

      svg.append("path")
        .datum(line)
        .attr("d", path)
        .attr("stroke", "red")
        .attr("stroke-width", 2)
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
      .attr("fill", d => (mode === "classify" ? colors[d.label] : "blue"))
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

    svg.append("path")
      .datum(lossHistory)
      .attr("d", lineGen)
      .attr("stroke", "crimson")
      .attr("fill", "none")
      .attr("stroke-width", 2);

    svg.append("g")
      .attr("transform", `translate(0, ${h - margin.bottom})`)
      .call(d3.axisBottom(x));

    svg.append("g")
      .attr("transform", `translate(${margin.left}, 0)`)
      .call(d3.axisLeft(y));
  };

  useEffect(() => {
    drawChart();
    drawLoss();
  }, [points, grid, line, lossHistory, mode]);

  // ================================
  // CLICK -> ADD POINT
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
    if (!points.length) return alert("Add points!");

    setLossHistory([]);

    try {
      if (mode === "classify") {
        const res = await fetch("http://localhost:8001/api/ml/classify/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ points, epochs, lr, grid_res: 80 })
        });

        const data = await res.json();
        setGrid(data.grid);
        setLossHistory(data.loss_history || []);
      }

    if (mode === "regression") {
      const res = await fetch("http://localhost:8001/api/ml/regression/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          points,
          epochs,
          lr,
          regFunction
        })
      });

      if (!res.ok) {
        const txt = await res.text();
        console.error("Error regression:", txt);
        alert("Backend regression error.");
        return;
      }

      const data = await res.json();

      // backend return:  s (slope), b (bias), l (loss), e (epochs)
      const s = data.s;
      const b = data.b;

      // zbuduj linię
      const [xmin, xmax] = xScale.domain();
      setLine([
        { x: xmin, y: s * xmin + b },
        { x: xmax, y: s * xmax + b }
      ]);

      // if backend return one loss (l)
    if (Array.isArray(data.loss_history)) {
      setLossHistory(data.loss_history);
    } else if (typeof data.l === "number") {
      setLossHistory([data.l]); // fallback
    }

      // if backend return history strat
      if (Array.isArray(data.loss_history)) {
        setLossHistory(data.loss_history);
      }
    }


    } catch (e) {
      console.error(e);
      alert("Backend Error!");
    }
  };

  return (
    <div style={{ display: "flex", gap: 20 }}>
      <div>
        <div style={{ marginBottom: 10 }}>
          <label>Tryb:</label>
          <select value={mode} onChange={e => { setMode(e.target.value); setGrid(null); setLine(null); }}>
            <option value="classify">{t("classification")}</option>
            <option value="regression">{t("regression")}</option>
          </select>

          {mode === "classify" && (
            <span style={{ marginLeft: 10 }}>
              <label>Klasa: </label>
              <select value={selectedLabel} onChange={e => setSelectedLabel(Number(e.target.value))}>
                <option value={0}>0</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
              </select>
            </span>
          )}

          {mode === "regression" && (
            <span style={{ marginLeft: 10 }}>
              <label>Model: </label>
              <select value={regFunction} onChange={e => setRegFunction(e.target.value)}>
                <option value="linear">Linear</option>
                <option value="poly">Polynomial</option>
                <option value="sin">Sine</option>
              </select>
            </span>
          )}
        </div>

        {/* Controls */}
        <div>
          <label>Epochs: </label>
          <input type="number" min="1" max="2000" value={epochs} onChange={e => setEpochs(Number(e.target.value))} />

          <label style={{ marginLeft: 10 }}>LR: </label>
          <input type="number" step="0.001" value={lr} onChange={e => setLR(Number(e.target.value))} />
        </div>

        {/* SVG */}
        <svg
          ref={svgRef}
          width={width}
          height={height}
          onClick={handleClick}
          style={{ border: "1px solid #aaa", background: "#f8f8f8", cursor: "crosshair", marginTop: 10 }}
        />

        {/* Buttons */}
        <div style={{ marginTop: 10 }}>
          <button onClick={trainModel}>{t('train')}</button>
          <button onClick={() => { setPoints([]); setLine(null); setGrid(null); setLossHistory([]); }} style={{ marginLeft: 10 }}>Reset</button>
        </div>

        {/* Presets */}
        <div style={{ marginTop: 10 }}>
          <strong>Preset:</strong>
          <button onClick={generateMoon} style={{ marginLeft: 10 }}>Moon</button>
          <button onClick={generateSun} style={{ marginLeft: 5 }}>Sun</button>
          <button onClick={generateLinear} style={{ marginLeft: 5 }}>Linear</button>
        </div>
      </div>

      <div>
        <svg ref={lossRef} width={width} height={200} style={{ border: "1px solid #ccc" }} />
      </div>
    </div>
  );
};

export default InteractiveMLChartLive;
