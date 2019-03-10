var inquirer = require("inquirer");

function Human(nam, healt){
  //set default value, in case they don't pass in a healt
  if (healt == undefined) healt = 100;
  this.name = nam;
  this.health = healt;
}

function Survivor(n, h){
  //putting the new keyword on line 19, does this
    // var this = {};
  this.lucky_number = Math.floor(Math.random()*30)+1;
  Human.call(this, n, h);
  //putting the new keyword on line 19, does this
    // return this;
}

// var s = new Survivor('rob', 500);

Survivor.prototype = Object.create(Human.prototype);

Survivor.prototype.escape = function(){
  // return false;

  var thisSurvivor = this;

  return inquirer
    .prompt([
      // Here we create a basic text prompt.
      {
        type: "input",
        message: "guess a num from 1 to 30",
        name: "num"
      }
    ])
    .then(function(inquirerResponse) {
      var guess = parseInt(inquirerResponse.num);
      var val;

      if (guess == thisSurvivor.lucky_number) {
        console.log('yup')
        val = true;
      }
      else {
        console.log('nope')
        val = false;
      }

      return val;
    })
}

//testing survivor
  // var s = new Survivor('pavan', 100);
  // console.log(s.lucky_number);

  //THE FOLLOWING DOES NOT WORK
    // var escapeValue = s.escape();
    // console.log(escapeValue);

  //THE FOLLOWING WORKS
    // s.escape().then(function(res){
    //   console.log(res);
    // });


function Monster(n, h, attack_num){
  this.attack_number = attack_num;
  Human.call(this, n, h);
}

Monster.prototype = Object.create(Human.prototype);

Monster.prototype.attack = function(){
  var ran = Math.floor(Math.random()*5)+1

  if (ran == 3) return false;
  else return true;
}

var m = new Monster('tiger man', 100, 9);

inquirer
  .prompt([
    // Here we create a basic text prompt.
    {
      type: "input",
      message: "what's your name?",
      name: "nam"
    }
  ])
  .then(function(inquirerResponse) {
    var s = new Survivor(inquirerResponse.nam, 100);

    function callEscape(){
      s.escape().then(function(res){
        var es = res;

        if (es){
          console.log('you have won!');
          return;

        }else{
          var a = m.attack();

          if (a != false){
            s.health -= m.attack_number;

            console.log(`you've lost ${m.attack_number} health and now you have a total of this much health: ${s.health}`)
            return;
          }else{
            console.log("you've dodged the monster's attack!");
            return;
          }
        }
      });
    }

    setInterval(callEscape, 4*1000);

    if (s.health <= 0){
      console.log(`the monster named ${m.name} got you`)
    }
  });








  