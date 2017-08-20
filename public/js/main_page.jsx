function RollDice(number) {
  console.log("RollDice " + number.toString());
  var ret = 0;
  for (var i = 0; i < number; i++) {
    if (Math.random() * 3 < 1) {
      ret += 1;
    }
  }
  return ret;
}

function Sum(num_arr) {
  var sum = 0;
  for (var i = 0; i < num_arr.length; i++) {
    sum += num_arr[i];
  }
  return sum;
}

function Display(num_arr) {
  var sum = Sum(num_arr);
  var display = num_arr.join(" + ");
  if (display == "") display = "0";
  display += " = " + sum;
  return display;
}

var MainPage = React.createClass({
  getInitialState: function() {
    return {
      site: 0,
      hit: ["?", "?"],
      number_arr: [[], []],
    };
  },

  onNumberClick: function(button, event) {
    var num = parseInt(button.props.name);
    console.info("onNumberClick: ");
    console.info(num);
    var new_state = Object.assign({}, this.state);
    new_state.number_arr[this.state.site].push(num);
    this.setState(new_state);
    console.info(new_state);
  },
  onResetClick: function() {
    this.setState({
      site: 0,
      hit: ["?", "?"],
      number_arr: [[], []],
    });
  },
  onPopClick: function() {
    var new_state = Object.assign({}, this.state);
    console.info(new_state);
    if (new_state.number_arr[this.state.site].length == 0) {
      return;
    }
    new_state.number_arr[this.state.site].pop();
    console.info(new_state);
    this.setState(new_state);
  },
  onRollDiceClick: function() {
    var new_state = Object.assign({}, this.state);
    new_state.hit[0] = RollDice(Sum(this.state.number_arr[0]));
    new_state.hit[1] = RollDice(Sum(this.state.number_arr[1]));
    this.setState(new_state);
  },
  onSiteButtonClick: function(button, event) {
    var new_state = Object.assign({}, this.state);
    new_state.site = button.props.index;
    this.setState(new_state);
  },

  render: function() {
    var display1 = "攻方:" + Display(this.state.number_arr[0]);
    var display2 = "防方:" + Display(this.state.number_arr[1]);
    console.info(display1 + display2);
    return (
      <div className="container-fluid">
        <div className="col-md-8  col-xs-8">
          <h3> {display1} </h3>
          <h3> {display2} </h3>
        </div>
        <div className="col-md-4  col-xs-4">
          <h3> 骰出: {this.state.hit[0]} </h3>
          <h3> 骰出: {this.state.hit[1]} </h3>
        </div>

        <div className="row ">
          <MyButton button_count="3" onClick={this.onResetClick} name="歸零" />
          <MyButton button_count="3" onClick={this.onPopClick} name="刪除" />
          <MyButton button_count="3" onClick={this.onRollDiceClick} name="丟骰" />
        </div>
        <div className="row ">
          <MyButton button_count="2" onClick={this.onSiteButtonClick} index="0" enabled={this.state.site == 0} name="攻方" />
          <MyButton button_count="2" onClick={this.onSiteButtonClick} index="1" enabled={this.state.site == 1} name="防方" />
        </div>
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
