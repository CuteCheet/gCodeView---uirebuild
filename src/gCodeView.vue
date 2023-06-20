<template>
  <div class="container-fluid p-5 text-white text-center" style="background-color: rgb(4,170,109);">
    <h1>gCodeView</h1>
  </div>

  <div class="container-fluid mt-5" style="padding:3%;">
    <div class="row">
      <div class="functions col-sm-3">
        <h3>Test Patterns</h3>
        <ul class="nav nav-pills flex-column functionbar" role="tablist" aria-orientation="vertical">
          <li class="nav-item">
            <a class="nav-link active" data-bs-toggle="pill" @click="onClickLeTest">LE test</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" data-bs-toggle="pill" @click="onClickPassTest">Passes test</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" data-bs-toggle="pill" @click="onClickDPITest">DPI test</a>
          </li>
        </ul>
      </div>
      <div class="input_fields col-sm-3">
        <h3>Input Fields:</h3>
        <div id="LeTestFields" v-if="this.testType===0">
          <input v-model="input_rowss"  type="text" class="form-control" placeholder="rows" data-bs-toggle="tooltip" data-bs-placement="right" title="Rows"/><br>
          <input v-model="input_heightt"  type="text" class="form-control" placeholder="height"  title="Height"/><br>
          <input v-model="input_columnss" type="text" class="form-control"  placeholder="columns"  title="Column"/><br>
          <input v-model="input_widthh" type="text" class="form-control"  placeholder="width"  title="Width"/><br>
          <input v-model="input_padding_fieldss" type="text" class="form-control"  placeholder="padding_fields"  title="Padding Fields"/><br>
          <input v-model="input_padding_letterss" type="text" class="form-control"  placeholder="padding_letters"  title="Padding Letters"/><br>
          <input v-model="input_lpii" type="text" class="form-control"  placeholder="lines per inch"  titel="Lines Per Inch"/><br>
          <input v-model="input_laser_power_ww" type="text" class="form-control"  placeholder="laser_power_w"  title="Laser power"/><br>
          <input v-model="input_laser_min_powerr" type="text" class="form-control"  placeholder="laser_min_power"  title="Laser Min Power"/><br>
          <input v-model="input_laser_max_powerr" type="text" class="form-control"  placeholder="laser_max_power"  title="Laser Max Power"/><br>
          <input v-model="input_laser_min_speedd" type="text" class="form-control"  placeholder="laser_min_speed"  title="Laser Min Speed"/><br>
          <input v-model="input_laser_max_speedd" type="text" class="form-control"  placeholder="laser_max_speed"  title="Laser Max Speed"/><br>
        </div>
        <div id="PassTestFields" v-if="this.testType===1">
          <input v-model="input_rowss"  type="text" class="form-control" placeholder="rows" data-bs-toggle="tooltip" data-bs-placement="right" title="Rows"/><br>
          <input v-model="input_heightt" type="text" class="form-control"  placeholder="Height"  title="Height"/><br>
          <input v-model="input_columnss" type="text" class="form-control"  placeholder="columns"  title="Column"/><br>
          <input v-model="input_widthh" type="text" class="form-control"  placeholder="Width"  title="Width"/><br>
          <input v-model="input_padding_fieldss" type="text" class="form-control"  placeholder="padding_fields"  title="Padding Fields"/><br>
          <input v-model="input_padding_letterss" type="text" class="form-control"  placeholder="padding_letters"  title="Padding Letters"/><br>
          <input v-model="input_passes_factorr"  type="text" class="form-control" placeholder="passes factor" data-bs-toggle="tooltip" data-bs-placement="right" title="Passes Factor"/><br>
          <input v-model="input_le_variancee"  type="text" class="form-control" placeholder="LE variance"  title="LE Variance"/><br>
          <input v-model="input_laser_power_ww" type="text" class="form-control"  placeholder="Laser Power"  title="Laser Power"/><br>
          <input v-model="input_laser_speedd" type="text" class="form-control"  placeholder="Laser Speed"  title="Laser Speed"/><br>
        </div>
        <button class = "btn btn-success" @click="runLaser">GO</button>&nbsp;&nbsp;&nbsp;
      </div>
      <div class="LElist col-sm-3">
        <h2>Output</h2>
        <p v-if="this.grid_rows>0" @click="downLoadgCode" class="downloadicon">
          Download gCode <img src="@/assets/image/download.png" style="width: 20px; height: 20px;" alt="download png">
        </p>
        <p v-if="this.testType===0"  id="cliresult"></p><br>
      </div>

      <div class="preview col-sm-3">
        <h3>Preview</h3>
        <p v-if="this.grid_rows>0 && this.testType<1" id="gridtitle">{{this.minLE}}-{{ this.maxLE }} L{{ ((this.maxLE-this.minLE) / (this.grid_columns*this.grid_rows-1)).toFixed(1)}}</p>
        <table v-if="this.testType<1">
          <tr v-for="i in this.grid_rows">
            <td v-for="j in this.grid_columns">
              {{ this.LEs[(i-1)*this.grid_columns+this.grid_columns-j].lev().toFixed(0)}}
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import {copysign, map_p, LE, Gcode, Le_field} from '../src/assets/js/total.js';
var laser;
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
});

