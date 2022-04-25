from PIL import Image
from tqdm import tqdm # progressbar package

VID_WIDTH = 480
VID_HEIGHT = 360

NO_FRAMES = 6572

def main():
    with open("gen.txt","r") as f:
        for line in f:
            line = line.strip()
            name, width, height, idx_file = line.split(",")
            print(f"Generating {name}...")
            do_conversion(
                name,
                int(width),
                int(height),
                idx_file
            )
            print(f"Generated {name} successfully")

def do_conversion(file_name, pixel_width, pixel_height, idx_file):
    scale_width = VID_WIDTH / pixel_width
    scale_height = VID_HEIGHT / pixel_height
    idx = 0

    with open(file_name,"wb") as f:
        with open(idx_file,"w") as idx_f:
            idx_f.write(str(NO_FRAMES) + ",")

            for i in tqdm(range(1, NO_FRAMES + 1)):
                numstr = str(i).zfill(5)

                path = "../frames/scene-"+numstr+".png"
                img = Image.open(path)
                r = []

                idx_f.write(str(idx) + ",")

                for py in range(pixel_height):
                    for px in range(pixel_width):
                        vx = int(round((px + 0.5) * scale_width))
                        vy = int(round((py + 0.5) * scale_height))
                        val = img.getpixel((vx, vy))[0]
                        r.append(val > 150)

                comp = compress(r)
                idx += len(comp)
                f.write(comp)

def compress(pixels):
    # we will use a scheme as follows.
    # first bit: 1 or 0
    # bit 2 - 7: no. of that bit that follows.
    # much smaller by exploiting runs
    idx = 0
    compressed = b""
    while (idx < len(pixels)):
        run_length = 1
        pixel = pixels[idx]
        while (idx + 1 < len(pixels) and pixels[idx + 1] == pixel):
            run_length += 1
            idx += 1
        while (run_length > 0):
            compressed += ((pixel << 7) + min(127, run_length)).to_bytes(1, 'big')
            run_length -= 127
        idx += 1
    return compressed


if __name__ == "__main__":
    main()
        
