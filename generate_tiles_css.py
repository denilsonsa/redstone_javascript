#!/usr/bin/env python
# -*- coding: utf-8 -*-
# vi:ts=4 sw=4 et

from __future__ import print_function


img_width = 256
img_height = 256
tile_width = 16
tile_height = 16

css_header = '''@charset "UTF-8";

.tile {
    background-image: url("minecraft_jar/terrain.png");
    background-repeat: no-repeat;
}
'''

def main():
    print(css_header)
    num_tiles_x = img_width // tile_width
    num_tiles_y = img_height // tile_height
    for y in range(num_tiles_y):
        for x in range(num_tiles_x):
            print('.tile.t{0} {{ background-position: -{1}px -{2}px; }}'.format(
                y * num_tiles_x + x,
                x * tile_width,
                y * tile_height
            ))

if __name__ == "__main__":
    main()
