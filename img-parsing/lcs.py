from multiprocessing.sharedctypes import Value
from manim import *
from numpy import *
from math import *
class LCS(Scene):

    def construct(self):
        n=4
        ce = int(16/n)
        ne = int(8/n)
        arr = []
        for i in range(1,6575,2): # start = 1; stop = 6575 (there are that many frames); step = 2 (we want a 15fps, so we set step = 30/15)
            numstr = str(i).zfill(5) #yeah
            path = "C:/Users/path...to.../bad apple/scene"+numstr+".png"
            img = ImageMobject(path)
            # print(len(img.pixel_array))
            # print(len(img.pixel_array[0]))
            r = []

            for y in range(23*n):
                for x in range(30*n):#30*2
                    px = img.pixel_array[y * ce + ne][x * ce + ne][0]#x*8=16/2 + 4 = (16/2)/2
                    # 1 = white; 0 = black. We set the dividing line at 200/255
                    if(px>200):
                        px = 1
                    else:
                        px = 0
                    r.append(px)
            arr.append(r)
        f = open("lcs.txt","w")
        f.write(str(arr).replace(" ",""))
        f.close()

        
