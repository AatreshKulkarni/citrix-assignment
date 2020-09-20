import React, { useMemo } from "react";

const useSortableData = (items, config = null) => {
  const [sortConfig, setSortConfig] = React.useState(config);

  const sortedItems = useMemo(() => {
    let sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return { items: sortedItems, requestSort, sortConfig };
};

const Table = (props) => {
  const [search, setSearch] = React.useState("");
  const { items, requestSort, sortConfig } = useSortableData(props.items);
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  function searchFunc(rows) {
    const columns = rows[0] && Object.keys(rows[0]);
    return rows.filter((row) =>
      columns.some(
        (column) =>
          row[column].toString().toLowerCase().indexOf(search.toLowerCase()) >
          -1
      )
    );
  }

  let filteredItems = searchFunc(items);

  return (
    <div id="tableContainer">
      <h2>Risk Category Summary</h2>
      <input
        type="text"
        className="search"
        placeholder="Search..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <table id="table">
        <thead>
          <tr>
            <th>
              <button
                type="button"
                onClick={() => requestSort("category")}
                className={getClassNamesFor("category")}
              >
                category
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort("high")}
                className={getClassNamesFor("high")}
              >
                high
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort("medium")}
                className={getClassNamesFor("medium")}
              >
                medium
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort("low")}
                className={getClassNamesFor("low")}
              >
                low
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort("impactPercent")}
                className={getClassNamesFor("impactPercent")}
              >
                impactPercent
              </button>
            </th>
            <th>
              <button
                type="button"
                onClick={() => requestSort("value")}
                className={getClassNamesFor("value")}
              >
                value
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map((item, index) => (
            <tr key={index}>
              <td>{item.category}</td>
              <td>{item.high}</td>
              <td>{item.medium}</td>
              <td>{item.low}</td>
              <td>{item.impactPercent}</td>
              <td>{item.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
