<template>
  <div class="container-fluid p-5 text-white text-center" style="background-color: rgb(4,170,109);">
    <h1>gCodeView</h1>
  </div>

  <div class="container-fluid " style="padding:3%;">  
    <div class="row" style="background-color: white">
      <div class="inputarea col-sm-7" style="background-color:white">
        <v-card>
          <v-tabs
            v-model="tab"
            bg-color="success"
          >
            <v-tab value="one" @click="onClickLeTest">LE Test</v-tab>
            <v-tab value="two" @click="onClickPassTest">Passes Test</v-tab>
            <v-tab value="three" @click="onClickDPITest">DPI Test</v-tab>
          </v-tabs>

          <v-card-text>
            <v-window v-model="tab">
              <v-window-item value="one">
                <h3>LE Test</h3><br>
                <div class="row">
                  <div class="col-sm-6">
                    <h5>Grid Settings:</h5>
                    <div v-if="this.testType===0">
                      <v-text-field label="Rows" v-model="input_rowss" variant="solo" :rules="[rules.required]" append-inner-icon="mdi-information" @click:append-inner="show_rows=!show_rows">
                        <v-tooltip
                          activator = "parent"
                          location = "top"
                          v-model="show_rows"><p class="mb-0">Rows--Lorem ipsum dolor sit amet, consectetur adipisicing elit</p>
                          <p class="mb-0">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
                        </v-tooltip>
                      </v-text-field>
                      <v-text-field label="Height" v-model="input_heightt" variant="solo" :rules="[rules.required]"  suffix="mm" append-inner-icon="mdi-information" @click:append-inner="show_height=!show_height">
                        <v-tooltip
                          activator = "parent"
                          location = "bottom"
                          v-model="show_height"><p class="mb-0">Height--Lorem ipsum dolor sit amet, consectetur adipisicing elit</p>
                          <p class="mb-0">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
                        </v-tooltip>
                      </v-text-field>
                      <v-text-field label="Columns" v-model="input_columnss" variant="solo" :rules="[rules.required]"  append-inner-icon="mdi-information" @click:append-inner="show_columns=!show_columns">
                        <v-tooltip
                          activator = "parent"
                          location = "bottom"
                          v-model="show_columns"><p class="mb-0">Columns--Lorem ipsum dolor sit amet, consectetur adipisicing elit</p>
                          <p class="mb-0">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p></v-tooltip>
                      </v-text-field>
                      <v-text-field label="Width" v-model="input_widthh" variant="solo" suffix="mm" :rules="[rules.required]"  append-inner-icon="mdi-information" @click:append-inner="show_width=!show_width">
                        <v-tooltip
                          activator = "parent"
                          location = "bottom"
                          v-model="show_width"><p class="mb-0">Width--Lorem ipsum dolor sit amet, consectetur adipisicing elit</p>
                          <p class="mb-0">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p></v-tooltip>
                      </v-text-field>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <h5>Laser Settings:</h5>
                    <div v-if="this.testType===0">
                      <v-text-field label="Padding Fields" v-model="input_padding_fieldss" variant="solo" suffix="mm" append-inner-icon="mdi-information" @click:append-inner="show_padding_fields=!show_padding_fields">
                        <v-tooltip
                          activator = "parent"
                          location = "top"
                          v-model = "show_padding_fields"><p class="mb-0">Padding Fields--Lorem ipsum dolor sit amet, consectetur adipisicing elit</p>
                          <p class="mb-0">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p></v-tooltip>
                      </v-text-field>
                      <v-text-field label="Padding Letters" v-model="input_padding_letterss" variant="solo" append-inner-icon="mdi-information" @click:append-inner="show_padding_letters=!show_padding_letters">
                        <v-tooltip
                          activator = "parent"
                          location = "bottom"
                          v-model = "show_padding_letters"><p class="mb-0">Padding Letters--Lorem ipsum dolor sit amet, consectetur adipisicing elit</p>
                          <p class="mb-0">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p></v-tooltip>
                      </v-text-field>
                      <v-text-field label="Lines per inch" v-model="input_lpii" variant="solo" suffix="1/inch" append-inner-icon="mdi-information" @click:append-inner="show_lines_per_inch=!show_lines_per_inch">
                        <v-tooltip
                          activator = "parent"
                          location = "bottom"
                          v-model="show_lines_per_inch"><p class="mb-0">Lines Per Inch--Lorem ipsum dolor sit amet, consectetur adipisicing elit</p>
                          <p class="mb-0">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p></v-tooltip>
                      </v-text-field>
                      <v-text-field label="Laser Power" v-model="input_laser_power_ww" variant="solo" :rules="[rules.required]"  suffix="W" append-inner-icon="mdi-information" @click:append-inner="show_laser_power=!show_laser_power">
                        <v-tooltip
                          activator = "parent"
                          location = "bottom"
                          v-model="show_laser_power"><p class="mb-0">Laser Power--Lorem ipsum dolor sit amet, consectetur adipisicing elit</p>
                          <p class="mb-0">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p></v-tooltip>
                      </v-text-field>
                      <v-text-field label="Laser Min Power" v-model="input_laser_min_powerr" variant="solo" :rules="[rules.required]"  suffix="%" append-inner-icon="mdi-information" @click:append-inner="show_laser_min_power=!show_laser_min_power">
                        <v-tooltip
                          activator = "parent"
                          location = "bottom"
                          v-model="show_laser_min_power"><p class="mb-0">Laser Min Power--Lorem ipsum dolor sit amet, consectetur adipisicing elit</p>
                          <p class="mb-0">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p></v-tooltip>
                      </v-text-field>
                      <v-text-field label="Laser Max Power" v-model="input_laser_max_powerr" variant="solo" :rules="[rules.required]"  suffix="%" append-inner-icon="mdi-information" @click:append-inner="show_laser_max_power=!show_laser_max_power">
                        <v-tooltip
                          activator = "parent"
                          location = "bottom"
                          v-model="show_laser_max_power"><p class="mb-0">Laser Max Power--Lorem ipsum dolor sit amet, consectetur adipisicing elit</p>
                          <p class="mb-0">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p></v-tooltip>
                      </v-text-field>
                      <v-text-field label="Laser Min Speed" v-model="input_laser_min_speedd" variant="solo" :rules="[rules.required]"  suffix="mm/min" append-inner-icon="mdi-information" @click:append-inner="show_laser_min_speed=!show_laser_min_speed">
                        <v-tooltip
                          activator = "parent"
                          location = "bottom"
                          v-model="show_laser_min_speed"><p class="mb-0">Laser Min Speed--Lorem ipsum dolor sit amet, consectetur adipisicing elit</p>
                          <p class="mb-0">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p></v-tooltip>
                      </v-text-field>
                      <v-text-field label="Laser Max Speed" v-model="input_laser_max_speedd" variant="solo" :rules="[rules.required]"  suffix="mm/min" append-inner-icon="mdi-information" @click:append-inner="show_laser_max_speed=!show_laser_max_speed">
                        <v-tooltip
                          activator = "parent"
                          location = "bottom"
                          v-model="show_laser_max_speed"><p class="mb-0">Laser Max Speed--Lorem ipsum dolor sit amet, consectetur adipisicing elit</p>
                          <p class="mb-0">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p></v-tooltip>
                      </v-text-field>
                    </div>
                    
                  <div  class="error">{{ error }}</div><br>
                  <v-btn @click="runLaser" color="success">Go</v-btn>&nbsp;&nbsp;&nbsp;
                  <v-btn @click="resetBtn">Reset</v-btn>
                  </div>
                </div>
              </v-window-item>

              <v-window-item value="two">
                <h3>Passes Test</h3><br>
                <div class="row">
                  <div class="col-sm-6">
                    <h5>Grid Settings:</h5>
                    <div v-if="this.testType===1">
                      <v-text-field label="Rows" v-model="input_rowss" variant="solo"  :rules="[rules.required]"  append-inner-icon="mdi-information" @click:append-inner="show_rows=!show_rows">
                      <v-tooltip
                        activator = "parent"
                        location = "end"
                        v-model="show_rows"><p class="mb-0">Rows--Lorem ipsum dolor sit amet, consectetur adipisicing elit</p>
                          <p class="mb-0">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p></v-tooltip>
                    </v-text-field>
                    <v-text-field label="Height" v-model="input_heightt" variant="solo" :rules="[rules.required]"  suffix="mm"  append-inner-icon="mdi-information" @click:append-inner="show_height=!show_height">
                      <v-tooltip
                        activator = "parent"
                        location = "end"
                        v-model="show_height"><p class="mb-0">Height--Lorem ipsum dolor sit amet, consectetur adipisicing elit</p>
                          <p class="mb-0">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p></v-tooltip>
                    </v-text-field>
                    <v-text-field label="Columns" v-model="input_columnss" variant="solo" :rules="[rules.required]"  append-inner-icon="mdi-information" @click:append-inner="show_columns=!show_columns">
                      <v-tooltip
                        activator = "parent"
                        location = "end"
                        v-model="show_columns"><p class="mb-0">Column--Lorem ipsum dolor sit amet, consectetur adipisicing elit</p>
                          <p class="mb-0">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p></v-tooltip>
                    </v-text-field>
                    <v-text-field label="Width" v-model="input_widthh" variant="solo" :rules="[rules.required]"  suffix="mm"  append-inner-icon="mdi-information" @click:append-inner="show_width=!show_width">
                      <v-tooltip
                        activator = "parent"
                        location = "end"
                        v-model="show_width"><p class="mb-0">Width--Lorem ipsum dolor sit amet, consectetur adipisicing elit</p>
                          <p class="mb-0">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p></v-tooltip>
                    </v-text-field>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <h5>Laser Settings:</h5>
                    <div v-if="this.testType===1">
                      <v-text-field label="Padding Fields" v-model="input_padding_fieldss" variant="solo" suffix="mm" append-inner-icon="mdi-information" @click:append-inner="show_padding_fields=!show_padding_fields">
                        <v-tooltip
                          activator = "parent"
                          location = "end"
                          v-model="show_padding_fields"><p class="mb-0">Padding Fields--Lorem ipsum dolor sit amet, consectetur adipisicing elit</p>
                          <p class="mb-0">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p></v-tooltip>
                      </v-text-field>
                      <v-text-field label="Padding Letters" v-model="input_padding_letterss" variant="solo" append-inner-icon="mdi-information" @click:append-inner="show_padding_letters=!show_padding_letters">
                        <v-tooltip
                          activator = "parent"
                          location = "end"
                          v-model="show_padding_letters"><p class="mb-0">Padding Letters--Lorem ipsum dolor sit amet, consectetur adipisicing elit</p>
                          <p class="mb-0">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p></v-tooltip>
                      </v-text-field>
                      <v-text-field label="Passes Factor" v-model="input_passes_factorr" variant="solo" :rules="[rules.required]"  append-inner-icon="mdi-information" @click:append-inner="show_passes_factor=!show_passes_factor">
                        <v-tooltip
                          activator = "parent"
                          location = "end"
                          v-model="show_passes_factor"><p class="mb-0">Passes Factor--Lorem ipsum dolor sit amet, consectetur adipisicing elit</p>
                          <p class="mb-0">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p></v-tooltip>
                      </v-text-field>
                      <v-text-field label="LE variance" v-model="input_le_variancee" variant="solo" :rules="[rules.required]"  suffix="W*s/mm" append-inner-icon="mdi-information" @click:append-inner="show_le_variance=!show_le_variance">
                        <v-tooltip
                          activator = "parent"
                          location = "end"
                          v-model="show_le_variance"><p class="mb-0">LE variance--Lorem ipsum dolor sit amet, consectetur adipisicing elit</p>
                          <p class="mb-0">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p></v-tooltip>
                      </v-text-field>
                      <v-text-field label="Laser Power" v-model="input_laser_power_ww" variant="solo" :rules="[rules.required]"  suffix="W" append-inner-icon="mdi-information" @click:append-inner="show_laser_power=!show_laser_power">
                        <v-tooltip
                          activator = "parent"
                          location = "end"
                          v-model="show_laser_power"><p class="mb-0">Laser Power--Lorem ipsum dolor sit amet, consectetur adipisicing elit</p>
                          <p class="mb-0">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p></v-tooltip>
                      </v-text-field>
                      <v-text-field label="Laser Speed" v-model="input_laser_speedd" variant="solo" :rules="[rules.required]"  suffix="mm/min" append-inner-icon="mdi-information" @click:append-inner="show_laser_speed=!show_laser_speed">
                        <v-tooltip
                          activator = "parent"
                          location = "end"
                          v-model="show_laser_speed"><p class="mb-0">Laser Speed--Lorem ipsum dolor sit amet, consectetur adipisicing elit</p>
                          <p class="mb-0">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p></v-tooltip>
                      </v-text-field>
                    </div>
                    
                  <div  class="error">{{ error }}</div><br>
                  <v-btn @click="runLaser" color="success">Go</v-btn>&nbsp;&nbsp;&nbsp;
                  <v-btn @click="resetBtn">Reset</v-btn>
                  </div>
                </div>
              </v-window-item>

              <v-window-item value="three">
                <h3>DPI Test</h3><br>
                <div class="row">
                  <div class="col-sm-6">
                    <h5>Grid Settings:</h5>
                    <div v-if="this.testType===2">
                      <v-text-field label="Rows" v-model="input_rowss" variant="solo" :rules="[rules.required]" append-inner-icon="mdi-information" @click:append-inner="show_rows=!show_rows">
                        <v-tooltip
                          activator = "parent"
                          location = "top"
                          v-model="show_rows"><p class="mb-0">Rows--Lorem ipsum dolor sit amet, consectetur adipisicing elit</p>
                          <p class="mb-0">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
                        </v-tooltip>
                      </v-text-field>
                      <v-text-field label="Height" v-model="input_heightt" variant="solo" :rules="[rules.required]"  suffix="mm" append-inner-icon="mdi-information" @click:append-inner="show_height=!show_height">
                        <v-tooltip
                          activator = "parent"
                          location = "bottom"
                          v-model="show_height"><p class="mb-0">Height--Lorem ipsum dolor sit amet, consectetur adipisicing elit</p>
                          <p class="mb-0">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p>
                        </v-tooltip>
                      </v-text-field>
                      <v-text-field label="Columns" v-model="input_columnss" variant="solo" :rules="[rules.required]"  append-inner-icon="mdi-information" @click:append-inner="show_columns=!show_columns">
                        <v-tooltip
                          activator = "parent"
                          location = "bottom"
                          v-model="show_columns"><p class="mb-0">Columns--Lorem ipsum dolor sit amet, consectetur adipisicing elit</p>
                          <p class="mb-0">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p></v-tooltip>
                      </v-text-field>
                      <v-text-field label="Width" v-model="input_widthh" variant="solo" suffix="mm" :rules="[rules.required]"  append-inner-icon="mdi-information" @click:append-inner="show_width=!show_width">
                        <v-tooltip
                          activator = "parent"
                          location = "bottom"
                          v-model="show_width"><p class="mb-0">Width--Lorem ipsum dolor sit amet, consectetur adipisicing elit</p>
                          <p class="mb-0">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p></v-tooltip>
                      </v-text-field>
                    </div>
                  </div>
                  <div class="col-sm-6">
                    <h5>Laser Settings:</h5>
                    <div v-if="this.testType===2">
                      <v-text-field label="Padding Fields" v-model="input_padding_fieldss" variant="solo" suffix="mm" append-inner-icon="mdi-information" @click:append-inner="show_padding_fields=!show_padding_fields">
                        <v-tooltip
                          activator = "parent"
                          location = "top"
                          v-model = "show_padding_fields"><p class="mb-0">Padding Fields--Lorem ipsum dolor sit amet, consectetur adipisicing elit</p>
                          <p class="mb-0">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p></v-tooltip>
                      </v-text-field>
                      <v-text-field label="Padding Letters" v-model="input_padding_letterss" variant="solo" append-inner-icon="mdi-information" @click:append-inner="show_padding_letters=!show_padding_letters">
                        <v-tooltip
                          activator = "parent"
                          location = "bottom"
                          v-model = "show_padding_letters"><p class="mb-0">Padding Letters--Lorem ipsum dolor sit amet, consectetur adipisicing elit</p>
                          <p class="mb-0">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p></v-tooltip>
                      </v-text-field>
                      <v-text-field label="Lines per inch" v-model="input_lpii" variant="solo" suffix="1/inch" append-inner-icon="mdi-information" @click:append-inner="show_lines_per_inch=!show_lines_per_inch">
                        <v-tooltip
                          activator = "parent"
                          location = "bottom"
                          v-model="show_lines_per_inch"><p class="mb-0">Lines Per Inch--Lorem ipsum dolor sit amet, consectetur adipisicing elit</p>
                          <p class="mb-0">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p></v-tooltip>
                      </v-text-field>
                      <v-text-field label="Laser Power" v-model="input_laser_power_ww" variant="solo" :rules="[rules.required]"  suffix="W" append-inner-icon="mdi-information" @click:append-inner="show_laser_power=!show_laser_power">
                        <v-tooltip
                          activator = "parent"
                          location = "bottom"
                          v-model="show_laser_power"><p class="mb-0">Laser Power--Lorem ipsum dolor sit amet, consectetur adipisicing elit</p>
                          <p class="mb-0">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p></v-tooltip>
                      </v-text-field>
                      <v-text-field label="Laser Min Power" v-model="input_laser_min_powerr" variant="solo" :rules="[rules.required]"  suffix="%" append-inner-icon="mdi-information" @click:append-inner="show_laser_min_power=!show_laser_min_power">
                        <v-tooltip
                          activator = "parent"
                          location = "bottom"
                          v-model="show_laser_min_power"><p class="mb-0">Laser Min Power--Lorem ipsum dolor sit amet, consectetur adipisicing elit</p>
                          <p class="mb-0">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p></v-tooltip>
                      </v-text-field>
                      <v-text-field label="Laser Max Power" v-model="input_laser_max_powerr" variant="solo" :rules="[rules.required]"  suffix="%" append-inner-icon="mdi-information" @click:append-inner="show_laser_max_power=!show_laser_max_power">
                        <v-tooltip
                          activator = "parent"
                          location = "bottom"
                          v-model="show_laser_max_power"><p class="mb-0">Laser Max Power--Lorem ipsum dolor sit amet, consectetur adipisicing elit</p>
                          <p class="mb-0">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p></v-tooltip>
                      </v-text-field>
                      <v-text-field label="Laser Min Speed" v-model="input_laser_min_speedd" variant="solo" :rules="[rules.required]"  suffix="mm/min" append-inner-icon="mdi-information" @click:append-inner="show_laser_min_speed=!show_laser_min_speed">
                        <v-tooltip
                          activator = "parent"
                          location = "bottom"
                          v-model="show_laser_min_speed"><p class="mb-0">Laser Min Speed--Lorem ipsum dolor sit amet, consectetur adipisicing elit</p>
                          <p class="mb-0">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p></v-tooltip>
                      </v-text-field>
                      <v-text-field label="Laser Max Speed" v-model="input_laser_max_speedd" variant="solo" :rules="[rules.required]"  suffix="mm/min" append-inner-icon="mdi-information" @click:append-inner="show_laser_max_speed=!show_laser_max_speed">
                        <v-tooltip
                          activator = "parent"
                          location = "bottom"
                          v-model="show_laser_max_speed"><p class="mb-0">Laser Max Speed--Lorem ipsum dolor sit amet, consectetur adipisicing elit</p>
                          <p class="mb-0">Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.</p></v-tooltip>
                      </v-text-field>
                    </div>
                    
                  <div  class="error">{{ error }}</div><br>
                  <v-btn @click="runLaser" color="success">Go</v-btn>&nbsp;&nbsp;&nbsp;
                  <v-btn @click="resetBtn">Reset</v-btn>
                  </div>
                </div>
              </v-window-item>
            </v-window>
        </v-card-text>
      </v-card>
        
      </div>
      <div class="outputarea col-sm-4" style="background-color: white;">
        <div v-if="this.testType===0"  id="cliresult"></div><br>
        <p v-if="this.grid_rows>0 && this.testType<1" id="gridtitle">{{this.minLE}}-{{ this.maxLE }} L{{ ((this.maxLE-this.minLE) / (this.grid_columns*this.grid_rows-1)).toFixed(1)}}</p>
        <table v-if="this.testType<1">
          <tr v-for="i in this.grid_rows">
            <td v-for="j in this.grid_columns">
              {{ this.LEs[(i-1)*this.grid_columns+this.grid_columns-j].lev().toFixed(0)}}
            </td>
          </tr>
        </table>
        <br>
        <p v-if="this.grid_rows>0" @click="downLoadgCode" class="downloadicon">
          Download gCode <img src="@/assets/image/download.png" style="width: 20px; height: 20px;" alt="download png">
        </p>
      </div>
    </div>
  </div>
