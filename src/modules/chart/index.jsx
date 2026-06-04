import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as d3 from 'd3';
import { getPetHealthData } from '@api/pethealth';

const Chart = () => {
  // Format incoming data without mutating the original props
  const formatChartData = useCallback((rawData) => {
    if (!rawData || rawData.length === 0) return [];

    const formattedChartData = [];
    
    // Create a deep copy to avoid mutating React props
    const copiedData = rawData.map(item => {
      const dateStr = new Date(item.date);
      dateStr.setDate(dateStr.getDate() + 1);
      return { ...item, date: dateStr };
    });

    // Setup attributes structure based on the first item
    for (let key in copiedData[0]) {
      if (key !== 'date' && key !== 'id') {
        formattedChartData.push({
          attribute: key,
          datapoints: []
        });
      }
    }

    // Populate datapoints
    copiedData.forEach(item => {
      for (let key in item) {
        if (key !== 'date' && key !== 'id') {
          const targetAttr = formattedChartData.find(attr => attr.attribute === key);
          if (targetAttr) {
            targetAttr.datapoints.push({ date: item.date, attribute: item[key] });
          }
        }
      }
    });

    formattedChartData.forEach(attrItem => {
      attrItem.datapoints.sort((a, b) => a.date - b.date);
    });

    return formattedChartData;
  }, []);

  const data = getPetHealthData();
  const processedData = formatChartData(data);
  const chartRef = useRef(null);
  const chartAdded = useRef(false);

  // Helper to generate dates at intervals
  const getDatesAtInterval = useCallback((start, end, maxDates = 20) => {
    const dates = [];
    const startTime = new Date(start).getTime();
    const endTime = new Date(end).getTime();
    const diffTime = endTime - startTime;
    const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (totalDays <= maxDates) {
      for (let i = 0; i <= totalDays; i++) {
        let d = new Date(startTime);
        d.setDate(d.getDate() + i);
        dates.push(d);
      }
      return dates;
    }

    const step = totalDays / (maxDates - 1);
    for (let i = 0; i < maxDates; i++) {
      let d = new Date(startTime);
      d.setDate(d.getDate() + Math.round(i * step));
      dates.push(d);
    }
    return dates;
  }, []);
  
  // Main D3 draw/update effect
  useEffect(() => {
    if (!processedData.length) return;
    
    const margin = { top: 20, right: 25, bottom: 20, left: 25 };
    const svgElement = d3.select(chartRef.current);
    const width = window.innerWidth;
    const height = parseInt(svgElement.style('height')) - 50;

    // Define scales (Updated to modern D3 syntax)
    const xScale = d3.scaleTime()
      .range([0, width])
      .domain(d3.extent(processedData[0].datapoints, d => d.date));
      
    const yScale = d3.scaleLinear()
      .range([height, 0])
      .domain([0, 10]);

    // Define axes (Updated to modern D3 syntax)
    const xAxis = d3.axisBottom(xScale)
      .tickSizeInner(-height - margin.top)
      .tickSizeOuter(0)
      .tickPadding(10)
      .tickFormat(() => '');
      //.tickFormat(d3.timeFormat('%b %d'));
      
    const yAxis = d3.axisLeft(yScale);

    // Define line (Updated to modern D3 syntax)
    const line = d3.line()
      .curve(d3.curveCardinal)
      .x(d => xScale(d.date))
      .y(d => yScale(d.attribute));

    // Clear previous SVG content if redrawing entirely
    if (!chartAdded.current) {
      svgElement.selectAll("*").remove();
      
      const svg = svgElement
        .attr('width', width + margin.left + margin.right)
        .attr('height', height)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

      // Add x-axis
      svg.append('g')
        .attr('class', 'o-axis--x')
        .attr('transform', `translate(0,${height})`)
        .call(xAxis);

      // Add y-axis
      svg.append('g')
        .attr('class', 'o-axis--y')
        .call(yAxis);

      // Remove first tick from y-axis
      svg.selectAll('.o-axis--y .tick')
        .each(function(d) {
          if (d === 0) d3.select(this).remove();
        });

      // Add line attributes
      svg.selectAll('.o-line')
        .data(processedData)
        .enter()
        .append('path')
        .attr('class', d => `o-line o-line--${d.attribute}`)
        .attr('d', d => line(d.datapoints))
        .style('fill', 'none')
        .style('stroke-dasharray', function() { 
          const length = this.getTotalLength();
          return `${length} ${length}`; 
        })
        .style('stroke-dashoffset', function() { 
          return this.getTotalLength(); 
        });

      chartAdded.current = true;
    }

    // Update function for resize
    const updateXAxis = () => {
      xScale.range([0, window.innerWidth]);
      const customTicks = getDatesAtInterval(xScale.domain()[0], xScale.domain()[1]);

      svgElement.select('.o-axis--x')
        .call(xAxis.tickValues(customTicks));

      svgElement.selectAll('.o-line')
        .attr('d', d => line(d.datapoints));        
    };

    // Attach resize listener
    window.addEventListener('resize', updateXAxis);
    updateXAxis();

    // Cleanup function
    return () => {
      window.removeEventListener('resize', updateXAxis);
    };
    
  }, [data, getDatesAtInterval]);

  return (
    <div className="progress-chart-wrapper">
      <svg ref={chartRef} className="progress-chart"></svg>
    </div>
  );
};

export default Chart;