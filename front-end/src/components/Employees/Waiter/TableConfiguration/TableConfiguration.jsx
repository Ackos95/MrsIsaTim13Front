import React, { Component } from 'react';


class TableConfiguration extends Component {

  constructor(props) {
    super(props);

    this.renderTables = this.renderTables.bind(this);
  }

  componentDidMount() {
    const { loadConfiguration, user: { token, restaurant: { id } } } = this.props;

    loadConfiguration({ data: { restaurant_id: id, date: new Date(), hours: "3" }, userToken: token });
  }

  renderTables() {
    const { tableConfiguration, selectTable } = this.props;
    // const selectTable = () => {};

    if (!tableConfiguration)
      return null;

    return tableConfiguration.tables.map((table) => (
      <div key={`TABLE_CONFIG_ID_${table.id}`}>
        <p>Table {table.id}, chairs: {table.chairCount}</p>
        <button disabled={!!table.occupied} onClick={() => selectTable(table)}> Select </button>
      </div>
    ));
  }

  render() {
    return (
      <div>
        <h2> Here is table configuration... </h2>
        <div>
          <ul>
            {this.renderTables()}
          </ul>
        </div>
      </div>
    );
  }
}

export default TableConfiguration;