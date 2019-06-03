# imports
from PIL import Image
from scipy import ndimage
from scipy import misc
from matplotlib import pyplot as mp
import matplotlib.pyplot as plt
import numpy as np

# constructor for universal use of the half-image program
# image : name of image to be altered , alt_image : name of altered image
def __init__ (self, image, alt_image):
	self.image = image;
	self.alt_image = alt_image;

# purpose of the program : make the right half of the image transparent
# input : the image to be altered
# output : the image with the right side transparent
def main ():

	# read in the image, convert to RGBA values, pixels as an array
	pixels = np.array((Image.open('turtle.jpg')).convert('RGBA'))
	# use constructor to initialize image
	# pixels = np.array((Image.open(image)).convert('RGBA'))

	# make the left half transparent
	transparency (pixels)

	# reassign the pixels to the image
	# show and save the altered image
	plt.imshow(pixels)
	plt.imsave('turtle2.jpg', pixels)
	# use constructor to initialize alt_image
	# plt.imsave(self.alt_image, pixels)
	plt.show()

# function : transparency
# purpose : make the right side of the image transparent
# input : 3-dimensional array holding height (index 0), width (index 1), RGBA values (index 2)
def transparency (pixels): 
    
    # dimensions of the image : shape [0] = # of rows, [1] = # of columns
	height = pixels.shape[0]
	width = pixels.shape[1]

	# divide width by two, set to right half
	halfwidth = width - (width / 2)

	# for each pixel in the height
	for i in range(height) :
		# for each pixel in the right (width) half of the image
		for j in range(halfwidth, width):
			# 3rd dimension : [0] = R, [1] = G, [2] = B, [3] = A (opacity)
			# opacity = 0 : pixel becomes transparent
			pixels[i][j][3] = 0;

if __name__ == '__main__':
	main ()