class Laser {
  le_list = [];
  levs = [];
  constructor(power_w = 20, p_min = 1, p_max = 100, v_min = 60, v_max = 6000) {
    this.power_w = power_w;
    this.p_min = power_w * (p_min / 100);
    this.p_max = power_w * (p_max / 100);
    this.v_min = v_min;
    this.v_max = v_max;
    this.le_list = [];
    this.levs = [];
    this.le_max = new LE(this.p_max, this.v_min);
    this.le_min = new LE(this.p_min, this.v_max);
  }

  calc_new_le(lev_new, le_old, prio_velocity = true, new_passes_count = 0) {
    var [power, velocity, passes] = le_old.get();
    let lev_old = le_old.lev();
    if (new_passes_count > 0) {
      le_old.passes = new_passes_count;
    }
    let lev_diff = Math.round(lev_new - new LE(power, velocity, passes).lev(), 3);
    
    if (new_passes_count > 0) {
      if (new_passes_count > passes) {
        lev_diff += 1;
      } else {
        lev_diff -= 1;
      }
    }
    while ((lev_diff > 0 && lev_new > lev_old) || (lev_diff < 0 && lev_new < lev_old)) {
      if (prio_velocity) {
        power += copysign(this.power_w*1.0/1000, lev_diff);
        if (power > this.p_max) {
          power = this.p_max;
          //velocity -= Math.sign(lev_diff);
          velocity -= copysign(1,lev_diff);
          if (velocity < this.v_min) {
            return false;
          }
        }
      } else {
        velocity += copysign(1,lev_diff);
        if (velocity < this.v_min) {
          velocity = this.v_min;
          power -= copysign(this.power_w/1000,lev_diff);
          if (power > this.p_max) {
            return false;
          }
        }
      }
      lev_diff = Math.round(lev_new - new LE(power, velocity, passes).lev(), 3);
    }

    return new LE(Number(power).toFixed(3), velocity, passes);
  }

  add_le_value(le_old, value_to_add, prio_velocity = true) {
    const lev_new = le_old.lev() + value_to_add;
    return this.calc_new_le(lev_new, le_old, prio_velocity);
  }

  multiply_le_value(le_old, multiplicator, prio_velocity = true) {
    const lev_new = le_old.lev() * multiplicator;
    return this.calc_new_le(lev_new, le_old, prio_velocity);
  }

  newpass_le_value(le_old, multiplicator = 1, passes = 1, prio_velocity = true) {
    const lev_new = le_old.lev() * multiplicator;
    return this.calc_new_le(lev_new, le_old, prio_velocity, passes);
  }

