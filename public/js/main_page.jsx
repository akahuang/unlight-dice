/*  - RecordPage
 *    - Navtab
 *      - Nav
 *    - ScoreGroup
 *      - HostScore
 *      - GuestScore
 *    - PlayerButtonGroup
 *      - PlayerButton
 *    - ActionButtonGroup
 *    - ResultButtonGroup
 */

function RollDice(number) {
  var ret = 0;
  for (var i = 0; i < number; i++) {
    if (Math.random() * 3 > 1) {
      ret += 1;
    }
  }
  return ret;
}

var MainPage = React.createClass({
  getInitialState: function() {
    return {
      hit: "???",
      number_arr: [],
      total: 0,
    };
  },

  onNumberClick: function(button, event) {
    var num = parseInt(button.props.name);
    console.info("onNumberClick: ");
    console.info(num);
    var new_state = Object.assign({}, this.state);
    new_state.number_arr.push(num);
    new_state.total += num;
    this.setState(new_state);
  },
  onResetClick: function() {
    this.setState({
      hit: "???",
      number_arr: [],
      total: 0,
    });
  },
  onPopClick: function() {
    var new_state = Object.assign({}, this.state);
    console.info(new_state);
    var number = new_state.number_arr.pop();
    new_state.total -= number;
    console.info(new_state);
    this.setState(new_state);
  },
  onRollDiceClick: function() {
    var new_state = Object.assign({}, this.state);
    new_state.hit = RollDice(this.state.total);
    this.setState(new_state);
  },

  render: function() {
    var display1 = this.state.number_arr.join(" + ");
    if (display1 == "") display1 = "0";
    var display2 = "= " + this.state.total;
    console.info(display1 + display2);
    return (
      <div className="container-fluid">
        <div className="col-md-9  col-xs-9">
          <h2> {display1} </h2>
          <h2> {display2} </h2>
        </div>
        <div className="col-md-3  col-xs-3">
          <h2> Hit: {this.state.hit} </h2>
        </div>

        <div className="col-md-9 col-xs-9">
          <div className="row ">
            <MyButton button_count="3" onClick={this.onNumberClick} name="7" />
            <MyButton button_count="3" onClick={this.onNumberClick} name="8" />
            <MyButton button_count="3" onClick={this.onNumberClick} name="9" />
          </div>
          <div className="row">
            <MyButton button_count="3" onClick={this.onNumberClick} name="4" />
            <MyButton button_count="3" onClick={this.onNumberClick} name="5" />
            <MyButton button_count="3" onClick={this.onNumberClick} name="6" />
          </div>
          <div className="row">
            <MyButton button_count="3" onClick={this.onNumberClick} name="1" />
            <MyButton button_count="3" onClick={this.onNumberClick} name="2" />
            <MyButton button_count="3" onClick={this.onNumberClick} name="3" />
          </div>
          <div className="row">
            <MyButton button_count="1" onClick={this.onNumberClick} name="10" />
          </div>
        </div>
        <div className="col-md-3 col-xs-3">
            <MyButton button_count="1" onClick={this.onResetClick} name="AC" />
            <MyButton button_count="1" onClick={this.onPopClick} name="Back" />
            <MyButton button_count="1" onClick={this.onRollDiceClick} name="Roll Dice" />
        </div>
      </div>
    );
  }
});

var MyButton = React.createClass({
/* props.button_count: how many button in a row
 * props.enabled: Is the button pressed?
 * props.name: The text in the button
 */
  render: function() {
    var size = (12 / this.props.button_count).toFixed();
    var div_class = " col-md-" + size + " col-xs-" + size;
    var btn_class = (this.props.enabled ? " btn-primary" : " btn-default");

    var remain_props = Object.assign({}, this.props);
    delete remain_props.name;
    delete remain_props.button_count;
    delete remain_props.enabled;
    delete remain_props.onClick;
    return (
        <div className={"button-padding " + div_class}>
          <button type="button" className={"btn btn-block" + btn_class}
                  onClick={this.props.onClick.bind(null, this)}
                  {...remain_props}>
            {this.props.name}
        </button>
        </div>
    );
  }
});

ReactDOM.render(
  <MainPage />,
  document.body
);
