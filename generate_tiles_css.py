#!/usr/bin/env python
# -*- coding: utf-8 -*-
# vi:ts=16 sw=4 et

from __future__ import print_function


img_width = 256
img_height = 288
tile_width = 32
tile_height = 32

css_header = '''@charset "UTF-8";

.cell {
    background-image: url("tiles.png");
    background-repeat: no-repeat;
}
'''

tile_map = [
['air',	'button_s',	'button_w',	'button_n',	'button_e',	None,	'plate_stone',	'dirt'],
['lever_up',	'lever_s',	'lever_w',	'lever_n',	'lever_e',	None,	'plate_wood',	'sand'],
['torch_up',	'torch_s',	'torch_w',	'torch_n',	'torch_e',	'wire_nsew',	'wire_ew',	'wire_ns'],
['wire_new',	'wire_nse',	'wire_sew',	'wire_nsw',	'wire_ne',	'wire_se',	'wire_sw',	'wire_nw'],
['torch_up',	'torch_s',	'torch_w',	'torch_n',	'torch_e',	'wire_nsew',	'wire_ew',	'wire_ns'],
['wire_new',	'wire_nse',	'wire_sew',	'wire_nsw',	'wire_ne',	'wire_se',	'wire_sw',	'wire_nw'],
['wool_F',	'wool_E',	'wool_D',	'wool_C',	'wool_B',	'wool_A',	'wool_9',	'wool_8',],
['wool_7',	'wool_6',	'wool_5',	'wool_4',	'wool_3',	'wool_2',	'wool_1',	'wool_0',],
['repeater_n',	'repeater_e',	'repeater_s',	'repeater_w',	'repeater_n',	'repeater_e',	'repeater_s',	'repeater_w',],
]

on_off_map = [
'        ',
'        ',
'00000000',
'00000000',
'11111111',
'11111111',
'        ',
'        ',
'00001111',
]

def main():
    print(css_header)
    num_tiles_x = img_width // tile_width
    num_tiles_y = img_height // tile_height
    for y in range(num_tiles_y):
        for x in range(num_tiles_x):
            name = tile_map[y][x]
            if name:
                is_on = (on_off_map[y][x] == '1')
                print('.cell.cell_{0}{1} {{ background-position: -{2}px -{3}px; }}'.format(
                    name,
                    '.on' if is_on else '',
                    x * tile_width,
                    y * tile_height
                ))

if __name__ == "__main__":
    main()