  calc_point_power_settings(points, is_linear) {
    const lev_max = this.le_max.lev();
    const lev_min = this.le_min.lev();
    
    laser.le_list.push(this.le_min);
    laser.levs.push(lev_min);
    let factor = 0;
    if (is_linear) {
      factor = (lev_max - lev_min) / (points - 1);
    } else {
      let buffer = 0;
      while (Math.abs(lev_max - buffer) > 0.01) {
        factor += (lev_max - buffer) * 1.01 ** (-points);
        buffer = lev_min * (1 + factor) ** (points - 1);
      }
    }
    for (let pt = 1; pt < points; pt++) {
      let le_new;
      
      if (is_linear) {
        le_new = this.add_le_value(laser.le_list[0], factor * pt);
      } else {
        le_new = this.add_le_value(laser.le_list.slice(-1)[0], laser.le_list[0] * factor ** pt);
      }
      if (!le_new) {
        // throw new Error("LE cannot be reached with the given MIN/MAX values");
        // Uncomment the line above if you want to throw an exception
      }
      laser.le_list.push(le_new);
      laser.levs.push(le_new.lev());
    }
    
    this.factor = factor;
  }

  print_list() {
    for (let x = 0; x < this.le_list.length; x++) {
      //console.log("${x + 1}:\t${this.le_list[x]}");
      //console.log((x+1)+"\t"+this.le_list[x]);
    }
  }
}
class Passes_field {
  constructor(
    base_le,
    rows,
    columns,
    row_size,
    col_size,
    padding,
    passes_factor_int = 1,
    le_variance = 0.05
  ) {
    this.rows = rows;
    this.columns = columns;
    this.row_size = row_size;
    this.col_size = col_size;
    this.base_le = base_le;
    this.padding = padding;
    this.passes_factor_int = passes_factor_int;
    this.le_variance = le_variance;
    this.gcode=[];

    // calculations
    this.colwidth = (col_size - (columns - 1) * padding) / columns;
    this.rowheight = (row_size - rows * padding) / (rows + 1);
  }

  make_le_list() {
    // calculate all the necessary LE-values
    const _laser = new Laser();
    const variances = [];

    for (let r = 0; r < this.rows; r++) {
      const is_even = r % 2 === 0;
      const base_lev = this.base_le.lev();
      const new_lev = base_lev * this.le_variance * r * (is_even ? 1 : -1);
      const varValue = _laser.add_le_value(this.base_le, new_lev);
      const index = is_even ? 0 : variances.length;

      variances.splice(index, 0, varValue);

      for (let c = 1; c < this.columns; c++) {
        const newIndex = is_even ? index + 1 : index;
        const newVarValue = _laser.newpass_le_value(varValue, 1, (c + 1) * this.passes_factor_int);
        variances.splice(newIndex, 0, newVarValue);
      }
    }

    return [variances, this.columns * this.passes_factor_int];
  }

  make_pass_field(lpi = 0) {
    let x = 0;
    let y = 0;
    let col = 0;

    if (lpi < 50 && lpi !== 0) {
      //throw new Error(`LPI of ${lpi} is too small. It should be at least 50!`);
      throw new Error("LPI of "+lpi+" is too small. It should be at least 50!");
    }

    console.log("++");
    const [le_list, max_passes] = this.make_le_list();

    for (const le of le_list) {
      col += 1;
      if (col > this.columns) {
        col = 1;
        x = 0;
        y += this.rowheight + this.padding;
      }
      for (let i = 0; i < le.passes; i++) {
        //this.gcode.push(`G0 X${x} Y${y}`);
        this.gcode.push("G0 X"+x+" Y"+y);
        if (lpi) {
          const lines = Math.round(lpi * (this.rowheight / 25.4));
          const line_height = this.rowheight / lines;
          for (let p = 0; p < lines; p++) {
            this.gcode.push(
              "G0 X"+(x + (this.colwidth * (1 + this.overscan) || -this.colwidth * this.overscan) * (p % 2 !== 0 ? 1 : -1))+" Y"+(y + line_height * p)
            );
            this.gcode.push("G1 X"+(x + (this.colwidth * (p % 2 !== 0 ? 1 : 0)))+" S0 F"+(le.velocity));
            this.gcode.push("G1 X"+(x + (this.colwidth * (p % 2 === 0 ? 1 : 0)))+" S"+(map_p(le.power))+" F"+(le.velocity));
            this.gcode.push(
              "G1 X"+(x + (this.colwidth * (1 + this.overscan) || -this.colwidth * this.overscan) * (p % 2 === 0 ? 1 : -1))+" S0 F"+(le.velocity)
            );
          }
        } else {
          const [power, velocity, _] = le.get();
          this.gcode.push("G1 X"+(x + this.colwidth)+" Y"+y+" S"+(map_p(power))+" F"+(velocity));
          this.gcode.push("G1 X"+(x + this.colwidth)+" Y"+(y + this.rowheight));
          this.gcode.push("G1 X"+x+" Y"+(y + this.rowheight));
          this.gcode.push("G1 X"+x+" Y"+y);
        }
        x += this.colwidth + this.padding;
      }
    }

    return [x - this.padding, y + this.rowheight, this.colwidth, this.rowheight, max_passes];
  }
}

