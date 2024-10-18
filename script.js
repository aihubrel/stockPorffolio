class Portfolio extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        portfolio: [
          {
            name: 'ABC Co.',
            shares_owned: 20,
            average_cost: 50,
            market_price: 130
          },{
            name: 'Happy Inc.',
            shares_owned: 5,
            average_cost: 200,
            market_price: 500
          },{
            name: 'Smile LLC',
            shares_owned: 100,
            average_cost: 20,
            market_price: 15
          }
        ],
        form: {
          name: '',
          shares_owned: 0,
          average_cost: 0,
          market_price: 0
        }
      };
  
      this.removeStock = this.removeStock.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleFormChange = this.handleFormChange.bind(this);
      this.addStock = this.addStock.bind(this);
      this.updatePrice = this.updatePrice.bind(this);
    }
  
    removeStock(index) {
      const portfolio = this.state.portfolio.slice(); // shallow copy
      portfolio.splice(index, 1); // remove value at index
  
      this.setState({ portfolio });
    }

    updatePrice() {
    const newPrice = Math.random() * (10 - 50000) + 10;
    }
    
    handleChange(event, index) {
      const portfolio = this.state.portfolio.slice(); // shallow copy
      const { name, value } = event.target;
  
      portfolio[index][name] = value;
      this.setState({ portfolio });
    }
  
    handleFormChange(event) {
      const { name, value } = event.target;
      const { form } = this.state;
  
      form[name] = value;
      this.setState({ form });
    }
  
    addStock(event) {
      event.preventDefault();
      const portfolio = this.state.portfolio.slice();
  
      portfolio.push(this.state.form);
      this.setState({
        portfolio,
        form: {
          name: '',
          shares_owned: 0,
          average_cost: 0,
          market_price: 0
        }
      });
      // reset form to empty
    }
  
    render() {
      const {
        portfolio,
        form,
      } = this.state;
      
      const portfolio_market_value = portfolio.reduce((sum, stock) => stock.shares_owned * stock.market_price + sum, 0);
      const portfolio_cost = portfolio.reduce((sum, stock) => stock.shares_owned * stock.average_cost + sum, 0);
      const portfolio_gain_loss = portfolio_market_value - portfolio_cost;
      return (
        <div className="container">
          <h1 className="text-center my-4">Stock Portfolio</h1>
          <div className="row">
            <div className="col-12">
              <table className="table table-responsive">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Average cost ($)</th>
                    <th scope="col">Price per stock  ($)</th>
                    <th scope="col">Account Value ($)</th>
                    <th scope="col">Unrealized Gain/Loss ($)</th>
                    <th scope="col">Gain/Loss (%)</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {portfolio.map((stock, index) => {
                    const {
                      name,
                      shares_owned,
                      average_cost,
                      market_price,
                    } = stock;
  
                    const market_value = shares_owned * market_price;
                    const unrealized_gain_loss = market_value - shares_owned * average_cost;
                    const percentage = ((unrealized_gain_loss / market_value) * 100).toFixed(2);
                    // Adopting the underscore_style for consistency
  
                    return (
                      <tr key={index}>
                        <td>{name}</td>
                        <td><input onChange={e => this.handleChange(e, index)} type="number" name="shares_owned" value={shares_owned} /></td>
                        <td><input onChange={e => this.handleChange(e, index)} type="number" name="average_cost" value={average_cost} /></td>
                        <td><input onChange={e => this.handleChange(e, index)} type="number" name="market_price" value={market_price} /></td>
                        <td>{market_value}</td>
                        <td>{unrealized_gain_loss}</td>
                        <td>{percentage}</td>
                        <td><button className="btn btn-light btn-sm" onClick={() => this.removeStock(index)}>remove</button></td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            <form className="col-12 mt-2 mb-4" onSubmit={this.addStock}>
              <input
                className="mx-2"
                name="name"
                type="text"
                placeholder="Name"
                onChange={this.handleFormChange}
                value={form.name}
                required
              />
              <input
                className="mx-2"
                name="shares_owned"
                type="number"
                placeholder="Shares"
                value={form.shares_owned}
                onChange={this.handleFormChange}
              />
              <input
                className="mx-2"
                name="average_cost"
                type="number"
                placeholder="Cost"
                value={form.average_cost}
                onChange={this.handleFormChange}
              />
              <input
                className="mx-2"
                name="market_price"
                type="number"
                placeholder="Price"
                value={form.market_price}
                onChange={this.handleFormChange}
              />
              <button className="btn btn-primary btn-sm">add</button>
            </form>

            <button className="btn btn-light btn-sm" onClick={() => this.updatePrice(index)}>Today's Stock Price</button>      

            <div className="col-12 col-md-6">
              <h4 className="mb-3">Portfolio value: $ {portfolio_market_value}</h4>
            </div>
            <div className="col-12 col-md-6">
              <h4 className="mb-3">Portfolio gain/loss: $ {portfolio_gain_loss}</h4>
            </div>
          </div>
        </div>
      );
    }
    // don't be lazy
  }
  
  
  const container = document.getElementById('root');
  const root = ReactDOM.createRoot(container);
  root.render(<Portfolio />);
  