</template>

<script>

import {copysign, map_p, LE, Gcode, Le_field} from '../src/assets/js/total.js';

var laser;

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
     error:"",
      LEs:[],
      grid_rows:0,
      grid_columns:0,
      maxLE:0,
      minLE:0,
      basic_code:[],
      gcode:[],
      testType:0,
      input_rowss : 0,
      input_heightt : 0,
      input_columnss : 0,
      input_widthh : 0,
      input_padding_fieldss : 0,
      input_padding_letterss : 0,
      input_lpii : 0,
      input_laser_power_ww : 0,
      input_laser_min_powerr : 0,
      input_laser_max_powerr : 0,
      input_laser_min_speedd : 0,
      input_laser_max_speedd : 0,
      input_laser_speedd:0,
      input_passes_factorr:0,
      input_le_variancee:0,
      show_rows:false,
      show_height:false,
      show_columns:false,
      show_width:false,
      show_padding_fields:false,
      show_padding_letters:false,
      show_lines_per_inch:false,
      show_laser_power:false,
      show_laser_min_power:false,
      show_laser_max_power:false,
      show_laser_min_speed:false,
      show_laser_max_speed:false,
      show_passes_factor:false,
      show_le_variance:false,
      show_laser_speed:false,
      tab: null,
      rules: {
          required: value => !!value || '',
        },
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
      this.error="";
    },
    resetAllParams(){
      this.error="";
      this.input_rowss="";
        this.input_heightt="";
        this.input_columnss="";
        this.input_widthh="";
        this.input_padding_fieldss="";
        this.input_padding_letterss="";
        this.input_lpii="";
        this.input_laser_power_ww="";
        this.input_laser_min_powerr="";
        this.input_laser_max_powerr="";
        this.input_laser_min_speedd="";
        this.input_laser_max_speedd="";
        this.input_rowss="";
        this.input_heightt="";
        this.input_columnss="";
        this.input_widthh="";
        this.input_padding_fieldss="";
        this.input_padding_letterss="";
        this.input_passes_factorr="";
        this.input_le_variancee="";
        this.input_laser_power_ww="";
        this.input_laser_speedd="";
    },
    resetBtn(){
      //this.$refs.LeTestForm.reset();
      this.resetAllParams();
    },
    isValid(){
      if(this.testType==0)
      {
        if(
          this.input_rowss==0 || 
          this.input_heightt==0 || 
          this.input_columnss==0 || 
          this.input_widthh==0 || 
          //this.input_padding_fieldss==0 || 
          //this.input_padding_letterss==0 || 
          //this.input_lpii==0 || 
          this.input_laser_power_ww==0 || 
          this.input_laser_min_powerr==0 || 
          this.input_laser_max_powerr==0 || 
          this.input_laser_min_speedd==0 || 
          this.input_laser_max_speedd==0)
          return 1;
        return 0;
      }
      else if(this.testType==1)
      {
        if(
          this.input_rowss ==0 ||
          this.input_heightt ==0 ||
          this.input_columnss ==0 ||
          this.input_widthh ==0 ||
          // this.input_padding_fieldss ==0 || 
          // this.input_padding_letterss ==0 || 
          this.input_passes_factorr ==0 || 
          this.input_le_variancee ==0 || 
          this.input_laser_power_ww ==0 || 
          this.input_laser_speedd ==0)
          return 1;
        return 0;
      }
      return 0;
    },
    runLaser(){
      if(this.testType==0){

        //alert(this.isValid());
       if(this.isValid()==1){
        this.error="Please Input All The Fields Correctly.";
        //return;
       }
        //alert(this.input_rows);
        //var laser;
        
        // var input_rows = Number(this.input_rowss); 
        // var input_height = Number(this.input_heightt);
        // var input_columns = Number(this.input_columnss); 
        // var input_width = Number(this.input_widthh);
        // var input_padding_fields = Number(this.input_padding_fieldss);
        // var input_padding_letters = Number(this.input_padding_letterss);
        // var input_lpi = Number(this.input_lpii);
        // var input_laser_power_w = Number(this.input_laser_power_ww);
        // var input_laser_min_power = Number(this.input_laser_min_powerr);
        // var input_laser_max_power = Number(this.input_laser_max_powerr);
        // var input_laser_min_speed = Number(this.input_laser_min_speedd);
        // var input_laser_max_speed = Number(this.input_laser_max_speedd);
        
        var input_rows = 4; 
        var input_height = 40;
        var input_columns = 6; 
        var input_width = 50;
        var input_padding_fields = 1.5;
        var input_padding_letters = 0.75;
        var input_lpi =0;
        var input_laser_power_w = 20;
        var input_laser_min_power = 100;
        var input_laser_max_power = 100;
        var input_laser_min_speed = 1800;
        var input_laser_max_speed = 1000;
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
        //document.getElementById("cliresult").innerText=(laser.factor < 2 ? 'F' : 'L')+ Number(laser.factor).toFixed(1) + 'x' +  (input_rows * input_columns) +  "@ LPI:" +  input_lpi +"\nLE_min: "+laser.le_min+"\t-->\nLE_max: "+laser.le_max;
        document.getElementById("cliresult").innerHTML="<br><h5>Laser Factor : "+Number(laser.factor).toFixed(1)+"</h5>"+"<h5>Grid Size : "+(input_rows*input_columns)+" ("+input_rows+"*"+input_columns+") "+"</h5>"+"<h5>Lines Per Inch : "+input_lpi+"</h5><br>"+"<h4>Minimum Laser : </h4>"+laser.le_min+"<h4>Maximum Laser : </h4>" + laser.le_max+"<br><br>";
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
        var input_laser_speed = Number(this.input_laser_speedd);
        // var input_rows = 4; 
        // var input_columns = 6; 
        // var input_padding_fields = 1.5;
        // var input_padding_letters = 0.75;
        // var input_passes_factor = 1;
        // var input_le_variance = 0.05;
        // var input_width = 100;
        // var input_height = 60;
        // var input_laser_power_w = 20;
        // var input_laser_speed = 1000;
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
      {
        //textToWrite += this.LEs;
        for(i=0;i<this.LEs.length;i++)
          textToWrite += this.LEs[i]+"\n";
      }
      textToWrite += "\nM5";
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
      this.clear();
      this.testType=0;
      //alert(0);
    },
    onClickPassTest(){
      this.clear();
      this.testType=1;
      //alert(1);
    },
    onClickDPITest(){
      this.clear();
      this.testType=2;
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