export default {
  name: "gCodeView",
  data() {
    return {
     
      LEs:[],
      grid_rows:0,
      grid_columns:0,
      maxLE:0,
      minLE:0,
      basic_code:[],
      gcode:[],
      testType:0,

    };
  },
  methods: {
    clear(){
      this.LEs = [];
      this.grid_columns=0;
      this.grid_rows=0;
      this.maxLE=0;
      this.minLE=0;
      this.basic_code=[];
      this.gcode=[];
    
    },
    runLaser(){
      if(this.testType==0){
        //alert(this.input_rows);
        //var laser;
        var input_rows = Number(this.input_rowss); 
        var input_height = Number(this.input_heightt);
        var input_columns = Number(this.input_columnss); 
        var input_width = Number(this.input_widthh);
        var input_padding_fields = Number(this.input_padding_fieldss);
        var input_padding_letters = Number(this.input_padding_letterss);
        var input_lpi = Number(this.input_lpii);
        var input_laser_power_w = Number(this.input_laser_power_ww);
        var input_laser_min_power = Number(this.input_laser_min_powerr);
        var input_laser_max_power = Number(this.input_laser_max_powerr);
        var input_laser_min_speed = Number(this.input_laser_min_speedd);
        var input_laser_max_speed = Number(this.input_laser_max_speedd);
        
        laser = new Laser(
            input_laser_power_w,
            input_laser_min_power,
            input_laser_max_power,
            input_laser_min_speed,
            input_laser_max_speed
        );
        laser.calc_point_power_settings(input_rows * input_columns, true);
        
        const le = new LE(10, 2000);
        const header = (laser.le_min.lev()).toFixed(0)+"-"+(laser.le_max.lev()).toFixed(0)+" "+(laser.factor < 2 ? 'F' : 'L')+(laser.factor.toFixed(1));
        document.getElementById("cliresult").innerText=(laser.factor < 2 ? 'F' : 'L')+ Number(laser.factor).toFixed(1) + 'x' +  (input_rows * input_columns) +  "@ LPI:" +  input_lpi +"\nLE_min: "+laser.le_min+"\t-->\nLE_max: "+laser.le_max;
        let height = input_height;
        let width = input_width;
        const tf = new Le_field(
            laser.le_list, input_rows, input_columns, height, width, input_padding_fields
        );
        let colwidth, rowheight;
        width, height, colwidth, rowheight = tf.make_le_field(input_lpi);
        colwidth = Math.min(
            rowheight / 2,
            (width - (header.length - 1) * input_padding_letters) / header.length
        );
        const gc = new Gcode(le, rowheight, colwidth, input_padding_letters);

        this.basic_code = gc.basic_code();
        this.gcode = tf.gcode;
        this.LEs = laser.le_list;
        this.maxLE = laser.le_list[0].lev();
        this.minLE = laser.le_list[laser.le_list.length-1].lev();

        this.grid_rows = input_rows;
        this.grid_columns = input_columns;
      }
      else if(this.testType==1)
      {
        var input_rows = Number(this.input_rowss); 
        var input_columns = Number(this.input_heightt); 
        var input_padding_fields = Number(this.input_padding_fieldss);
        var input_padding_letters = Number(this.input_padding_letterss);
        var input_passes_factor = Number(this.input_passes_factorr);
        var input_le_variance = Number(this.input_le_variancee);
        var input_width = Number(this.input_widthh);
        var input_height = Number(this.input_heightt);
        var input_laser_power_w = Number(this.input_laser_power_ww);
        var input_laser_speed = Number(this.input_laser_max_speedd);

        var input_base_le = new LE(input_laser_power_w, input_laser_speed);
        var pf = new Passes_field(
            input_base_le,
            input_rows,
            input_columns,
            input_height,
            input_width,
            input_padding_fields,
            input_passes_factor,
            input_le_variance
        );
        var height = input_height;
        var width = input_width;
        var rowheight, colwidth, max_passes;
        width, height, colwidth, rowheight, max_passes = pf.make_pass_field(0);
        var header = Number(input_base_le.lev()).toFixed(0)+" 1-"+Number(max_passes).toFixed(0)+" "+Number(input_passes_factor)+" "+Number(input_le_variance * 100).toFixed(2);
        colwidth = Math.min(
            rowheight / 2,
            (width - (header.length - 1) * input_padding_letters) / header.length
        );
        const le = new LE(10, 2000);
        const gc = new Gcode(le, rowheight, colwidth, input_padding_letters);

        this.basic_code = gc.basic_code();
        this.gcode = pf.gcode;
        this.grid_rows = input_rows;
        this.grid_columns = input_columns;
      }

    },
    downLoadgCode(){
      var textToWrite="",i;
      for(i=0;i<this.basic_code.length;i++)
        textToWrite += (this.basic_code[i] + "\n");
      for(i=0;i<this.gcode.length;i++)
        textToWrite += (this.gcode[i] + "\n");
      //for()
      if(this.testType==0)
        textToWrite += this.LEs;
      textToWrite += "M5";
      var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});

      var fileNameToSaveAs ;
      //fileNameToSaveAs = "result.gcode";
      
      if(this.testType==0)
        fileNameToSaveAs = "laserEngagement_r"+Number(this.input_rowss)+"_c"+Number(this.input_columnss)+"_h"+Number(this.input_heightt).toFixed(0)+"_w"+Number(this.input_widthh).toFixed(0)+"_LE"+Number(laser.le_min.lev()).toFixed(0)+"-"+Number(laser.le_max.lev()).toFixed(0)+"_lpi"+Number(this.input_lpii)+".gcode";
      else if(this.testType==1)
        fileNameToSaveAs = "laserEngagement_passes_r"+Number(this.input_rowss)+"_c"+Number(this.input_columnss)+"_h"+Number(this.input_heightt).toFixed(0)+"_w"+Number(this.input_widthh).toFixed(0)+"_LE"+Number(laser.le_min.lev()).toFixed(0)+"-"+Number(laser.le_max.lev()).toFixed(0)+".gcode";
      var downloadLink = document.createElement("a");
      downloadLink.download = fileNameToSaveAs;
      downloadLink.innerHTML = "Download File";
      if (window.webkitURL != null)
      {
          // Chrome allows the link to be clicked
          // without actually adding it to the DOM.
          downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
      }
      else
      {
          // Firefox requires the link to be added to the DOM
          // before it can be clicked.
          downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
          downloadLink.onclick = destroyClickedElement;
          downloadLink.style.display = "none";
          document.body.appendChild(downloadLink);
      }

      downloadLink.click();

    },
    onClickLeTest(){
      this.testType=0;
      this.clear();
      //alert(0);
    },
    onClickPassTest(){
      this.testType=1;
      this.clear();
      //alert(1);
    },
    onClickDPITest(){
      this.testType=2;
      this.clear();
      //alert(3);
    },
    onClickLoad(){
    },
    onClickSave(){
      const handle = showSaveFilePicker({
          suggestedName: 'name.txt',
          types: [{
              description: 'Text file',
              accept: {'text/plain': ['.txt']},
          }],
      });

      const blob = "hello world!";
      console.log('blog',blob);
      const writableStream = handle.createWritable();
      writableStream.write(blob);
      writableStream.close();
    },
  }, 
  computed: {
  },
  mounted() {
  },
  };
</script>

<style scoped>

</style>
